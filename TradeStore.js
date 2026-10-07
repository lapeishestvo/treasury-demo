// Shared security-trade fixtures and persistence.
(function() {
const TRADE_STORAGE_KEY = 'aura_trades';
const LEGACY_TICKET_MAP = {
  BI_CETES_260410: '100010',
  BI_BONOS_280310: '100009',
  BI_CETES_260205: '100008',
  BI_UDIBONO_281: '100007',
  BI_MBONO_260501: '100006',
  BI_CETES_260219: '100005',
  BI_UDIBONO_321: '100004',
  BI_CETES_260226: '100003',
  BI_BONOS_430610: '100002',
  BI_MBONO_280301: '100001',
};

function seedModeForStatus(status) {
  if (status === 'pending_approval') return 'approval_detail';
  if (status === 'pending_mo_reconciliation') return 'mo_reconciliation_detail';
  if (status === 'pending_settlement') return 'counterparty_form';
  if (status === 'counterparty_confirmed') return 'settlement_form';
  if (status === 'settling') return 'bo_approval_detail';
  if (status === 'pending_mo_settlement_confirmation') return 'mo_settlement_confirmation_detail';
  if (status === 'returned_to_fo') return 'edit';
  if (status === 'returned_to_bo') return 'settlement_form';
  if (status === 'settled' || status === 'declined' || status === 'cancelled') return 'settled_detail';
  return 'edit';
}

const SEED_DATE_GROUPS = [
  { date: '2026-03-02', statuses: ['draft', 'pending_approval', 'pending_mo_reconciliation', 'pending_settlement'] },
  { date: '2026-03-01', statuses: ['counterparty_confirmed', 'settling', 'pending_mo_settlement_confirmation'] },
  { date: '2026-02-28', statuses: ['settled', 'declined', 'cancelled'] },
  { date: '2026-02-27', statuses: ['returned_to_fo', 'draft', 'pending_approval', 'pending_mo_reconciliation'] },
  { date: '2026-02-26', statuses: ['pending_settlement', 'counterparty_confirmed', 'settling'] },
  { date: '2026-02-25', statuses: ['pending_mo_settlement_confirmation', 'settled'] },
  { date: '2026-02-24', statuses: ['returned_to_bo', 'counterparty_confirmed', 'settling', 'pending_settlement'] },
  { date: '2026-02-23', statuses: ['pending_approval', 'pending_mo_reconciliation', 'returned_to_fo'] },
  { date: '2026-02-22', statuses: ['draft', 'cancelled', 'declined'] },
  { date: '2026-02-21', statuses: ['pending_settlement', 'counterparty_confirmed', 'settling', 'pending_mo_settlement_confirmation'] },
  { date: '2026-02-20', statuses: ['settled', 'returned_to_bo', 'counterparty_confirmed'] },
  { date: '2026-02-19', statuses: ['draft', 'pending_approval'] },
  { date: '2026-02-18', statuses: ['pending_mo_reconciliation', 'pending_settlement', 'returned_to_fo'] },
  { date: '2026-02-17', statuses: ['settling', 'pending_mo_settlement_confirmation', 'settled'] },
  { date: '2026-02-16', statuses: ['draft', 'counterparty_confirmed', 'returned_to_bo'] },
  { date: '2026-02-15', statuses: ['settled', 'draft'] },
  { date: '2026-02-14', statuses: ['pending_approval', 'pending_settlement', 'settling', 'settled'] },
];
const SEED_ROW_META = SEED_DATE_GROUPS.reduce(function(list, group, groupIndex) {
  group.statuses.forEach(function(status, slotIndex) {
    list.push({
      date: group.date,
      status: status,
      groupIndex: groupIndex,
      slotIndex: slotIndex,
      groupSize: group.statuses.length,
    });
  });
  return list;
}, []);

const SEED_AUTHORS = ['Alejandro Hernández', 'Mariana Ortiz', 'Carlos Méndez', 'Lucía Ramírez', 'Jorge Silva'];
const SEED_ASSIGNEES = ['Alejandro Hernández', 'Mariana Ortiz', 'Carlos Méndez', 'Lucía Ramírez', 'Jorge Silva', 'Verónica Cruz'];
const SEED_COUNTERPARTIES = ['Banorte', 'BBVA', 'Santander', 'HSBC', 'Scotiabank', 'Banamex'];
const SEED_CUSTODIANS = ['Indeval', 'Banorte Custodia', 'BBVA Custody', 'Citi Securities', 'Santander Sec.'];
const SEED_BOOKS = ['Treasury', 'Liquidity', 'AFS', 'Trading'];
const SEED_STRATEGIES = ['Carry', 'Liquidity buffer', 'Duration ladder', 'Yield capture'];
const SEED_INSTRUMENTS = [
  { code: 'BI_CETES_260410', label: 'BI_CETES_260410', price: '9.87514327', term: '28D', maturityDate: '2026-04-10', ytm: '10.12%' },
  { code: 'BI_CETES_260324', label: 'BI_CETES_260324', price: '9.73248195', term: '56D', maturityDate: '2026-03-24', ytm: '10.041%' },
  { code: 'BI_CETES_260205', label: 'BI_CETES_260205', price: '9.62031864', term: '91D', maturityDate: '2026-02-05', ytm: '10.03%' },
  { code: 'BI_CETES_260519', label: 'BI_CETES_260519', price: '9.41576218', term: '182D', maturityDate: '2026-05-19', ytm: '10.182%' },
  { code: 'BI_CETES_260630', label: 'BI_CETES_260630', price: '9.12859403', term: '364D', maturityDate: '2026-06-30', ytm: '10.267%' },
  { code: 'BI_CETES_260219', label: 'BI_CETES_260219', price: '9.41028651', term: '182D', maturityDate: '2026-02-19', ytm: '10.21%' },
  { code: 'BI_CETES_260715', label: 'BI_CETES_260715', price: '9.80463742', term: '28D', maturityDate: '2026-07-15', ytm: '9.984%' },
  { code: 'BI_CETES_260226', label: 'BI_CETES_260226', price: '9.81092476', term: '28D', maturityDate: '2026-02-26', ytm: '9.98%' },
  { code: 'BI_CETES_260803', label: 'BI_CETES_260803', price: '9.60215389', term: '91D', maturityDate: '2026-08-03', ytm: '10.057%' },
  { code: 'BI_CETES_260831', label: 'BI_CETES_260831', price: '9.39270854', term: '182D', maturityDate: '2026-08-31', ytm: '10.193%' },
];
const SEED_QUANTITIES = ['250,000', '500,000', '750,000', '1,000,000', '1,500,000', '2,000,000', '3,000,000'];
function parseSeedNumber(value) {
  return Number(String(value || '0').replace(/,/g, ''));
}

function formatSeedTotal(quantity, price) {
  var total = parseSeedNumber(quantity) * Number(price || '0');
  return total.toLocaleString('en-US', { maximumFractionDigits: 0 });
}

function addDaysToDateString(dateString, daysToAdd) {
  var match = String(dateString || '').match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (!match) return dateString;
  var date = new Date(Number(match[1]), Number(match[2]) - 1, Number(match[3]));
  date.setDate(date.getDate() + daysToAdd);
  var yyyy = date.getFullYear();
  var mm = String(date.getMonth() + 1).padStart(2, '0');
  var dd = String(date.getDate()).padStart(2, '0');
  return yyyy + '-' + mm + '-' + dd;
}

const ALL_ROWS = Array.from({ length: 50 }, function(_, index) {
  var meta = SEED_ROW_META[index];
  var seed = SEED_INSTRUMENTS[(meta.groupIndex * 3 + meta.slotIndex * 2 + index) % SEED_INSTRUMENTS.length];
  var quantity = SEED_QUANTITIES[(meta.groupIndex + meta.slotIndex * 2 + index) % SEED_QUANTITIES.length];
  var status = meta.status;
  var ticket = String(100050 - index);
  var type = (meta.groupIndex + meta.slotIndex + index) % 4 === 0 ? 'sell' : 'buy';
  var readonly = status === 'settled' || status === 'declined' || status === 'cancelled';
  var tradeDate = meta.date;
  var settlementDate = addDaysToDateString(meta.date, (index % 4) + 1);
  var totalInterestAccrued = (1200 + (index % 9) * 180).toLocaleString('en-US');
  var interestAccrued1Day = (45 + (index % 7) * 6).toLocaleString('en-US');
  var realizedPnL = ((index % 2 === 0 ? 1 : -1) * (800 + (index % 6) * 125)).toLocaleString('en-US');

  return {
    ticket: ticket,
    instrumentCode: seed.code,
    instrument: seed.label,
    counterparty: SEED_COUNTERPARTIES[(meta.groupIndex * 2 + meta.slotIndex + index) % SEED_COUNTERPARTIES.length],
    type: type,
    price: seed.price,
    qty: quantity,
    total: formatSeedTotal(quantity, seed.price),
    status: status,
    mode: seedModeForStatus(status),
    readonly: readonly,
    created: meta.date,
    author: SEED_AUTHORS[(meta.groupIndex + meta.slotIndex + index) % SEED_AUTHORS.length],
    assignee: SEED_ASSIGNEES[(meta.groupIndex * 2 + meta.slotIndex + index) % SEED_ASSIGNEES.length],
    contract: 'TR-' + ticket,
    custodian: SEED_CUSTODIANS[(meta.groupIndex + index) % SEED_CUSTODIANS.length],
    tradeDate: tradeDate,
    settlementDate: settlementDate,
    term: seed.term,
    book: SEED_BOOKS[(meta.groupIndex + meta.slotIndex) % SEED_BOOKS.length],
    strategy: SEED_STRATEGIES[(meta.groupIndex + index) % SEED_STRATEGIES.length],
    ytm: seed.ytm,
    maturityDate: seed.maturityDate,
    interestAccrued1Day: interestAccrued1Day,
    totalInterestAccrued: totalInterestAccrued,
    realizedPnL: realizedPnL,
  };
});

function deriveLegacyTicketNumber(value) {
  var mapped = LEGACY_TICKET_MAP[value];
  if (mapped) return mapped;
  var digits = String(value || '').match(/(\d{3,})$/);
  if (digits) return digits[1];
  return String(value || '');
}

function normalizeDateString(value) {
  var raw = String(value || '').trim();
  if (!raw || raw === '—') return raw;
  var isoMatch = raw.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (isoMatch) return raw;
  var legacyMatch = raw.match(/^(\d{2})\.(\d{2})\.(\d{4})$/);
  if (legacyMatch) return legacyMatch[3] + '-' + legacyMatch[2] + '-' + legacyMatch[1];
  return raw;
}

function normalizeAuthorName(value) {
  var raw = String(value || '').trim();
  if (!raw || raw === 'Treasury Demo') return SEED_AUTHORS[0];
  return raw;
}

function normalizeInstrumentCode(next, details) {
  var detailInstrument = String(details.instrument || '').trim();
  var detailInstrumentCode = String(details.instrumentCode || '').trim();
  var rowInstrument = String(next.instrument || '').trim();
  var rowInstrumentCode = String(next.instrumentCode || '').trim();

  var code = rowInstrumentCode || detailInstrumentCode;
  if (!code && /^(BI_|US_TBILL_)/.test(rowInstrument)) code = rowInstrument;
  if (!code && /^(BI_|US_TBILL_)/.test(detailInstrument)) code = detailInstrument;
  if (!code) code = 'BI_CETES_260205';

  next.instrumentCode = code;
  next.instrument = code;
}

function normalizePricePrecision(value, seed) {
  var raw = String(value == null ? '' : value).trim();
  if (!raw) return raw;
  var match = raw.match(/^(\d+)(?:\.(\d+))?$/);
  if (!match) return raw;

  var integerPart = match[1];
  var decimalPart = match[2] || '';
  if (decimalPart.length >= 8) {
    return integerPart + '.' + decimalPart.slice(0, 8);
  }

  return integerPart + '.' + decimalPart.padEnd(8, '0');
}

function normalizeTradeRow(row) {
  if (!row || typeof row !== 'object') return row;
  var next = { ...row };
  var details = { ...next.details };
  if (String(next.ticket || '').indexOf('BI_') === 0) {
    next.instrumentCode = next.instrumentCode || next.ticket;
    next.ticket = deriveLegacyTicketNumber(next.ticket);
  }
  next.ticket = String(next.ticket || '');
  if (next.status === 'waiting') next.status = 'pending_approval';
  if (next.status === 'pending_cp') next.status = 'pending_settlement';
  if (next.status === 'pending_st') next.status = 'pending_settlement';
  if (next.status === 'settling_approval') next.status = 'settling';
  if (next.status === 'settlement_rejected') next.status = 'returned_to_bo';
  if (next.status === 'approved' || next.status === 'completed') {
    next.status = 'settled';
    next.readonly = true;
  }
  if (next.status === 'rejected') {
    next.status = 'declined';
    next.readonly = true;
  }
  if (!next.assignee) {
    next.assignee = SEED_ASSIGNEES[0];
  }
  next.created = normalizeDateString(next.created);
  details.tradeDate = normalizeDateString(details.tradeDate);
  details.settlementDate = normalizeDateString(details.settlementDate);
  details.maturityDate = normalizeDateString(details.maturityDate);
  ['confirmationDate', 'settlementDateFinal', 'reviewedAt'].forEach(function(key) {
    if (details[key]) details[key] = normalizeDateString(details[key]);
  });
  next.details = details;
  normalizeInstrumentCode(next, details);
  next.author = normalizeAuthorName(next.author);
  if (!next.contract) next.contract = details.contract || ('TR-' + next.ticket);
  if (!next.custodian) next.custodian = details.custodian || SEED_CUSTODIANS[0];
  if (!next.tradeDate) next.tradeDate = details.tradeDate || next.created || '';
  if (!next.settlementDate) next.settlementDate = details.settlementDate || next.created || '';
  if (!next.term) next.term = details.term || 'T+1';
  if (!next.book) next.book = details.book || SEED_BOOKS[0];
  if (!next.strategy) next.strategy = details.strategy || SEED_STRATEGIES[0];
  if (!next.ytm) next.ytm = details.ytm ? (String(details.ytm).includes('%') ? details.ytm : details.ytm + '%') : '10.000%';
  if (!next.maturityDate) next.maturityDate = details.maturityDate || next.created || '';
  next.tradeDate = normalizeDateString(next.tradeDate);
  next.settlementDate = normalizeDateString(next.settlementDate);
  next.maturityDate = normalizeDateString(next.maturityDate);
  next.price = normalizePricePrecision(next.price || details.price || '', next.ticket || next.instrumentCode || next.instrument);
  if (details.price) {
    details.price = normalizePricePrecision(details.price, next.ticket || next.instrumentCode || next.instrument);
  }
  if (!next.interestAccrued1Day) next.interestAccrued1Day = '0';
  if (!next.totalInterestAccrued) next.totalInterestAccrued = '0';
  if (!next.realizedPnL) next.realizedPnL = '0';

  if (next.mode === 'approver') next.mode = 'approval_detail';
  if (next.mode === 'mo_reconciliation') next.mode = 'mo_reconciliation_detail';
  if (next.mode === 'pending_settlement_detail') next.mode = 'settlement_form';
  if (next.mode === 'counterparty') next.mode = 'counterparty_form';
  if (next.mode === 'counterparty_review') next.mode = 'counterparty_review';
  if (next.mode === 'counterparty_confirmed_detail') next.mode = 'settlement_form';
  if (next.mode === 'settlement') next.mode = 'settlement_form';
  if (next.mode === 'settlement_review') next.mode = 'settlement_review';
  if (next.mode === 'settling_detail') next.mode = 'bo_approval_detail';
  if (next.mode === 'mo_settlement') next.mode = 'mo_settlement_confirmation_detail';
  if (next.mode === 'review' && next.status === 'settled') next.mode = 'settled_detail';
  return SecurityTradeData.bind(next, PortfolioStore.list());
}


function addDemoOpeningTrades(rows) {
  var seeds = new Map(ALL_ROWS.map(function(row) { return [row.ticket, row]; }));
  var groups = new Map();
  rows.forEach(function(row) {
    var seed = seeds.get(row.ticket);
    if (!seed || seed.instrumentCode !== row.instrumentCode || !row.portfolioId) return;
    var key = HoldingsLedger.positionKey(row);
    if (!groups.has(key)) groups.set(key, { row: row, sales: 0 });
    if (row.type === 'sell' && HoldingsLedger.active(row)) groups.get(key).sales += HoldingsLedger.quantity(row);
  });
  var result = rows.slice();
  var ticket = 90000;
  groups.forEach(function(group, key) {
    // Explicit historical demo purchases back the old randomly generated sales.
    [0, 1].forEach(function(index) {
      var demoOpeningKey = key + ':' + index;
      if (result.some(function(row) { return row.demoOpeningKey === demoOpeningKey; })) return;
      while (result.some(function(row) { return row.ticket === String(ticket); })) ticket += 1;
      var original = group.row;
      var qty = Math.ceil((group.sales + 1000) / 2);
      var date = '2026-01-0' + (index + 1);
      result.push(normalizeTradeRow({
        ticket: String(ticket++), demoOpeningKey: demoOpeningKey, type: 'buy',
        status: 'settled', mode: 'settled_detail', readonly: true,
        portfolioId: original.portfolioId, instrument: original.instrument, instrumentCode: original.instrumentCode,
        qty: String(qty), price: original.price, total: formatSeedTotal(qty, original.price),
        counterparty: original.counterparty, custodian: original.custodian, book: original.book,
        tradeDate: date, settlementDate: date, settledAt: date + 'T09:00:00Z', created: date,
        maturityDate: original.maturityDate, author: SEED_AUTHORS[0], term: 'T+0', rate: original.rate,
        strategy: original.strategy, details: { tradeTime: '09:00', executionMethod: 'Phone' },
      }));
    });
  });
  return result;
}
function addDemoTbillTrades(rows) {
  // Augment only the bundled demo dataset, not empty/custom user datasets.
  if (!rows.some(function(row) { return row.demoOpeningKey; })) return rows;
  var portfolio = PortfolioStore.find('LQ-USD');
  if (!portfolio) return rows;
  var result = rows.slice();
  SecurityTradeData.tbills.forEach(function(code, index) {
    if (result.some(function(row) { return row.demoTbillKey === code; })) return;
    var ticket = 91000 + index;
    while (result.some(function(row) { return row.ticket === String(ticket); })) ticket += 1;
    var date = '2026-10-0' + (index + 1);
    var qty = [3100, 4850, 7200, 3800][index];
    var price = ['99.70975806', '99.49249278', '98.62440000', '98.06463158'][index];
    var maturity = code.slice(-6);
    result.push(normalizeTradeRow({
      ticket: String(ticket), demoTbillKey: code, type: 'buy', status: 'settled', mode: 'settled_detail', readonly: true,
      portfolioId: portfolio.id, instrument: code, instrumentCode: code, instrumentCurrency: 'USD',
      qty: String(qty), price: price, total: formatSeedTotal(qty, price), rate: String(4.15 + index * 0.03),
      counterparty: 'Santander', custodian: 'INDEVAL', term: 'T+0', strategy: 'Hold to Maturity (HTM)',
      created: date, tradeDate: date, settlementDate: date, settledAt: date + 'T09:00:00Z',
      maturityDate: '20' + maturity.slice(0, 2) + '-' + maturity.slice(2, 4) + '-' + maturity.slice(4, 6),
      details: { instrument: code, tradeTime: '09:00', executionMethod: 'SWIFT', currency: 'USD',
        settlementDateFinal: date, amount: formatSeedTotal(qty, price), fee: '0', netAmount: formatSeedTotal(qty, price) },
    }));
  });
  return result;
}
function addDemoLiquidityTrades(rows) {
  // Older demo bindings skipped this portfolio when it was already blocked.
  if (!rows.some(function(row) { return row.demoOpeningKey; })) return rows;
  var portfolio = PortfolioStore.find('LQ-MXN');
  if (!portfolio || ['Active', 'Blocked'].indexOf(portfolio.status) < 0) return rows;
  if (rows.some(function(row) { return row.portfolioId === portfolio.id && row.type === 'buy'; })) return rows;
  var result = rows.slice();
  ['BI_CETES_261015', 'BI_CETES_261029', 'BI_CETES_261126', 'BI_CETES_270107'].forEach(function(code, index) {
    var ticket = 92000 + index;
    while (result.some(function(row) { return row.ticket === String(ticket); })) ticket += 1;
    var date = '2026-10-01';
    var qty = [350000, 625000, 180000, 845000][index];
    var rate = String(7.1 + index * 0.05);
    var price = SecurityTradeData.calculatePrice({ instrument: code, settlementDate: date, rate: rate });
    var total = formatSeedTotal(qty, price);
    var maturity = code.slice(-6);
    result.push(normalizeTradeRow({
      ticket: String(ticket), demoLiquidityKey: code, type: 'buy', status: 'settled', mode: 'settled_detail', readonly: true,
      portfolioId: portfolio.id, instrument: code, instrumentCode: code, instrumentCurrency: 'MXN',
      qty: String(qty), price: price, total: total, rate: rate,
      counterparty: 'Santander', custodian: 'INDEVAL', term: 'T+0', strategy: 'Hold to Maturity (HTM)',
      created: date, tradeDate: date, settlementDate: date, settledAt: date + 'T09:00:00Z',
      maturityDate: '20' + maturity.slice(0, 2) + '-' + maturity.slice(2, 4) + '-' + maturity.slice(4, 6),
      details: { instrument: code, tradeTime: '09:00', executionMethod: 'Phone', currency: 'MXN',
        settlementDateFinal: date, amount: total, fee: '0', netAmount: total },
    }));
  });
  return result;
}
var transactionRows = null;
var databasePromise = null;
function list() {
  if (transactionRows) return transactionRows;
  var raw = localStorage.getItem(TRADE_STORAGE_KEY);
  var rows = raw === null ? ALL_ROWS : JSON.parse(raw);
  if (!Array.isArray(rows) || rows.some(function(row) { return !row || typeof row !== 'object'; })) {
    throw new Error('Unable to read saved trades. Existing data has not been changed.');
  }
  var normalized = rows.map(normalizeTradeRow);
  var migration = localStorage.getItem('aura_lots_version') !== '1';
  if (migration) normalized = addDemoOpeningTrades(normalized);
  normalized = addDemoLiquidityTrades(addDemoTbillTrades(normalized));
  var state = HoldingsLedger.project(normalized);
  normalized = normalized.map(function(row) {
    return !row.lotAllocations && state.allocations[row.ticket]
      ? Object.assign({}, row, { lotAllocations: state.allocations[row.ticket] }) : row;
  });
  if (JSON.stringify(rows) !== JSON.stringify(normalized) || raw === null) {
    localStorage.setItem(TRADE_STORAGE_KEY, JSON.stringify(normalized));
  }
  if (migration) localStorage.setItem('aura_lots_version', '1');
  return normalized;
}
function upsert(row) {
  var rows = list();
  var next = HoldingsLedger.prepare(normalizeTradeRow(row), rows);
  localStorage.setItem(TRADE_STORAGE_KEY, JSON.stringify([next].concat(rows.filter(function(item) { return item.ticket !== next.ticket; }))));
  return next;
}
function transact(buildRow) {
  if (!window.indexedDB) return Promise.reject(new Error('This browser does not support secure local trade storage.'));
  if (!databasePromise) databasePromise = new Promise(function(resolve, reject) {
    var request = indexedDB.open('aura-security-ledger', 1);
    request.onupgradeneeded = function() { request.result.createObjectStore('ledger'); };
    request.onsuccess = function() { resolve(request.result); };
    request.onerror = function() { reject(request.error); };
    request.onblocked = function() { reject(new Error('Close older demo tabs and try again.')); };
  });
  return databasePromise.then(function(database) {
    return new Promise(function(resolve, reject) {
      // IndexedDB serializes this read/check/write across tabs; localStorage is a UI mirror.
      var transaction = database.transaction('ledger', 'readwrite');
      var store = transaction.objectStore('ledger');
      var request = store.get('trades');
      var nextRows, next, failure;
      request.onsuccess = function() {
        try {
          var rows = request.result ? addDemoLiquidityTrades(addDemoTbillTrades(request.result.map(normalizeTradeRow))) : list();
          transactionRows = rows;
          next = HoldingsLedger.prepare(normalizeTradeRow(buildRow()), rows);
          nextRows = [next].concat(rows.filter(function(row) { return row.ticket !== next.ticket; }));
          store.put(nextRows, 'trades');
        } catch (error) { failure = error; transaction.abort(); }
        finally { transactionRows = null; }
      };
      transaction.oncomplete = function() {
        localStorage.setItem(TRADE_STORAGE_KEY, JSON.stringify(nextRows));
        resolve(next);
      };
      transaction.onabort = function() { reject(failure || transaction.error || new Error('Unable to save this trade.')); };
      transaction.onerror = function() { failure = failure || transaction.error; };
    });
  });
}
window.TradeStore = { list: list, upsert: upsert, transact: transact, normalize: normalizeTradeRow, modeForStatus: seedModeForStatus };
})();
