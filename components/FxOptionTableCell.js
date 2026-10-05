function FxOptionTableCell(props) {
  const T = AuraTokens;
  const {
    STATUS_LABELS,
    STATUS_VARIANTS,
    formatNumber,
    column,
    row,
    index,
    last
  } = props;
  if (column.key === 'status') {
    return React.createElement(Td, {
      key: column.key,
      width: column.width,
      paddingY: 14
    }, React.createElement(BadgeCell, null, React.createElement(Badge, {
      label: STATUS_LABELS[row.status],
      variant: STATUS_VARIANTS[STATUS_LABELS[row.status]]
    })));
  }
  if (column.key === 'optionType' || column.key === 'side' || column.key === 'settlementType') {
    return React.createElement(Td, {
      key: column.key,
      width: column.width
    }, React.createElement(TextCell, {
      value: row[column.key]
    }));
  }
  if (['optionId'].includes(column.key)) {
    return React.createElement(Td, {
      key: column.key,
      width: column.width,
      align: "right"
    }, React.createElement(TextCell, {
      value: row[column.key],
      numeric: true
    }));
  }
  if (['notional', 'strikePrice', 'premium', 'observedRate'].includes(column.key)) {
    const decimals = column.key === 'strikePrice' || column.key === 'observedRate' ? 4 : 2;
    return React.createElement(Td, {
      key: column.key,
      width: column.width,
      align: "right"
    }, React.createElement(TextCell, {
      value: formatNumber(row[column.key], decimals),
      numeric: true
    }));
  }
  return React.createElement(Td, {
    key: column.key,
    width: column.width,
    last: last
  }, React.createElement(TextCell, {
    value: row[column.key] || '—'
  }));
}
window.FxOptionTableCell = FxOptionTableCell;
