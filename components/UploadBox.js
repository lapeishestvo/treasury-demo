// UploadBox.js — Dashed upload drop area
// Requires: AuraTokens.js
// Load with: <script src="components/UploadBox.js">
//
// Props:
//   label {string}

function UploadBox(props) {
  var T = AuraTokens;
  var label = props.label || 'Choose a CSV file';
  var value = props.value || '';
  var onChange = props.onChange;
  var inputRef = React.useRef(null);
  var focusState = React.useState(false);
  var focused = focusState[0];
  var setFocused = focusState[1];

  return React.createElement('div', {
    role: 'button',
    tabIndex: 0,
    onFocus: function() { setFocused(true); },
    onBlur: function() { setFocused(false); },
    onClick: function() {
      if (inputRef.current) inputRef.current.click();
    },
    onKeyDown: function(e) {
      if (e.key !== 'Enter' && e.key !== ' ') return;
      e.preventDefault();
      if (inputRef.current) inputRef.current.click();
    },
    style: {
      width: '100%',
      minHeight: 64,
      flexShrink: 0,
      borderRadius: T.radii.sm,
      border: '1px dashed ' + T.colors.borderNeutralLighter,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 24,
      background: T.colors.bgNeutralPrimary,
      cursor: 'pointer',
      outline: 'none',
      boxShadow: focused ? ('inset 0 0 0 2px ' + T.colors.borderNeutralPrimary) : 'none',
      transition: 'box-shadow 0.12s',
    },
  },
    React.createElement('input', {
      ref: inputRef,
      type: 'file',
      style: { display: 'none' },
      onChange: onChange ? function(e) {
        var file = e.target.files && e.target.files[0];
        onChange(file ? file.name : '');
      } : undefined,
    }),
    React.createElement('span', {
      style: {
        fontFamily: T.font.family,
        fontSize: T.font.size['body/md'],
        lineHeight: '18px',
        color: T.colors.tigNeutralPrimary,
        textAlign: 'center',
      },
    },
      value
        ? value
        : React.createElement(React.Fragment, null,
            React.createElement('span', { style: { textDecoration: 'underline' } }, label),
            ' or drop it here'
          )
    )
  );
}

Object.assign(window, { UploadBox });
