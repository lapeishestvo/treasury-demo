// Shared demo records and persistence for the portfolio list and workflow.
(function () {
  function hasInstruments(row) {
    var state = HoldingsLedger.project(TradeStore.list());
    if (state.issues.length) throw new Error('Resolve inventory inconsistencies before closing a portfolio.');
    return state.positions.some(function(position) {
      return position.portfolioId === row.id && (position.quantity > 0 || position.pending > 0);
    });
  }

  function activeAction(row) {
    return row && row.status === 'Active' ? (hasInstruments(row) ? 'Block' : 'Close') : null;
  }
  function restoreAction(row) {
    return row?.status === 'Blocked' ? 'Unblock' : row?.status === 'Closed' ? 'Reactivate' : null;
  }
  var seeds = [
    { name: 'Liquidity MXN', code: 'LQ-MXN', book: 'Banking', classification: 'FVTPL', currency: 'MXN', status: 'Active', owner: 'Sergio Chavez' },
    { name: 'Multi-currency Liquidity', code: 'LQ-USD', book: 'Banking', classification: 'FVTPL', currency: 'USD', status: 'Active', owner: 'Magali Ruiz' },
    { name: 'CETES Trading', code: 'CET-TRD', book: 'Trading', classification: 'FVTPL', currency: 'MXN', status: 'Active', owner: 'Fabiola Lopez' },
    { name: 'Government Bonds', code: 'GOV-MXN', book: 'Trading', classification: 'FVTPL', currency: 'MXN', status: 'Pending approval', owner: 'Miguel Torres' },
    { name: 'Treasury Reserve', code: 'TR-RES', book: 'Banking', classification: 'FVTPL', currency: 'MXN', status: 'Active', owner: 'Ana Cruz' },
    { name: 'USD Investments', code: 'INV-USD', book: 'Trading', classification: 'FVTPL', currency: 'USD', status: 'Returned to maker', owner: 'Sergio Chavez' },
    { name: 'Short Term MXN', code: 'ST-MXN', book: 'Banking', classification: 'FVTPL', currency: 'MXN', status: 'Blocked', owner: 'Magali Ruiz' },
    { name: 'Dollar Trading', code: 'USD-TRD', book: 'Trading', classification: 'FVTPL', currency: 'USD', status: 'Pending approval', owner: 'Fabiola Lopez' },
    { name: 'Legacy Bonds', code: 'LEG-BND', book: 'Banking', classification: 'FVTPL', currency: 'MXN', status: 'Closed', owner: 'Miguel Torres' },
    { name: 'Global Allocation', code: 'GLB-USD', book: 'Trading', classification: 'FVTPL', currency: 'USD', status: 'Cancelled', owner: 'Ana Cruz' },
  ].map(function(row) { return Object.assign({ id: row.code, justification: '' }, row); });

  function readSaved() {
    var saved = JSON.parse(localStorage.getItem('aura_portfolios') || '[]');
    return Array.isArray(saved) ? saved.filter(function(row) { return row && ((row.code && row.name) || (row.deleted === true && typeof row.id === 'string')); }) : [];
  }

  function list() {
    var saved = readSaved().map(function(row) {
      var next = Object.assign({ id: row.code }, row);
      if (next.id === 'LQ-USD' && next.name === 'Liquidity USD') next.name = 'Multi-currency Liquidity';
      return next;
    });
    var overrides = new Map(saved.map(function(row) { return [row.id, row]; }));
    var seedIds = new Set(seeds.map(function(row) { return row.id; }));
    return saved.filter(function(row) { return !seedIds.has(row.id); }).concat(seeds.map(function(row) {
      return overrides.get(row.id) || Object.assign({}, row);
    })).filter(function(row) { return !row.deleted; });
  }

  function save(row) {
    var saved = readSaved();
    var index = saved.findIndex(function(item) { return (item.id || item.code) === row.id; });
    if (index < 0) saved.unshift(row);
    else saved[index] = row;
    localStorage.setItem('aura_portfolios', JSON.stringify(saved));
  }

  window.PortfolioStore = {
    list: list, save: save, activeAction: activeAction, restoreAction: restoreAction,
    restore: function(id, action, updatedBy) {
      var current = list().find(function(row) { return row.id === id; });
      if (!current || !action || restoreAction(current) !== action) {
        throw new Error('This action is no longer available. Reload the portfolio.');
      }
      var updated = Object.assign({}, current, {
        status: 'Active', updatedAt: new Date().toISOString(), updatedBy: updatedBy,
      });
      save(updated);
      return updated;
    },
    transitionActive: function(id, action, updatedBy) {
      var current = list().find(function(row) { return row.id === id; });
      if (!current || !action || activeAction(current) !== action) {
        throw new Error('This action is no longer available. Reload the portfolio.');
      }
      save(Object.assign({}, current, {
        status: action === 'Block' ? 'Blocked' : 'Closed',
        updatedAt: new Date().toISOString(), updatedBy: updatedBy,
      }));
    },
    remove: function(id, expectedStatus) {
      var current = list().find(function(row) { return row.id === id; });
      if (!current || (expectedStatus && current.status !== expectedStatus)) {
        throw new Error('This portfolio has changed. Reload the page before deleting it.');
      }
      // An id-only marker prevents a deleted seed from reappearing after reload.
      save({ id: id, deleted: true });
    },
    find: function(id) { return list().find(function(row) { return row.id === id; }); },
    statusVariants: {
      'Pending approval': 'warning-secondary', Active: 'success-secondary',
      'Returned to maker': 'error-tertiary', Blocked: 'neutral-secondary',
      Closed: 'neutral-tertiary', Cancelled: 'error-secondary',
    },
  };
})();
