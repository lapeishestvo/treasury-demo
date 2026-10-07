// Shared portfolio binding and illustrative discount-security pricing for the demo.
(function () {
  var tbills = ['US_TBILL_261022', 'US_TBILL_261119', 'US_TBILL_270107', 'US_TBILL_270408'];
  function instrumentInfo(code) {
    var isTbill = /^US_TBILL_/.test(String(code || ''));
    return { type: isTbill ? 'T-Bills' : 'CETES', currency: isTbill ? 'USD' : 'MXN', nominal: isTbill ? 100 : 10 };
  }
  function eligible(portfolio, type) {
    return portfolio.status === 'Active' || (type === 'sell' && portfolio.status === 'Blocked');
  }

  function bind(row, portfolios) {
    var next = Object.assign({}, row);
    var details = Object.assign({}, row.details);
    next.instrumentCurrency = instrumentInfo(details.instrument || row.instrumentCode || row.instrument).currency;
    var id = row.portfolioId || details.portfolioId;
    var portfolio = portfolios.find(function(item) { return item.id === id; });
    // Migrate only unbound legacy records; never silently replace a deleted portfolio.
    if (!id) {
      var candidates = portfolios.filter(function(item) { return eligible(item, row.type); });
      if (!candidates.length) candidates = portfolios;
      var book = String(row.book || details.book || '').replace(/ book$/i, '');
      var matching = candidates.filter(function(item) { return item.book === book; });
      if (matching.length) candidates = matching;
      var hash = Array.from(String(row.ticket || '')).reduce(function(value, character) {
        return (value * 31 + character.charCodeAt(0)) >>> 0;
      }, 0);
      portfolio = candidates.length ? candidates[hash % candidates.length] : null;
      id = portfolio ? portfolio.id : '';
    }
    next.portfolioId = details.portfolioId = id || '';
    next.portfolioName = details.portfolioName = portfolio ? portfolio.name : (row.portfolioName || details.portfolioName || '');
    next.book = details.book = portfolio ? portfolio.book : (row.book || details.book || '');
    next.rate = details.rate = String(details.rate ?? row.rate ?? details.ytm ?? row.ytm ?? '').replace(/%$/, '');
    next.counterpartyTrader = details.counterpartyTrader = details.counterpartyTrader || row.counterpartyTrader || '';
    ['tradeDate', 'settlementDate', 'term', 'custodian', 'strategy'].forEach(function(key) {
      if (!details[key] && row[key]) details[key] = row[key];
    });
    next.details = details;
    return next;
  }

  function dateValue(value) {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(value || '')) return NaN;
    var time = Date.parse(value + 'T00:00:00Z');
    return Number.isFinite(time) && new Date(time).toISOString().slice(0, 10) === value ? time : NaN;
  }

  function calculatePrice(form) {
    var maturity = String(form.instrument || '').match(/_(\d{2})(\d{2})(\d{2})$/);
    var settlement = dateValue(form.settlementDate);
    var maturityTime = maturity ? dateValue('20' + maturity[1] + '-' + maturity[2] + '-' + maturity[3]) : NaN;
    var rateText = String(form.rate ?? '').trim();
    var rate = Number(rateText.replace(/,/g, ''));
    var days = (maturityTime - settlement) / 86400000;
    if (!rateText || !Number.isFinite(rate) || rate < 0 || !Number.isFinite(days) || days < 0) return '';
    return (instrumentInfo(form.instrument).nominal / (1 + rate / 100 * days / 360)).toFixed(8);
  }

  window.SecurityTradeData = { bind: bind, eligible: eligible, calculatePrice: calculatePrice, instrumentInfo: instrumentInfo, tbills: tbills };
})();
