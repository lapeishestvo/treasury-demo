// ToggleField.js — L-size labeled toggle row
// Requires: AuraTokens.js
// Load with: <script src="components/ToggleField.js">
//
// Props:
//   label     {string}
//   checked   {boolean}
//   onChange  {function(boolean)}

function ToggleField(props) {
  var label = props.label || '';
  var checked = !!props.checked;
  var onChange = props.onChange;
  var T = AuraTokens;
  var focusState = React.useState(false);
  var focused = focusState[0];
  var setFocused = focusState[1];

  return React.createElement('button', {
    type: 'button',
    'data-stepper-field': 'true',
    'data-stepper-empty': 'false',
    onFocus: function() { setFocused(true); },
    onBlur: function() { setFocused(false); },
    onClick: onChange ? function() { onChange(!checked); } : undefined,
    style: {
      width: '100%',
      height: 48,
      minHeight: 48,
      borderRadius: T.radii.sm,
      border: '1px solid ' + T.colors.borderNeutralLighter,
      background: T.colors.bgNeutralPrimary,
      display: 'flex',
      alignItems: 'center',
      gap: 12,
      padding: '0 16px',
      cursor: 'pointer',
      outline: 'none',
      boxShadow: focused ? ('inset 0 0 0 2px ' + T.colors.borderNeutralPrimary) : 'none',
      transition: 'box-shadow 0.12s',
    },
  },
    React.createElement('div', {
      style: {
        width: 40,
        height: 24,
        borderRadius: 9999,
        background: checked ? T.colors.bgSuccessPrimary : T.colors.bgNeutralSecondary,
        position: 'relative',
        transition: 'background 0.12s',
        flexShrink: 0,
      },
    },
      React.createElement('div', {
        style: {
          position: 'absolute',
          top: 4,
          left: checked ? 20 : 4,
          width: 16,
          height: 16,
          borderRadius: 9999,
          background: T.colors.bgNeutralPrimary,
          transition: 'left 0.12s',
        },
      })
    ),
    React.createElement('span', {
      style: {
        color: T.colors.tigNeutralPrimary,
        fontFamily: T.font.family,
        fontSize: T.font.size['body/md'],
        fontWeight: T.font.weightBody,
        lineHeight: T.font.lineHeight['body/md'] + 'px',
      },
    }, label)
  );
}

Object.assign(window, { ToggleField });
