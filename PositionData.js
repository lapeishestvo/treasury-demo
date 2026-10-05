// Positions and lots are projections of the shared security-trade history.
(function() {
  var quantityKeys = ['pending', 'open', 'committed', 'quantity'];
  function list(portfolios, trades) {
    var byId = new Map(portfolios.map(function(row) { return [row.id, row]; }));
    return HoldingsLedger.project(trades || TradeStore.list()).positions.filter(function(row) { return byId.has(row.portfolioId); }).map(function(row) {
      var portfolio = byId.get(row.portfolioId);
      return Object.assign({}, row, { portfolio: portfolio.name, book: portfolio.book });
    });
  }
  function filter(rows, query, maturityDates) {
    var text = (query || '').trim().toLowerCase();
    return rows.filter(function(row) {
      return (!text || [row.instrument, row.portfolio, row.book, row.currency, row.maturityDate].some(function(value) {
        return value.toLowerCase().includes(text);
      })) && (!maturityDates || !maturityDates.length || maturityDates.includes(row.maturityDate));
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
    if (sort && ['maturityDate', 'acquisitionCost'].concat(quantityKeys).includes(sort.key)) {
      result.forEach(function(current) {
        current.rows.sort(function(a, b) {
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
