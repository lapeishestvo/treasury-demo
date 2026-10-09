// Positions and lots are projections of the shared security-trade history.
(function() {
  var quantityKeys = ['pending', 'open', 'committed', 'quantity'];
  var valuationKeys = ['acquisitionValue', 'accrued', 'accruedMxn', 'marketValue', 'marketValueMxn', 'unrealisedPnl', 'unrealisedPnlMxn', 'ytm'];
  function demoValuation(row) {
    // Stable UI fixtures, not market quotes or a daily-accrual calculation.
    var seed = Array.from(row.instrument).reduce(function(value, char) { return (value * 31 + char.charCodeAt(0)) >>> 0; }, 0);
    var heldQuantity = row.open + row.committed;
    var scale = row.currency === 'USD' ? 10 : 1;
    var demoFx = row.currency === 'MXN' ? 1 : row.currency === 'USD' ? 17.5 : null;
    var money = function(value) { return Math.round(value * 100) / 100; };
    var accrued = money(heldQuantity * (0.01 + seed % 45 / 1000) * scale);
    var pnl = money(heldQuantity * ((seed % 41) - 20) / 1000 * scale);
    var cost = money(row.cost);
    var market = money(cost + pnl);
    return {
      acquisitionValue: cost, accrued: accrued, marketValue: market, unrealisedPnl: pnl,
      accruedMxn: demoFx == null ? null : money(accrued * demoFx),
      marketValueMxn: demoFx == null ? null : money(market * demoFx),
      unrealisedPnlMxn: demoFx == null ? null : money(pnl * demoFx),
      ytm: heldQuantity ? (row.currency === 'USD' ? 4.1 : 6.2) + seed % 81 / 100 : null, valuationSource: 'demo',
    };
  }
  function list(portfolios, trades) {
    var byId = new Map(portfolios.map(function(row) { return [row.id, row]; }));
    return HoldingsLedger.project(trades || TradeStore.list()).positions.filter(function(row) { return byId.has(row.portfolioId); }).map(function(row) {
      var portfolio = byId.get(row.portfolioId);
      return Object.assign({}, row, demoValuation(row), { portfolio: portfolio.name, book: portfolio.book });
    });
  }
  function filter(rows, query, maturityDates) {
    var text = (query || '').trim().toLowerCase();
    return rows.filter(function(row) {
      return (!text || [row.instrument, row.portfolio, row.book, row.currency, row.maturityDate].some(function(value) {
        return value.toLowerCase().includes(text);
      })) && (!maturityDates || (Array.isArray(maturityDates)
        ? !maturityDates.length || maturityDates.includes(row.maturityDate)
        : ((!maturityDates.from && !maturityDates.to) || (!!row.maturityDate &&
          (!maturityDates.from || row.maturityDate >= maturityDates.from) &&
          (!maturityDates.to || row.maturityDate <= maturityDates.to)))));
    });
  }
  function group(rows, groupBy, sort) {
    var key = ['portfolio', 'instrument', 'book'].includes(groupBy) ? groupBy : 'portfolio';
    var groups = new Map();
    rows.forEach(function(row) {
      var id = key === 'portfolio' ? row.portfolioId : row[key];
      if (!groups.has(id)) groups.set(id, { id: id, label: row[key], rows: [], total: { pending: 0, open: 0, committed: 0, quantity: 0 } });
      var current = groups.get(id);
      current.rows.push(row);
      quantityKeys.forEach(function(field) { current.total[field] += row[field]; });
    });
    var result = Array.from(groups.values());
    if (key === 'portfolio') {
      var order = ['LQ-MXN', 'LQ-USD'];
      var rank = function(id) { var index = order.indexOf(id); return index < 0 ? order.length : index; };
      result.sort(function(a, b) { return rank(a.id) - rank(b.id); });
      if (!sort) result.forEach(function(current) {
        if (current.id !== 'LQ-USD') return;
        var bills = current.rows.filter(function(row) { return /^US_TBILL_/.test(row.instrument); });
        var others = current.rows.filter(function(row) { return !/^US_TBILL_/.test(row.instrument); });
        current.rows = others.slice(0, 1).concat(bills.slice(0, 2), others.slice(1), bills.slice(2));
      });
    }
    if (sort && ['maturityDate', 'acquisitionCost'].concat(quantityKeys, valuationKeys).includes(sort.key)) {
      result.forEach(function(current) {
        current.rows.sort(function(a, b) {
          if (a[sort.key] == null || b[sort.key] == null) return a[sort.key] == null ? (b[sort.key] == null ? 0 : 1) : -1;
          var comparison = typeof a[sort.key] === 'number' ? a[sort.key] - b[sort.key] : a[sort.key].localeCompare(b[sort.key]);
          return (sort.dir === 'desc' ? -1 : 1) * comparison;
        });
      });
    }
    return result;
  }
  window.PositionStore = { list: list, filter: filter, group: group,
    lots: function(portfolioId, instrument) {
      return HoldingsLedger.project(TradeStore.list()).lots.filter(function(row) {
        return row.portfolioId === portfolioId && row.instrument === instrument && (row.quantity > 0 || row.pending > 0);
      });
    },
    issues: function() { return HoldingsLedger.project(TradeStore.list()).issues; },
  };
})();
