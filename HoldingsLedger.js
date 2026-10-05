// Pure inventory projection. Persisted sell allocations keep reservations stable.
(function() {
  var inactive = new Set(['cancelled', 'declined', 'rejected']);
  function number(value) { return Number(String(value ?? '').replace(/,/g, '')); }
  function quantity(row) { return number(row.details?.quantity ?? row.qty); }
  function instrument(row) { return row.details?.instrument || row.instrumentCode || row.instrument; }
  function positionKey(row) { return row.portfolioId + ':' + instrument(row); }
  function settled(row) { return row.status === 'settled'; }
  function active(row) { return !inactive.has(row.status); }
  function timestamp(row, settlement) {
    return (settlement ? row.settledAt : row.reservedAt || row.createdAt) ||
      (settlement ? row.details?.settlementDateFinal || row.settlementDate : row.tradeDate || row.created) +
      'T' + (row.details?.tradeTime || '00:00').slice(0, 5) + ':00Z';
  }
  function order(a, b, settlement) {
    return String(timestamp(a, settlement)).localeCompare(String(timestamp(b, settlement))) || String(a.ticket).localeCompare(String(b.ticket), 'en', { numeric: true });
  }
  function allocate(lots, row) {
    var required = quantity(row);
    if (!Number.isSafeInteger(required) || required <= 0) throw new Error('Quantity must be a positive whole number.');
    var eligible = lots.filter(function(lot) {
      return lot.positionId === positionKey(row) && !lot.pending &&
        (!settled(row) || lot.acquiredAt <= timestamp(row, true));
    });
    var available = eligible.reduce(function(sum, lot) { return sum + lot.open; }, 0);
    if (required > available) throw new Error('Not enough securities available. Available: ' + available.toLocaleString('en-US') + '.');
    var remainder = required;
    var plan = [];
    eligible.forEach(function(lot) {
      var amount = Math.min(lot.open, remainder);
      if (amount > 0) plan.push({ lotId: lot.id, quantity: amount });
      remainder -= amount;
    });
    return plan;
  }
  function apply(lots, row, plan) {
    var ids = new Set();
    var total = 0;
    plan.forEach(function(part) {
      var lot = lots.find(function(item) { return item.id === part.lotId; });
      if (!lot || lot.positionId !== positionKey(row) || lot.pending || ids.has(part.lotId) ||
          !Number.isSafeInteger(part.quantity) || part.quantity <= 0 || part.quantity > lot.open ||
          (settled(row) && lot.acquiredAt > timestamp(row, true))) {
        throw new Error('The reserved lots have changed. Reopen the trade and check the available quantity.');
      }
      ids.add(part.lotId);
      total += part.quantity;
    });
    if (total !== quantity(row)) throw new Error('Reserved quantity does not match trade quantity.');
    plan.forEach(function(part) {
      var lot = lots.find(function(item) { return item.id === part.lotId; });
      lot.open -= part.quantity;
      if (settled(row)) { lot.closed += part.quantity; lot.quantity -= part.quantity; }
      else lot.committed += part.quantity;
    });
  }
  function project(rows) {
    var lots = [];
    var issues = [];
    var allocations = {};
    rows.filter(function(row) { return row.type === 'buy' && active(row) && quantity(row) > 0; })
      .sort(function(a, b) { return order(a, b, true); }).forEach(function(row) {
        var qty = quantity(row);
        if (!Number.isSafeInteger(qty) || !row.portfolioId || !instrument(row)) {
          issues.push({ ticket: row.ticket, message: 'Invalid purchase quantity or portfolio binding.' });
          return;
        }
        var received = settled(row);
        lots.push({
          id: 'lot-' + row.ticket, tradeTicket: row.ticket, positionId: positionKey(row),
          portfolioId: row.portfolioId, instrument: instrument(row), currency: 'MXN',
          maturityDate: row.maturityDate || '', acquiredAt: timestamp(row, true),
          settlement: (row.details?.settlementDateFinal || row.settlementDate || '') + (row.details?.tradeTime ? ', ' + row.details.tradeTime.slice(0, 5) : ''),
          originalQuantity: qty, pending: received ? 0 : qty, open: received ? qty : 0,
          committed: 0, closed: 0, quantity: qty,
          acquisitionCost: number(row.details?.price ?? row.price), accrual: null,
        });
      });
    var sales = rows.filter(function(row) { return row.type === 'sell' && active(row) && quantity(row) > 0; });
    // Finalized sales consume stock first. Persisted reservations never overlap them.
    sales.sort(function(a, b) { return Number(settled(b)) - Number(settled(a)) || order(a, b, settled(a)); });
    sales.forEach(function(row) {
      try {
        var plan = Array.isArray(row.lotAllocations) ? row.lotAllocations : allocate(lots, row);
        apply(lots, row, plan);
        allocations[row.ticket] = plan;
      } catch (error) { issues.push({ ticket: row.ticket, message: error.message }); }
    });
    var groups = new Map();
    lots.forEach(function(lot) {
      if (!groups.has(lot.positionId)) groups.set(lot.positionId, {
        id: lot.positionId, portfolioId: lot.portfolioId, instrument: lot.instrument,
        currency: lot.currency, maturityDate: lot.maturityDate,
        pending: 0, open: 0, committed: 0, closed: 0, quantity: 0, originalQuantity: 0, cost: 0,
      });
      var position = groups.get(lot.positionId);
      ['pending', 'open', 'committed', 'closed', 'quantity', 'originalQuantity'].forEach(function(key) { position[key] += lot[key]; });
      position.cost += (lot.open + lot.committed) * (Number.isFinite(lot.acquisitionCost) ? lot.acquisitionCost : 0);
    });
    var positions = Array.from(groups.values()).map(function(row) {
      var receivedQuantity = row.open + row.committed;
      return Object.assign({}, row, { acquisitionCost: receivedQuantity ? row.cost / receivedQuantity : 0 });
    });
    return { lots: lots, positions: positions, allocations: allocations, issues: issues };
  }
  function prepare(row, rows) {
    var previous = rows.find(function(item) { return item.ticket === row.ticket; });
    var next = Object.assign({}, previous, row, { details: Object.assign({}, previous?.details, row.details) });
    var quantityText = String(next.details?.quantity ?? next.qty ?? '').trim();
    if ((quantityText || next.status !== 'draft') && (!Number.isSafeInteger(quantity(next)) || quantity(next) <= 0)) {
      throw new Error('Quantity must be a positive whole number.');
    }
    var now = new Date().toISOString();
    next.createdAt = previous?.createdAt || next.createdAt || now;
    if (settled(next)) next.settledAt = previous?.settledAt || next.settledAt || now;
    if (previous && settled(previous)) {
      if (!settled(next) || next.type !== previous.type || positionKey(next) !== positionKey(previous) || quantity(next) !== quantity(previous)) {
        throw new Error('A settled trade cannot change its instrument, portfolio or quantity.');
      }
    }
    if (next.type === 'sell' && active(next) && quantity(next) > 0) {
      next.reservedAt = previous?.reservedAt || next.reservedAt || now;
      var unchanged = previous && active(previous) && positionKey(previous) === positionKey(next) && quantity(previous) === quantity(next);
      if (!unchanged || !previous.lotAllocations) {
        var state = project(rows.filter(function(item) { return item.ticket !== next.ticket; }));
        next.lotAllocations = allocate(state.lots, next);
      }
    } else delete next.lotAllocations;
    var projected = project(rows.filter(function(item) { return item.ticket !== next.ticket; }).concat(next));
    var error = projected.issues.find(function(issue) { return issue.ticket === next.ticket; });
    if (!error && projected.issues.length) error = projected.issues[0];
    if (error) throw new Error('Trade ' + error.ticket + ': ' + error.message);
    return next;
  }
  window.HoldingsLedger = { project: project, prepare: prepare, allocate: allocate, quantity: quantity, positionKey: positionKey, active: active };
})();
