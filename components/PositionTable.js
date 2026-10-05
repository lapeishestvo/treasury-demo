// Figma 7172:111112, with Portfolio / Instrument / Book component variants.
(function() {
  var commonColumns = [
    { key: 'currency', label: 'Currency', width: 104 },
    { key: 'maturityDate', label: 'Maturity date', width: 152, sortable: true },
    { key: 'pending', label: 'Pending', width: 144, numeric: true, sortable: true },
    { key: 'open', label: 'Open', width: 144, numeric: true, sortable: true },
    { key: 'committed', label: 'Committed', width: 144, numeric: true, sortable: true },
    { key: 'quantity', label: 'Position quantity', width: 176, numeric: true, sortable: true },
    { key: 'acquisitionCost', label: 'Acquisition cost', width: 168, numeric: true, sortable: true },
  ];
  function positionColumns(groupBy) {
    var columns = [];
    if (groupBy !== 'instrument') columns.push({ key: 'instrument', label: 'Instrument', width: 192 });
    if (groupBy !== 'portfolio') columns.push({ key: 'portfolio', label: 'Portfolio', width: groupBy === 'book' ? 144 : 152 });
    return columns.concat(commonColumns);
  }
  function formatPositionValue(value, cost) {
    if (value == null) return '';
    if (typeof value !== 'number') return value;
    if (value === 0 && !cost) return '\u2014';
    return value.toLocaleString('en-US', cost ? { minimumFractionDigits: 8, maximumFractionDigits: 8 } : { maximumFractionDigits: 0 });
  }
  function PositionTableRow(props) {
    var T = AuraTokens;
    return React.createElement('div', {
      role: 'row', 'data-position-id': props.total ? undefined : props.row.id,
      'data-position-total': props.total ? true : undefined,
      tabIndex: !props.total && props.onOpen ? 0 : undefined,
      'aria-label': !props.total ? 'Open lots for ' + props.row.instrument + ' in ' + props.row.portfolio : undefined,
      onClick: !props.total && props.onOpen ? function() { props.onOpen(props.row); } : undefined,
      onKeyDown: !props.total && props.onOpen ? function(event) {
        if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); props.onOpen(props.row); }
      } : undefined,
      onMouseEnter: !props.total ? function(event) { event.currentTarget.style.background = T.colors.bgNeutralSecondary; } : undefined,
      onMouseLeave: !props.total ? function(event) { event.currentTarget.style.background = ''; } : undefined,
      style: { display: 'flex', height: 52, cursor: !props.total && props.onOpen ? 'pointer' : undefined, boxShadow: 'inset 0 1px ' + T.colors.borderNeutralLighter },
    }, props.columns.map(function(column, index) {
      var value = props.total && index === 0 ? 'Total' : props.row[column.key];
      return React.createElement(Td, { key: column.key, role: 'cell', width: column.width, first: index === 0 },
        React.createElement(TextCell, { value: formatPositionValue(value, column.key === 'acquisitionCost'), numeric: column.numeric,
          style: { display: 'block', whiteSpace: 'nowrap', textOverflow: 'ellipsis',
            color: value === 0 ? T.colors.tigNeutralTertiary : props.total && index === 0 ? T.colors.tigNeutralSecondary : T.colors.tigNeutralPrimary,
            fontWeight: props.total ? T.font.weightSemiBold : T.font.weightBody },
        })
      );
    }));
  }
  function PositionGroupHeader(props) {
    var T = AuraTokens;
    return React.createElement('button', {
      type: 'button', 'aria-expanded': props.expanded, 'aria-controls': props.contentId,
      'aria-label': props.label + ' positions', onClick: props.onToggle,
      style: { display: 'flex', alignItems: 'center', gap: 10, width: '100%', height: 60, padding: '20px',
        border: 'none', textAlign: 'left', background: T.colors.bgNeutralPrimary, color: T.colors.tigNeutralPrimary,
        fontFamily: T.font.family, fontSize: T.font.size['heading/sm'], lineHeight: '20px', cursor: 'pointer' },
    },
      React.createElement(AssetIcon, { src: 'assets/icons/position-chevron.svg', size: 20, rotate: props.expanded ? 0 : -90 }),
      React.createElement('span', { style: { fontWeight: T.font.weightSemiBold, whiteSpace: 'nowrap' } }, props.label),
      React.createElement(Badge, { label: props.count + (props.count === 1 ? ' position' : ' positions'), size: 's' }),
      React.createElement(Badge, { label: 'Quantity ' + props.quantity.toLocaleString('en-US'), variant: 'neutral-tertiary', size: 's' })
    );
  }
  function PositionGroup(props) {
    var T = AuraTokens;
    var expandedState = React.useState(true), expanded = expandedState[0], setExpanded = expandedState[1];
    var allState = React.useState(false), showAll = allState[0], setShowAll = allState[1];
    var contentId = React.useId();
    var group = props.group;
    var visible = showAll ? group.rows : group.rows.slice(0, 4);
    return React.createElement(Island, { gap: 0, style: { flexShrink: 0, overflow: 'clip' } },
      React.createElement('div', { 'data-position-group': group.id, style: { position: 'relative' } },
        React.createElement('div', { style: { position: 'sticky', top: 0, zIndex: 3 } },
          React.createElement(PositionGroupHeader, { label: group.label, count: group.rows.length, quantity: group.total.quantity,
            expanded: expanded, contentId: contentId, onToggle: function() { setExpanded(!expanded); } })
        ),
        expanded ? React.createElement('div', { id: contentId, role: 'table', 'aria-label': group.label + ' positions' },
          React.createElement('div', { role: 'rowgroup', style: { position: 'sticky', top: 60, zIndex: 2, background: T.colors.bgNeutralPrimary } },
            React.createElement('div', { role: 'row', style: { display: 'flex', height: 40 } }, props.columns.map(function(column, index) {
              return React.createElement(ColHeader, { key: column.key, label: column.label, width: column.width,
                first: index === 0, align: column.numeric ? 'right' : 'left', compact: true,
                sortable: column.sortable, sortKey: column.key, sortState: props.sort, onSort: props.onSort,
                sortIcon: 'assets/icons/position-sort.svg' });
            })),
            React.createElement(PositionTableRow, { row: group.total, columns: props.columns, total: true })
          ),
          React.createElement('div', { role: 'rowgroup' }, visible.map(function(row) {
            return React.createElement(PositionTableRow, { key: row.id, row: row, columns: props.columns, onOpen: props.onOpen });
          }))
        ) : null,
        expanded && group.rows.length > 4 ? React.createElement('button', {
          type: 'button', 'aria-expanded': showAll, onClick: function() { setShowAll(!showAll); },
          style: { display: 'flex', alignItems: 'center', gap: 8, width: '100%', height: 48, padding: '0 22px',
            background: T.colors.bgNeutralPrimary, color: T.colors.tigNeutralPrimary, border: 'none',
            fontFamily: T.font.family, fontWeight: T.font.weightSemiBold, fontSize: 15, cursor: 'pointer' },
        }, showAll ? 'Show top 4' : 'Show ' + (group.rows.length - 4) + ' more',
          React.createElement(AssetIcon, { src: 'assets/icons/position-chevron.svg', size: 20, rotate: showAll ? 180 : 0 })
        ) : null
      )
    );
  }
  function PositionTable(props) {
    var columns = positionColumns(props.groupBy);
    var width = columns.reduce(function(total, column) { return total + column.width; }, 0);
    return React.createElement('div', {
      className: 'scrollable', 'aria-label': 'Positions', tabIndex: 0,
      style: { flex: 1, minHeight: 0, overflow: 'auto', borderRadius: AuraTokens.layout.islandRadius },
    },
      props.groups.length ? React.createElement('div', { style: { minWidth: width, display: 'flex', flexDirection: 'column', gap: AuraTokens.layout.islandGap } },
        props.groups.map(function(group) { return React.createElement(PositionGroup, {
          key: group.id, group: group, columns: columns, sort: props.sort, onSort: props.onSort, onOpen: props.onOpen,
        }); })
      ) : React.createElement(Island, null, React.createElement(EmptyState, { label: 'No positions found' }))
    );
  }
  Object.assign(window, { PositionTable, PositionGroup, PositionGroupHeader, PositionTableRow });
})();
