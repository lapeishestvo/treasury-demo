// FormPageHeader.js — Page-level header for form/detail views
// Requires: AuraTokens.js, Badge.js

function FormPageHeader(props) {
  var title         = props.title || '';
  var status        = props.status;
  var statusVariant = props.statusVariant || 'neutral-secondary';
  var onBack        = props.onBack;
  var actions       = props.actions;
  var width         = props.width || 750;
  var T             = AuraTokens;

  var hovState = React.useState(false);
  var hov      = hovState[0];
  var setHov   = hovState[1];

  return React.createElement('div', {
    className: props.responsive ? 'aura-detail-header' : undefined,
    style: {
      width: width, height: props.height || 72, flexShrink: 0,
      borderRadius: T.layout.islandRadius,
      background: T.colors.bgNeutralPrimary,
      display: 'flex', alignItems: 'center',
      padding: '0 ' + T.spacing[5] + 'px', gap: T.spacing[4],
      overflow: 'hidden',
    },
  },
    React.createElement('button', {
      onClick: onBack,
      'aria-label': 'Go back',
      onMouseEnter: function() { setHov(true); },
      onMouseLeave: function() { setHov(false); },
      style: {
        width: props.backButtonSize || 32, height: props.backButtonSize || 32, borderRadius: props.backButtonRadius || T.radii['2xs'],
        background: hov ? T.colors.bgNeutralSecondaryHover : T.colors.bgNeutralSecondary,
        border: 'none', cursor: 'pointer', flexShrink: 0,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        transition: 'background 0.12s',
      },
    },
      props.backIcon || React.createElement('svg', { width: 16, height: 16, viewBox: '0 0 16 16', fill: 'none' },
        React.createElement('path', {
          d: 'M6.4423 2.49812C6.71936 2.19036 7.19401 2.16554 7.50187 2.44246C7.8097 2.71955 7.8346 3.19416 7.55754 3.50203L4.18449 7.25008H13.4999C13.9141 7.25008 14.2498 7.58594 14.2499 8.00008C14.2499 8.41429 13.9141 8.75008 13.4999 8.75008H4.18449L7.55754 12.4981C7.83461 12.806 7.8097 13.2806 7.50187 13.5577C7.19401 13.8348 6.7194 13.8099 6.4423 13.502L1.9423 8.50203C1.68575 8.2168 1.68565 7.7833 1.9423 7.49812L6.4423 2.49812Z',
          fill: hov ? T.colors.tigNeutralPrimary : T.colors.tigNeutralSecondary,
        })
      )
    ),
    React.createElement('div', {
      className: 'aura-detail-title',
      style: {
        flex: 1,
        minWidth: 0,
        display: 'flex',
        flexDirection: props.subtitle ? 'column' : 'row',
        alignItems: props.subtitle ? 'flex-start' : 'center',
        gap: T.spacing[2] + 'px',
      },
    },
      React.createElement('span', {
        style: {
          fontFamily: T.font.family,
          fontSize: T.font.size['heading/md'],
          fontWeight: T.font.weightBold,
          color: T.colors.tigNeutralPrimary,
          lineHeight: T.font.lineHeight['heading/md'] + 'px',
          minWidth: 0,
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
        },
      }, title),
      props.subtitle ? React.createElement('span', {
        style: { fontFamily: T.font.family, fontSize: T.font.size['body/md'], lineHeight: '20px', color: T.colors.tigNeutralSecondary },
      }, props.subtitle) : null,
      status && !props.statusAtEnd ? React.createElement(Badge, { label: status, variant: statusVariant }) : null
    ),
    status && props.statusAtEnd ? React.createElement(Badge, { label: status, variant: statusVariant }) : null,
    actions ? React.createElement('div', { className: 'aura-detail-actions', style: { flexShrink: 0 } }, actions) : null
  );
}

Object.assign(window, { FormPageHeader });
