// Props: value (buy/sell, case-insensitive), signed, emptyLabel.
function TradeTypeBadge(props) {
  if (!props.value && props.emptyLabel != null) return props.emptyLabel;
  var isBuy = String(props.value).toLowerCase() === 'buy';
  var label = isBuy ? 'Buy' : 'Sell';
  if (props.signed) label = (isBuy ? '+ ' : '\u2212 ') + label;
  return React.createElement(Badge, {
    label: label,
    variant: isBuy ? 'success-tertiary' : 'warning-tertiary',
  });
}

window.TradeTypeBadge = TradeTypeBadge;
