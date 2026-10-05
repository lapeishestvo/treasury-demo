// SegmentedControl.js — Shared segmented switch / tabs control
// Requires: AuraTokens.js
// Load with: <script src="components/SegmentedControl.js">
//
// Props:
//   value         {string}
//   onChange      {function}
//   options       {Array<{value, label, activeColor}>}
//   height        {number}  — outer control height, default 48
//   itemHeight    {number}  — selected item height, default 40
//   itemRadius    {number}  — selected item radius, default 10
//   readOnly      {boolean} — visual tabs mode, disables clicking
//   inactiveColor {string}  — optional text color for inactive items

function SegmentedControl(props) {
  var value = props.value;
  var onChange = props.onChange;
  var options = props.options || [];
  var height = props.height != null ? props.height : 48;
  var itemHeight = props.itemHeight != null ? props.itemHeight : 40;
  var itemRadius = props.itemRadius != null ? props.itemRadius : 10;
  var readOnly = !!props.readOnly;
  var inactiveColor = props.inactiveColor;
  var T = AuraTokens;
  var focusState = React.useState(false);
  var focused = focusState[0];
  var setFocused = focusState[1];

  var outerPadding = Math.max(0, (height - itemHeight) / 2);

  return React.createElement('div', {
    'data-stepper-field': 'true',
    'data-stepper-empty': value ? 'false' : 'true',
    style: {
      width: '100%',
      height: height,
      flexShrink: 0,
      display: 'flex',
      gap: 0,
      padding: outerPadding,
      borderRadius: T.radii.sm,
      background: T.colors.bgNeutralSecondary,
      boxShadow: focused ? ('inset 0 0 0 2px ' + T.colors.borderNeutralPrimary) : 'none',
      transition: 'box-shadow 0.12s',
    },
  }, options.map(function(option) {
    var active = option.value === value;
    return React.createElement('button', {
      key: option.value,
      type: 'button',
      onFocus: function() { setFocused(true); },
      onBlur: function() { setFocused(false); },
      onClick: readOnly || !onChange ? undefined : function() { onChange(option.value); },
      style: {
        flex: 1,
        height: itemHeight,
        border: 'none',
        outline: 'none',
        borderRadius: itemRadius,
        background: active ? T.colors.bgNeutralPrimary : 'transparent',
        color: active ? (option.activeColor || T.colors.tigNeutralPrimary) : (inactiveColor || T.colors.tigNeutralSecondary),
        fontFamily: T.font.family,
        fontSize: T.font.size['heading/xs'],
        fontWeight: T.font.weightSemiBold,
        lineHeight: T.font.lineHeight['heading/xs'] + 'px',
        cursor: readOnly ? 'default' : 'pointer',
        transition: 'background 0.12s, color 0.12s',
      },
    }, option.label);
  }));
}

Object.assign(window, { SegmentedControl });
