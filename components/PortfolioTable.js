// Figma 7170:88961 / 7170:88962. Optional onOpen(row) enables detail navigation.
// Requires ColHeader, TableCell, Badge, Island and UiPrimitives.
var PORTFOLIO_COLUMNS = [
  { key: 'name', label: 'Name', width: 192 },
  { key: 'code', label: 'Code', width: 144 },
  { key: 'book', label: 'Book', width: 144 },
  { key: 'classification', label: 'Classification', width: 120 },
  { key: 'currency', label: 'Currency', width: 104 },
  { key: 'status', label: 'Status', width: 184 },
  { key: 'owner', label: 'Owner', width: 192 },
];

function PortfolioTableRow(props) {
  var row = props.row;
  return React.createElement('div', {
    role: 'row', 'data-portfolio-code': row.code,
    tabIndex: props.onOpen ? 0 : undefined,
    onClick: props.onOpen ? function() { props.onOpen(row); } : undefined,
    onKeyDown: function(event) {
      if (props.onOpen && (event.key === 'Enter' || event.key === ' ')) { event.preventDefault(); props.onOpen(row); }
    },
    style: { display: 'flex', minHeight: 52, cursor: props.onOpen ? 'pointer' : undefined, boxShadow: 'inset 0 1px ' + AuraTokens.colors.borderNeutralLighter },
  }, PORTFOLIO_COLUMNS.map(function(column, index) {
    return React.createElement(Td, {
      key: column.key, width: column.width, first: index === 0,
      paddingY: column.key === 'status' ? 14 : 16,
    }, column.key === 'status'
      ? React.createElement(Badge, { label: row.status, variant: props.statusVariants[row.status], maxWidth: column.width - 24 })
      : React.createElement(TextCell, { value: row[column.key], style: { whiteSpace: 'nowrap', display: 'block', textOverflow: 'ellipsis' } })
    );
  }));
}

function PortfolioTable(props) {
  return React.createElement(Island, { style: { flex: 1, minHeight: 0 } },
    React.createElement(ScrollColumn, { x: 'auto', y: 'auto' },
      React.createElement('div', { role: 'table', 'aria-label': 'Portfolio list', style: { minWidth: PORTFOLIO_COLUMNS.reduce(function(total, column) { return total + column.width; }, 0) } },
        React.createElement(StickyTableHeader, { border: false }, PORTFOLIO_COLUMNS.map(function(column, index) {
          return React.createElement(ColHeader, { key: column.key, label: column.label, width: column.width, first: index === 0 });
        })),
        props.rows.map(function(row) { return React.createElement(PortfolioTableRow, { key: row.id || row.code, row: row, statusVariants: props.statusVariants, onOpen: props.onOpen }); }),
        props.rows.length === 0 ? React.createElement(EmptyState, { label: 'No portfolios found' }) : null
      )
    )
  );
}

Object.assign(window, { PortfolioTable, PortfolioTableRow });
