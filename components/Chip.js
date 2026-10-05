// Chip.js — Filter / action chip button
// Requires: AuraTokens.js loaded before this file.
// Load with: <script src="components/Chip.js">

function Chip(props) {
  var label       = props.label;
  var active      = props.active;
  var onClick     = props.onClick;
  var showChevron = props.showChevron;
  var icon        = props.icon;
  var iconElement = props.iconElement;
  var count       = props.count;
  var tone        = props.tone || 'secondary';

  var T = AuraTokens;
  var C = T.components.chip;

  var hovState = React.useState(false);
  var hov      = hovState[0];
  var setHov   = hovState[1];

  var baseBg = tone === 'primary' ? T.colors.bgNeutralPrimary : T.colors.bgNeutralSecondary;
  var hovBg  = tone === 'primary' ? T.colors.bgNeutralSecondary : T.colors.bgNeutralSecondaryHover;
  var bg     = active ? T.colors.bgAccentTertiary  : hov ? hovBg : baseBg;
  var color  = active ? T.colors.tigAccentPrimary  : T.colors.tigNeutralPrimary;
  var border = active ? ('1px solid ' + T.colors.borderAccentSecondary) : '1px solid transparent';

  return React.createElement('button', {
    type: 'button',
    'aria-label': props['aria-label'],
    'aria-expanded': props['aria-expanded'],
    'aria-haspopup': props['aria-haspopup'],
    'aria-controls': props['aria-controls'],
    onKeyDown: props.onKeyDown,
    onClick: onClick,
    onMouseEnter: function() { setHov(true); },
    onMouseLeave: function() { setHov(false); },
    style: {
      display: 'inline-flex', alignItems: 'center', gap: props.gap == null ? T.spacing[2] : props.gap,
      fontFamily: T.font.family,
      fontSize: C.fontSize, fontWeight: T.font.weightSemiBold,
      lineHeight: C.lineHeight + 'px',
      background: bg, color: color, border: border,
      borderRadius: C.radius,
      padding: '0 ' + C.hPadding + 'px', height: C.height,
      cursor: 'pointer', whiteSpace: 'nowrap', flexShrink: 0,
      transition: 'background 0.12s, border-color 0.12s, color 0.12s',
    },
  },
    iconElement ? React.createElement('span', {
      style: {
        width: 16,
        height: 16,
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
      },
    }, iconElement) : (icon ? React.createElement('img', { src: icon, width: 16, height: 16, style: { display: 'block' } }) : null),
    label,
    (count && count > 0) ? React.createElement('span', {
      style: {
        background: T.colors.bgAccentPrimary, color: T.colors.tigNeutralWhite,
        borderRadius: T.radii['2xs'], fontSize: T.font.size['body/xs'], fontWeight: T.font.weightBold,
        padding: '1px 7px', lineHeight: T.font.lineHeight['body/xs'] + 'px',
      },
    }, count) : null,
    showChevron ? (props.chevronElement || React.createElement('img', { src: T.icons.chevronDown, width: 16, height: 16, style: { display: 'block' } })) : null
  );
}

Object.assign(window, { Chip });
