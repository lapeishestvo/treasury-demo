// Badge.js — Semantic status badge
// Requires: AuraTokens.js loaded before this file.
// Load with: <script src="components/Badge.js">

const BADGE_VARIANTS = {
  'neutral-secondary':  { color: AuraTokens.colors.tigNeutralPrimary,  background: AuraTokens.colors.bgNeutralSecondary,  border: 'none' },
  'neutral-tertiary':   { color: AuraTokens.colors.tigNeutralPrimary,  background: AuraTokens.colors.bgNeutralWhite,       border: '1px solid ' + AuraTokens.colors.borderNeutralLighter },
  'success-secondary':  { color: AuraTokens.colors.tigSuccessPrimary,  background: AuraTokens.colors.bgSuccessSecondary,   border: 'none' },
  'success-tertiary':   { color: AuraTokens.colors.tigSuccessPrimary,  background: AuraTokens.colors.bgSuccessTertiary,    border: '1px solid ' + AuraTokens.colors.borderSuccessSecondary },
  'warning-secondary':  { color: AuraTokens.colors.tigWarningPrimary,  background: AuraTokens.colors.bgWarningSecondary,   border: 'none' },
  'warning-tertiary':   { color: AuraTokens.colors.tigWarningPrimary,  background: AuraTokens.colors.bgWarningTertiary,    border: '1px solid ' + AuraTokens.colors.borderWarningSecondary },
  'error-secondary':    { color: AuraTokens.colors.tigErrorPrimary,    background: AuraTokens.colors.bgErrorSecondary,     border: 'none' },
  'error-tertiary':     { color: AuraTokens.colors.tigErrorPrimary,    background: AuraTokens.colors.bgErrorTertiary,      border: '1px solid ' + AuraTokens.colors.borderErrorSecondary },
  'accent-secondary':   { color: AuraTokens.colors.tigAccentPrimary,   background: AuraTokens.colors.bgAccentSecondary,    border: 'none' },
};

function Badge({ label, variant, maxWidth, size }) {
  var T = AuraTokens;
  var C = size === 's' ? { height: 20, radius: 6, hPadding: 6, fontSize: 13, lineHeight: 16 } : T.components.badge;
  var v = BADGE_VARIANTS[variant || 'neutral-secondary'] || BADGE_VARIANTS['neutral-secondary'];
  return React.createElement('span', {
    title: maxWidth ? label : undefined,
    style: {
      display: 'inline-flex', alignItems: 'center',
      height: C.height, padding: '0 ' + C.hPadding + 'px',
      borderRadius: C.radius,
      background: v.background,
      border: v.border,
      color: v.color,
      fontSize: C.fontSize, fontWeight: T.font.weightBody,
      lineHeight: C.lineHeight + 'px',
      fontFamily: T.font.family,
      whiteSpace: 'nowrap', flexShrink: 0, boxSizing: 'border-box',
      maxWidth: maxWidth,
    },
  }, maxWidth ? React.createElement('span', { style: { overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' } }, label) : label);
}

Object.assign(window, { Badge, BADGE_VARIANTS });
