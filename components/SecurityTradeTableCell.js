function SecurityTradeTableCell(props) {
  const T = AuraTokens;
  const {
    TRADE_TYPE_VARIANT,
    formatTableNumber,
    STATUS_LABELS,
    TRADE_STATUS_VARIANT,
    getToMaturityDays,
    formatToMaturity,
    col,
    row,
    index,
    last
  } = props;
  if (col.key === 'instrument') return React.createElement(Td, {
    key: col.key,
    width: col.width,
    paddingLeft: index === 0 ? 0 : undefined
  }, React.createElement(TextCell, {
    value: row.instrument
  }));
  if (col.key === 'counterparty') return React.createElement(Td, {
    key: col.key,
    width: col.width
  }, React.createElement(TextCell, {
    value: row.counterparty
  }));
  if (col.key === 'type') return React.createElement(Td, {
    key: col.key,
    width: col.width,
    paddingY: 14
  }, React.createElement(BadgeCell, null, React.createElement(Badge, {
    label: row.type === 'buy' ? 'Buy' : 'Sell',
    variant: TRADE_TYPE_VARIANT[row.type]
  })));
  if (col.key === 'price') return React.createElement(Td, {
    key: col.key,
    width: col.width,
    align: "right"
  }, React.createElement(TextCell, {
    value: formatTableNumber(row.price, {
      decimals: 8
    }),
    numeric: true
  }));
  if (col.key === 'qty') return React.createElement(Td, {
    key: col.key,
    width: col.width,
    align: "right"
  }, React.createElement(TextCell, {
    value: formatTableNumber(row.qty),
    numeric: true
  }));
  if (col.key === 'total') return React.createElement(Td, {
    key: col.key,
    width: col.width,
    align: "right"
  }, React.createElement(TextCell, {
    value: formatTableNumber(row.total),
    numeric: true
  }));
  if (col.key === 'status') return React.createElement(Td, {
    key: col.key,
    width: col.width,
    paddingY: 14
  }, React.createElement(BadgeCell, null, React.createElement(Badge, {
    label: STATUS_LABELS[row.status],
    variant: TRADE_STATUS_VARIANT[STATUS_LABELS[row.status]]
  })));
  if (col.key === 'tradeDate') return React.createElement(Td, {
    key: col.key,
    width: col.width
  }, React.createElement(TextCell, {
    value: row.tradeDate
  }));
  if (col.key === 'toMaturity') {
    var toMaturityDays = getToMaturityDays(row.maturityDate);
    return React.createElement(Td, {
      key: col.key,
      width: col.width
    }, React.createElement(TextCell, {
      value: formatToMaturity(row.maturityDate),
      style: toMaturityDays < 0 ? {
        color: T.colors.tigNeutralTertiary
      } : undefined
    }));
  }
  if (col.key === 'maturityDate') return React.createElement(Td, {
    key: col.key,
    width: col.width
  }, React.createElement(TextCell, {
    value: row.maturityDate
  }));
  if (col.key === 'totalInterestAccrued') return React.createElement(Td, {
    key: col.key,
    width: col.width,
    align: "right"
  }, React.createElement(TextCell, {
    value: formatTableNumber(row.totalInterestAccrued),
    numeric: true
  }));
  if (col.key === 'created') return React.createElement(Td, {
    key: col.key,
    width: col.width
  }, React.createElement(TextCell, {
    value: row.created
  }));
  if (col.key === 'author') return React.createElement(Td, {
    key: col.key,
    width: col.width
  }, React.createElement(TextCell, {
    value: row.author
  }));
  if (col.key === 'portfolioName' || col.key === 'counterpartyTrader') return React.createElement(Td, {
    key: col.key,
    width: col.width
  }, React.createElement(TextCell, {
    value: row[col.key] || '—'
  }));
  if (col.key === 'custodian') return React.createElement(Td, {
    key: col.key,
    width: col.width
  }, React.createElement(TextCell, {
    value: row.custodian
  }));
  if (col.key === 'settlementDate') return React.createElement(Td, {
    key: col.key,
    width: col.width
  }, React.createElement(TextCell, {
    value: row.settlementDate
  }));
  if (col.key === 'term') return React.createElement(Td, {
    key: col.key,
    width: col.width
  }, React.createElement(TextCell, {
    value: row.term
  }));
  if (col.key === 'book') return React.createElement(Td, {
    key: col.key,
    width: col.width
  }, React.createElement(TextCell, {
    value: row.book
  }));
  if (col.key === 'strategy') return React.createElement(Td, {
    key: col.key,
    width: col.width
  }, React.createElement(TextCell, {
    value: row.strategy
  }));
  if (col.key === 'rate') return React.createElement(Td, {
    key: col.key,
    width: col.width,
    align: "right"
  }, React.createElement(TextCell, {
    value: formatTableNumber(row.rate, {
      percent: true
    }),
    numeric: true
  }));
  if (col.key === 'interestAccrued1Day') return React.createElement(Td, {
    key: col.key,
    width: col.width,
    align: "right"
  }, React.createElement(TextCell, {
    value: formatTableNumber(row.interestAccrued1Day),
    numeric: true
  }));
  if (col.key === 'realizedPnL') return React.createElement(Td, {
    key: col.key,
    width: col.width,
    align: "right",
    last: last
  }, React.createElement(TextCell, {
    value: formatTableNumber(row.realizedPnL),
    numeric: true
  }));
  return null;
}
window.SecurityTradeTableCell = SecurityTradeTableCell;
