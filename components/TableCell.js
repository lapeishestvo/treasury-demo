// TableCell.js — Table cell primitives: Td, TextCell, BadgeCell
// Requires: AuraTokens.js loaded before this file.

function Td(props) {
  var children = props.children;
  var width    = props.width;
  var align    = props.align;
  var first    = props.first;
  var last     = props.last;
  var paddingY = props.paddingY !== undefined ? props.paddingY : 16;
  var paddingLeft = props.paddingLeft;
  var paddingRight = props.paddingRight;
  var T        = AuraTokens;

  return React.createElement('div', {
    role: props.role,
    style: {
      width: width, minWidth: width, minHeight: 52, flexShrink: 0,
      display: 'flex', alignItems: 'flex-start',
      paddingTop: paddingY, paddingBottom: paddingY,
      paddingLeft:  paddingLeft !== undefined ? paddingLeft : (first ? T.spacing[5] : T.spacing[3]),
      paddingRight: paddingRight !== undefined ? paddingRight : (last ? T.spacing[5] : T.spacing[3]),
      justifyContent: align === 'right' ? 'flex-end' : 'flex-start',
      boxSizing: 'border-box', overflow: 'hidden',
    },
  }, children);
}

function TextCell(props) {
  var value = props.value;
  var style = props.style || {};
  var numeric = !!props.numeric;
  var T = AuraTokens;

  return React.createElement('div', { style: { flex: 1, minWidth: 0 } },
    React.createElement('div', {
      style: Object.assign({
        color:      T.colors.tigNeutralPrimary,
        fontFamily: T.font.family,
        fontSize:   T.font.size['body/md'],
        fontWeight: T.font.weightBody,
        lineHeight: T.font.lineHeight['body/md'] + 'px',
        display:    '-webkit-box',
        WebkitLineClamp: 2,
        WebkitBoxOrient: 'vertical',
        overflow:   'hidden',
        whiteSpace: 'normal',
        wordBreak:  'break-word',
        fontVariantNumeric: numeric ? 'tabular-nums' : undefined,
        textAlign: numeric ? 'right' : undefined,
      }, style),
    }, value)
  );
}

function BadgeCell(props) {
  return React.createElement('div', {
    style: { display: 'inline-flex', alignItems: 'center', flexShrink: 0, whiteSpace: 'nowrap' },
  }, props.children);
}

function MoneyCell(props) {
  var T = AuraTokens;
  var known = typeof props.value === 'number' && Number.isFinite(props.value);
  return React.createElement('div', { style: {
    display: 'flex', justifyContent: 'flex-end', gap: 2, width: '100%', minWidth: 0,
    fontFamily: T.font.family, fontSize: T.font.size['body/md'],
    lineHeight: T.font.lineHeight['body/md'] + 'px', fontVariantNumeric: 'tabular-nums', whiteSpace: 'nowrap',
  } },
    known && props.currency ? React.createElement('span', { style: { color: T.colors.tigNeutralSecondary } }, props.currency) : null,
    React.createElement('span', { style: { color: known ? T.colors.tigNeutralPrimary : T.colors.tigNeutralTertiary, overflow: 'hidden', textOverflow: 'ellipsis' } },
      known ? props.value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : '\u2014')
  );
}

Object.assign(window, { Td, TextCell, BadgeCell, MoneyCell });
