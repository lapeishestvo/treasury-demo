// CheckboxControl.js — Compact checkbox control
// Requires: AuraTokens.js
// Load with: <script src="components/CheckboxControl.js">

function CheckboxControl(props) {
  var checked = !!props.checked;
  var T = AuraTokens;

  return React.createElement('div', {
    style: {
      width: 20,
      height: 20,
      borderRadius: 6,
      padding: 1.5,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexShrink: 0,
    },
  },
    React.createElement('div', {
      style: {
        width: '100%',
        height: '100%',
        borderRadius: 5,
        background: checked ? T.colors.bgAccentPrimary : 'transparent',
        border: checked ? 'none' : ('1.5px solid ' + T.colors.borderNeutralTertiary),
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      },
    },
      checked ? React.createElement('svg', {
        width: 20,
        height: 20,
        viewBox: '0 0 20 20',
        fill: 'none',
        'aria-hidden': 'true',
      },
        React.createElement('path', {
          d: 'M5.5 10.5L8.5 13.5L14.5 7.5',
          stroke: T.colors.tigNeutralWhite,
          strokeWidth: '1.75',
          strokeLinecap: 'round',
          strokeLinejoin: 'round',
        })
      ) : null
    )
  );
}

Object.assign(window, { CheckboxControl });
