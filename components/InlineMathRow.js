// InlineMathRow.js — Inline quantity/price/sum composition
// Requires: AuraTokens.js, InputField.js
// Load with: <script src="components/InlineMathRow.js">
//
// Props:
//   quantity           {string}
//   price              {string}
//   sum                {string}
//   onQuantityChange   {function}
//   onPriceChange      {function}

function InlineMathRow(props) {
  var quantity = props.quantity || '';
  var price = props.price || '';
  var sum = props.sum || '';
  var T = AuraTokens;

  return React.createElement('div', {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      width: '100%',
    },
  },
    React.createElement('div', { style: { flex: 1 } },
      React.createElement(InputField, {
        label: 'Quantity',
        value: quantity,
        onChange: props.onQuantityChange,
      })
    ),
    React.createElement('span', {
      style: {
        color: T.colors.tigNeutralPrimary,
        fontSize: T.font.size['body/lg'],
      },
    }, '×'),
    React.createElement('div', { style: { flex: 1 } },
      React.createElement(InputField, {
        label: 'Price',
        value: price,
        onChange: props.onPriceChange,
      })
    ),
    React.createElement('span', {
      style: {
        color: T.colors.tigNeutralPrimary,
        fontSize: T.font.size['body/lg'],
      },
    }, '='),
    React.createElement('span', {
      style: {
        flex: 1,
        color: T.colors.tigNeutralSecondary,
        fontFamily: T.font.family,
        fontSize: T.font.size['body/md'],
        lineHeight: T.font.lineHeight['body/md'] + 'px',
      },
    }, sum)
  );
}

Object.assign(window, { InlineMathRow });
