// ColHeader.js — Sortable table column header
// Requires: AuraTokens.js loaded before this file.

function ColHeader(props) {
  var label    = props.label;
  var width    = props.width;
  var sortKey  = props.sortKey;
  var sortable = props.sortable;
  var sortState= props.sortState;
  var onSort   = props.onSort;
  var align    = props.align;
  var first    = props.first;
  var last     = props.last;
  var paddingLeft = props.paddingLeft;
  var paddingRight = props.paddingRight;

  var T = AuraTokens;
  var colHovState  = React.useState(false);
  var colHov       = colHovState[0];
  var setColHov    = colHovState[1];
  var iconHovState = React.useState(false);
  var iconHov      = iconHovState[0];
  var setIconHov   = iconHovState[1];

  var active  = sortable && sortState && sortState.key === sortKey;
  var sortSrc = active
    ? (sortState.dir === 'asc' ? T.icons.sortAsc : T.icons.sortDesc)
    : T.icons.sortNone;

  var iconBg = (active || iconHov) ? T.colors.bgNeutralSecondaryHover
             : colHov              ? T.colors.bgNeutralSecondary
             :                       'transparent';

  var pl = paddingLeft !== undefined ? paddingLeft : (first ? T.spacing[5] : T.spacing[3]);
  var pr = paddingRight !== undefined ? paddingRight : (last ? T.spacing[5] : T.spacing[3]);

  return React.createElement('div', {
    role: 'columnheader',
    'aria-sort': sortable ? (active ? (sortState.dir === 'asc' ? 'ascending' : 'descending') : 'none') : undefined,
    onMouseEnter: function() { setColHov(true); },
    onMouseLeave: function() { setColHov(false); setIconHov(false); },
    style: {
      width: width, minWidth: width, height: props.compact ? 40 : 52, flexShrink: 0,
      paddingBottom: props.compact ? 12 : undefined,
      display: 'flex', alignItems: 'center',
      paddingLeft: pl, paddingRight: pr, gap: props.gap ?? (props.compact ? 4 : T.spacing[2]),
      background: 'transparent', userSelect: 'none',
      justifyContent: align === 'right' ? 'flex-end' : 'flex-start',
    },
  },
    React.createElement('span', {
      style: {
        fontFamily: T.font.family,
        fontSize: T.font.size['body/md'],
        fontWeight: T.font.weightBody,
        color: T.colors.tigNeutralPrimary,
        lineHeight: T.font.lineHeight['body/md'] + 'px',
        whiteSpace: 'nowrap',
      },
    }, label),
    sortable ? React.createElement('button', {
      type: 'button', 'aria-label': 'Sort by ' + label, title: 'Sort by ' + label,
      onClick: function() { onSort(sortKey); },
      onMouseEnter: function() { setIconHov(true); },
      onMouseLeave: function() { setIconHov(false); },
      style: {
        width: 24, height: 24, borderRadius: T.radii['4xs'], border: 'none', padding: 0,
        background: iconBg,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        cursor: 'pointer', flexShrink: 0,
        overflow: 'hidden',
        transition: 'background 0.1s',
      },
    },
      React.createElement('img', { src: active && props.activeSortIcon ? props.activeSortIcon : !active && props.sortIcon ? props.sortIcon : sortSrc, alt: '', width: 24, height: 24, style: { display: 'block', borderRadius: T.radii['4xs'] } })
    ) : null
  );
}

Object.assign(window, { ColHeader });
