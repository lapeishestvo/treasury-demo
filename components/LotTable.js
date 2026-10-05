// Figma 7172:92834. Horizontal overflow preserves the specified column widths.
(function() {
  var columns = [
    { key: 'acquiredAt', label: 'Settlement', width: 192 },
    { key: 'pending', label: 'Pending', width: 144, numeric: true },
    { key: 'open', label: 'Open', width: 144, numeric: true },
    { key: 'committed', label: 'Committed', width: 144, numeric: true },
    { key: 'closed', label: 'Closed', width: 144, numeric: true },
    { key: 'quantity', label: 'Position quantity', width: 176, numeric: true },
    { key: 'originalQuantity', label: 'Original quantity', width: 176, numeric: true },
    { key: 'accrual', label: 'Accrual', width: 144, numeric: true },
    { key: 'tradeTicket', label: 'Trade', width: 160 },
  ];
  function LotTableRow(props) {
    var T = AuraTokens;
    return React.createElement('div', { role: 'row', 'data-lot-id': props.total ? undefined : props.row.id,
      'data-lot-total': props.total || undefined,
      style: { display: 'flex', height: 52, flexShrink: 0, borderTop: '1px solid ' + T.colors.borderNeutralLighter } },
      columns.map(function(column, index) {
        var value = props.row[column.key];
        var content;
        if (index === 0) content = props.total ? 'Total' : props.row.settlement || '\u2014';
        else if (column.key === 'tradeTicket') content = props.total ? '' : React.createElement('a', {
          href: 'Trade.html?' + new URLSearchParams({ ticket: value }),
          target: '_blank', rel: 'noopener noreferrer',
          title: 'Open purchase trade ' + value,
          style: { display: 'inline-flex', gap: 4, alignItems: 'center', color: T.colors.tigAccentPrimary, textDecoration: 'none', whiteSpace: 'nowrap' },
        }, 'Purchase trade', React.createElement(AssetIcon, { src: 'assets/icons/lot-trade-link.svg', size: 16, naturalSize: 16 }));
        else content = value == null || value === 0 ? (props.total && column.key === 'accrual' ? '' : '\u2014')
          : value.toLocaleString('en-US', { minimumFractionDigits: column.key === 'accrual' ? 8 : 0, maximumFractionDigits: column.key === 'accrual' ? 8 : 0 });
        return React.createElement(Td, { key: column.key, role: 'cell', width: column.width, first: index === 0, last: index === columns.length - 1 },
          React.createElement(TextCell, { value: content, numeric: column.numeric,
            style: { display: 'block', whiteSpace: 'nowrap', color: props.total && index === 0 ? T.colors.tigNeutralSecondary :
              (column.numeric && !value ? T.colors.tigNeutralTertiary : T.colors.tigNeutralPrimary),
              fontWeight: props.total && index > 0 ? T.font.weightSemiBold : T.font.weightBody } })
        );
      })
    );
  }
  function LotTable(props) {
    var T = AuraTokens;
    var scrollRef = React.useRef(null);
    var state = React.useState(1), page = state[0], setPage = state[1];
    var sortState = React.useState({ key: 'acquiredAt', dir: 'asc' }), sort = sortState[0], setSort = sortState[1];
    var pageCount = Math.max(1, Math.ceil(props.rows.length / 25));
    var currentPage = Math.min(page, pageCount);
    var sorted = props.rows.slice().sort(function(a, b) {
      var first = a[sort.key] ?? 0, second = b[sort.key] ?? 0;
      var comparison = typeof first === 'string' ? first.localeCompare(second) : first - second;
      return comparison * (sort.dir === 'asc' ? 1 : -1);
    });
    var visible = sorted.slice((currentPage - 1) * 25, currentPage * 25);
    var totals = {};
    columns.filter(function(column) { return column.numeric && column.key !== 'accrual'; }).forEach(function(column) {
      totals[column.key] = props.rows.reduce(function(sum, row) { return sum + row[column.key]; }, 0);
    });
    function changePage(value) { setPage(value); if (scrollRef.current) scrollRef.current.scrollTop = 0; }
    return React.createElement(Island, { gap: 0, style: { flex: 1, minHeight: 0, overflow: 'hidden', display: 'flex', flexDirection: 'column' } },
      React.createElement('div', { ref: scrollRef, className: 'scrollable', 'aria-label': 'Position lots', tabIndex: 0,
        style: { flex: 1, minHeight: 0, overflow: 'auto' } },
        React.createElement('div', { role: 'table', 'aria-label': 'Lots', style: { minWidth: 1424, minHeight: '100%', display: 'flex', flexDirection: 'column' } },
          React.createElement('div', { role: 'row', style: { display: 'flex', height: 52, flexShrink: 0, position: 'sticky', top: 0, zIndex: 2, background: T.colors.bgNeutralPrimary } },
            columns.map(function(column, index) { return React.createElement(ColHeader, {
              key: column.key, label: column.label, width: column.width, first: index === 0, last: index === columns.length - 1,
              gap: 4, align: column.numeric ? 'right' : 'left', sortable: column.key !== 'tradeTicket', sortKey: column.key,
              sortState: sort, sortIcon: 'assets/icons/lot-sort.svg', activeSortIcon: sort.dir === 'asc' ? 'assets/icons/lot-sort-active.svg' : undefined,
              onSort: function(key) { setSort({ key: key, dir: sort.key === key && sort.dir === 'asc' ? 'desc' : 'asc' }); changePage(1); },
            }); })
          ),
          visible.length ? visible.map(function(row) { return React.createElement(LotTableRow, { key: row.id, row: row }); })
            : React.createElement(EmptyState, { label: 'No lots found' }),
          React.createElement('div', { style: { marginTop: 'auto', position: 'sticky', bottom: 0, zIndex: 1, background: T.colors.bgNeutralPrimary } },
            React.createElement('div', { 'aria-hidden': true, style: { position: 'absolute', top: -20, width: '100%', height: 20,
              background: T.colors.bgNeutralPrimary, maskImage: 'url(assets/icons/lot-fade.svg)', maskSize: '100% 96px', pointerEvents: 'none' } }),
            React.createElement(LotTableRow, { row: totals, total: true })
          )
        )
      ),
      React.createElement(TablePagination, { page: currentPage, pageCount: pageCount, onChange: changePage })
    );
  }
  Object.assign(window, { LotTable: LotTable, LotTableRow: LotTableRow });
})();
