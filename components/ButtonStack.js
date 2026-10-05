// ButtonStack.js — Pinned bottom action bar with L-size buttons
// Requires: AuraTokens.js
// Load with: <script src="components/ButtonStack.js">
//
// Props:
//   buttons  {Array<{label, onClick, variant}>}
//            variant: 'primary' | 'secondary' | 'success' | 'negative'
//            Rendered left-to-right, each fills equal width (flex: 1)
//
// Legacy shorthand (backwards-compat):
//   primary   {object}  { label, onClick, variant: 'primary'|'success' }
//   secondary {object}  { label, onClick, variant: 'secondary'|'negative' }

function BtnL(props) {
  var label   = props.label;
  var onClick = props.onClick;
  var variant = props.variant || 'primary';
  var T       = AuraTokens;
  var medium = props.size === 'm';
  var height = medium ? 48 : 56;
  var iconSize = medium ? 20 : 24;
  var stylesByVariant = {
    ghost: {
      bg: 'transparent',
      bgHover: T.colors.bgNeutralSecondaryHover,
      color: T.colors.tigNeutralPrimary,
    },
    primary: {
      bg: T.colors.bgPlataPrimary,
      bgHover: T.colors.bgPlataPrimaryHover,
      color: T.colors.tigNeutralWhite,
    },
    secondary: {
      bg: T.colors.bgNeutralSecondary,
      bgHover: T.colors.bgNeutralSecondaryHover,
      color: T.colors.tigNeutralPrimary,
    },
    success: {
      bg: T.colors.bgSuccessPrimary,
      bgHover: T.colors.bgSuccessPrimaryHover,
      color: T.colors.tigNeutralWhite,
    },
    inverse: {
      bg: T.colors.bgNeutralInverseSecondary,
      bgHover: T.colors.bgNeutralInverse,
      color: T.colors.tigNeutralWhite,
    },
    negative: {
      bg: T.colors.bgNeutralSecondary,
      bgHover: T.colors.bgNeutralSecondaryHover,
      color: T.colors.tigErrorPrimary,
    },
  };

  var s = stylesByVariant[variant] || stylesByVariant.primary;

  var hovState = React.useState(false);
  var hov      = hovState[0];
  var setHov   = hovState[1];

  return React.createElement('button', {
    ref: props.buttonRef,
    onClick: onClick,
    disabled: !!props.disabled,
    'aria-label': props.iconOnly ? label : undefined,
    title: props.iconOnly ? label : undefined,
    onMouseEnter: function() { setHov(true); },
    onMouseLeave: function() { setHov(false); },
    style: {
      flex: props.iconOnly ? '0 0 auto' : 1,
      width: props.iconOnly ? height : undefined,
      height: height,
      borderRadius: medium ? 12 : 16,
      padding: medium ? '0 14px' : '0 16px',
      display: props.iconSrc ? 'inline-flex' : undefined,
      alignItems: 'center', justifyContent: 'center', gap: 8,
      background: hov && !props.disabled ? s.bgHover : s.bg,
      border: 'none',
      fontFamily: T.font.family,
      fontSize: 17,
      fontWeight: T.font.weightBold,
      lineHeight: '20px',
      color: s.color,
      cursor: props.disabled ? 'default' : 'pointer',
      transition: 'background 0.12s',
    },
  }, props.iconSrc ? React.createElement('span', { style: { width: iconSize, height: iconSize, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 } },
      React.createElement('img', { src: props.iconSrc, alt: '', style: { flexShrink: 0, transform: 'scale(' + (iconSize / (props.iconNaturalSize || 24)) + ')' } })) : null,
    props.iconOnly ? null : label);
}

function ButtonStack(props) {
  var T = AuraTokens;

  // Support both new `buttons` array and legacy `primary`/`secondary` props
  var btns = props.buttons;
  if (!btns) {
    btns = [];
    if (props.secondary) {
      var secVariant = props.secondary.variant || 'secondary';
      btns.push({ label: props.secondary.label, onClick: props.secondary.onClick, variant: secVariant });
    }
    if (props.primary) {
      var primVariant = props.primary.variant === 'green' ? 'success'
                      : props.primary.variant === 'dark'  ? 'inverse'
                      : props.primary.variant === 'red'   ? 'negative'
                      : props.primary.variant || 'primary';
      btns.push({ label: props.primary.label, onClick: props.primary.onClick, variant: primVariant });
    }
  }

  return React.createElement('div', {
    style: {
      background: T.colors.bgBase,
      borderRadius: 0,
      padding: 20,
      flexShrink: 0,
      display: 'flex',
      flexDirection: 'row',
      gap: 8,
    },
  }, btns.map(function(b, i) {
    return React.createElement(BtnL, {
      key: i,
      label: b.label,
      onClick: b.onClick,
      variant: b.variant,
      size: props.size,
      iconSrc: b.iconSrc,
      iconNaturalSize: b.iconNaturalSize,
      iconOnly: b.iconOnly,
      disabled: b.disabled,
    });
  }));
}

Object.assign(window, { ButtonStack, BtnL });
