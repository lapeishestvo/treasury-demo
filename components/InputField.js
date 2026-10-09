// InputField.js — Text input with floating label
// Requires: AuraTokens.js
// Load with: <script src="components/InputField.js">
//
// Props:
//   label     {string}
//   value     {string}
//   onChange  {function}
//   readOnly  {boolean}
//   mask      {'date'|'time'|'amount'} — formats input as YYYY-MM-DD, HH:MM, or grouped number

function formatInputDateMask(raw) {
  var digits = String(raw || '').replace(/\D/g, '').slice(0, 8);
  if (digits.length <= 4) return digits;
  if (digits.length <= 6) return digits.slice(0, 4) + '-' + digits.slice(4);
  return digits.slice(0, 4) + '-' + digits.slice(4, 6) + '-' + digits.slice(6);
}

function formatInputTimeMask(raw) {
  var digits = String(raw || '').replace(/\D/g, '').slice(0, 4);
  if (digits.length <= 2) return digits;
  return digits.slice(0, 2) + ':' + digits.slice(2);
}

function formatInputAmountMask(raw) {
  var source = String(raw || '').replace(/,/g, '');
  var negative = /^\s*-/.test(source);
  var hasDecimal = source.indexOf('.') !== -1;
  var parts = source.replace(/[^\d.]/g, '').split('.');
  var integerDigits = parts[0] || '';
  var decimalDigits = parts.length > 1 ? parts.slice(1).join('') : '';
  if (!integerDigits && !hasDecimal) return negative ? '-' : '';
  integerDigits = integerDigits.replace(/^0+(?=\d)/, '');
  var grouped = integerDigits.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  if (!grouped && hasDecimal) grouped = '0';
  return (negative ? '-' : '') + grouped + (hasDecimal ? '.' + decimalDigits : '');
}

function InputField(props) {
  var label    = props.label;
  var value    = props.value;
  var onChange = props.onChange;
  var readOnly = props.readOnly;
  var prefix   = props.prefix;
  var mask     = props.mask;
  var T = AuraTokens;
  var fieldFontSize = props.fontSize || T.font.size['body/md'];
  var labelText = String(label || '');
  var dateMask = mask === 'date' || (!mask && /\bdate\b/i.test(labelText) && !/\btime\b/i.test(labelText));
  var timeMask = mask === 'time' || (!mask && /\btime\b/i.test(labelText) && !/\bdate\b/i.test(labelText));
  var amountMask = mask === 'amount' || (!mask && !dateMask && !timeMask && (String(prefix || '').trim() === 'MXN' || /\b(amount|price|premium|notional|fee|commission)\b/i.test(labelText)));
  var masked = dateMask || timeMask;
  var displayValue = dateMask ? formatInputDateMask(value) : (timeMask ? formatInputTimeMask(value) : (amountMask ? formatInputAmountMask(value) : (value || '')));
  var maskPlaceholder = dateMask ? 'YYYY-MM-DD' : (timeMask ? 'HH:MM' : '');
  var maskPlaceholderTail = masked ? maskPlaceholder.slice(displayValue.length) : '';
  var hasValue = !!displayValue;
  var focusState = React.useState(false);
  var focused = focusState[0];
  var setFocused = focusState[1];
  var raised = !props.hideLabel && (hasValue || focused);
  var showMask = masked && (raised || props.hideLabel);

  return React.createElement('div', {
    'data-stepper-field': 'true',
    'data-stepper-empty': hasValue ? 'false' : 'true',
    style: {
      width: '100%',
      height: 48,
      flexShrink: 0,
      borderRadius: T.radii.sm,
      background: T.colors.bgNeutralSecondary,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      padding: '0 16px',
      paddingRight: props.trailing ? 52 : 16,
      position: 'relative',
      boxShadow: focused ? ('inset 0 0 0 2px ' + T.colors.borderNeutralPrimary) : 'none',
      transition: 'box-shadow 0.12s',
    },
  },
    React.createElement('div', {
      style: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 0,
        minWidth: 0,
        height: raised ? 36 : T.font.lineHeight['body/md'],
        width: '100%',
      },
    },
      raised ? React.createElement('span', {
        style: {
          fontFamily: T.font.family,
          fontSize: T.font.size['body/sm'],
          fontWeight: T.font.weightBody,
          color: T.colors.tigNeutralSecondary,
          lineHeight: T.font.lineHeight['body/sm'] + 'px',
          marginBottom: 0,
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          width: '100%',
        },
      }, label) : null,
      React.createElement('div', {
        style: {
          display: 'flex',
          alignItems: 'center',
          gap: prefix ? 8 : 0,
          width: '100%',
          minWidth: 0,
        },
      },
      prefix ? React.createElement('span', {
        style: {
          flexShrink: 0,
          fontFamily: T.font.family,
          fontSize: fieldFontSize,
          fontWeight: T.font.weightBody,
          color: T.colors.tigNeutralPrimary,
          lineHeight: T.font.lineHeight['body/md'] + 'px',
        },
      }, prefix) : null,
      React.createElement('div', {
        style: {
          position: 'relative',
          flex: 1,
          minWidth: 0,
          height: T.font.lineHeight['body/md'] + 'px',
        },
      },
        showMask ? React.createElement('span', {
          'aria-hidden': true,
          style: {
            position: 'absolute',
            left: 0,
            right: 0,
            top: 0,
            height: T.font.lineHeight['body/md'] + 'px',
            fontFamily: T.font.family,
            fontSize: fieldFontSize,
            fontWeight: T.font.weightBody,
            lineHeight: T.font.lineHeight['body/md'] + 'px',
            pointerEvents: 'none',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'clip',
          },
        },
          displayValue ? React.createElement('span', {
            style: { color: T.colors.tigNeutralPrimary },
          }, displayValue) : null,
          maskPlaceholderTail ? React.createElement('span', {
            style: { color: T.colors.tigNeutralTertiary },
          }, maskPlaceholderTail) : null
        ) : null,
        !raised && !props.hideLabel ? React.createElement('span', {
          style: {
            position: 'absolute',
            left: 0,
            right: 0,
            top: '50%',
            transform: 'translateY(-50%)',
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
        React.createElement('input', {
          'aria-label': label,
          'aria-invalid': props.invalid || undefined,
          'aria-describedby': props.describedBy,
          type: 'text', value: displayValue, readOnly: !!readOnly,
          inputMode: masked ? 'numeric' : (amountMask ? 'decimal' : undefined),
          maxLength: dateMask ? 10 : (timeMask ? 5 : undefined),
          onChange: onChange ? function(e) {
            onChange(dateMask ? formatInputDateMask(e.target.value) : (timeMask ? formatInputTimeMask(e.target.value) : (amountMask ? formatInputAmountMask(e.target.value) : e.target.value)));
          } : undefined,
          onFocus: function() { setFocused(true); },
          onBlur: function() { setFocused(false); if (props.onBlur) props.onBlur(); },
          style: {
            width: '100%',
            background: 'none', border: 'none', outline: 'none',
            fontFamily: T.font.family,
            fontSize: fieldFontSize,
            color: showMask ? 'transparent' : T.colors.tigNeutralPrimary,
            caretColor: T.colors.tigNeutralPrimary,
            lineHeight: T.font.lineHeight['body/md'] + 'px',
            height: T.font.lineHeight['body/md'] + 'px',
            padding: 0,
            margin: 0,
            cursor: readOnly ? 'default' : 'text',
          },
        })
      )
      )
    ),
    props.trailing ? React.createElement('span', { style: { position: 'absolute', right: 16, top: 12, width: 24, height: 24, display: 'flex', alignItems: 'center', justifyContent: 'center' } }, props.trailing) : null
  );
}

Object.assign(window, { InputField });
