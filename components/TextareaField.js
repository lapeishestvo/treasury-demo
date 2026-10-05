// TextareaField.js — Textarea with floating label
// Requires: AuraTokens.js
// Load with: <script src="components/TextareaField.js">
//
// Props:
//   label     {string}
//   value     {string}
//   onChange  {function}

function TextareaField(props) {
  var label    = props.label;
  var value    = props.value;
  var onChange = props.onChange;
  var T = AuraTokens;
  var hasValue = !!value;
  var focusState = React.useState(false);
  var focused = focusState[0];
  var setFocused = focusState[1];

  return React.createElement('div', {
    'data-stepper-field': 'true',
    'data-stepper-empty': hasValue ? 'false' : 'true',
    style: {
      borderRadius: T.radii.sm,
      background: T.colors.bgNeutralSecondary,
      padding: '12px 16px',
      minHeight: 88,
      maxHeight: 88,
      flexShrink: 0,
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden',
      position: 'relative',
      boxShadow: focused ? ('inset 0 0 0 2px ' + T.colors.borderNeutralPrimary) : 'none',
      transition: 'box-shadow 0.12s',
    },
  },
    hasValue ? React.createElement('span', {
      style: {
        fontSize: T.font.size['body/xs'],
        color: T.colors.tigNeutralTertiary,
        lineHeight: T.font.lineHeight['body/xs'] + 'px',
        display: 'block', marginBottom: 4,
      },
    }, label) : null,
    !hasValue && !focused ? React.createElement('span', {
      style: {
        position: 'absolute',
        left: 16,
        right: 16,
        top: 12,
        fontFamily: T.font.family,
        fontSize: T.font.size['body/md'],
        fontWeight: T.font.weightBody,
        color: T.colors.tigNeutralTertiary,
        lineHeight: T.font.lineHeight['body/md'] + 'px',
        pointerEvents: 'none',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
      },
    }, label) : null,
    React.createElement('textarea', {
      'aria-label': label,
      value: value || '', rows: 3,
      onChange: onChange ? function(e) { onChange(e.target.value); } : undefined,
      onFocus: function() { setFocused(true); },
      onBlur: function() { setFocused(false); },
      style: {
        width: '100%',
        background: 'none',
        border: 'none',
        outline: 'none',
        resize: 'none',
        fontFamily: T.font.family,
        fontSize: T.font.size['body/md'],
        color: T.colors.tigNeutralPrimary,
        lineHeight: T.font.lineHeight['body/md'] + 'px',
        minHeight: T.font.lineHeight['body/md'] * 3,
        maxHeight: T.font.lineHeight['body/md'] * 3,
        overflowY: 'auto',
      },
    })
  );
}

Object.assign(window, { TextareaField });
