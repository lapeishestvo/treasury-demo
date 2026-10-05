(function () {
  function SecurityTradeForm(props) {
    const T = AuraTokens;
    const {
      flashKeys,
      form,
      updateField,
      INSTRUMENT_OPTIONS,
      COUNTERPARTY_OPTIONS,
      PORTFOLIO_OPTIONS,
      CUSTODIAN_OPTIONS,
      EXECUTION_METHOD_OPTIONS,
      TERM_OPTIONS,
      hasAmountInputs,
      formatMoney,
      STRATEGY_OPTIONS
    } = props;
    return React.createElement(React.Fragment, null, React.createElement(Section, {
      id: "section-main-info",
      title: "Main info",
      flashKey: flashKeys['section-main-info']
    }, React.createElement(SegmentedControl, {
      value: form.tradeType,
      onChange: value => updateField('tradeType', value),
      options: [{
        value: 'buy',
        label: '+ Buy',
        activeColor: T.colors.tigSuccessPrimary
      }, {
        value: 'sell',
        label: '- Sell',
        activeColor: T.colors.tigWarningPrimary
      }]
    }), React.createElement(InlineFields, null, React.createElement(SelectField, {
      label: "Instrument",
      value: form.instrument,
      onChange: value => updateField('instrument', value),
      options: INSTRUMENT_OPTIONS
    }), React.createElement(SelectField, {
      label: "Portfolio",
      value: form.portfolioId,
      displayValue: form.portfolioName,
      onChange: value => updateField('portfolioId', value),
      options: PORTFOLIO_OPTIONS
    })), React.createElement(SelectField, {
      label: "Counterparty",
      value: form.counterparty,
      onChange: value => updateField('counterparty', value),
      options: COUNTERPARTY_OPTIONS
    }), React.createElement(InputField, {
      label: "Counterparty trader (optional)",
      value: form.counterpartyTrader,
      onChange: value => updateField('counterpartyTrader', value)
    }), React.createElement(InlineFields, null, React.createElement(SelectField, {
      label: "Custodian",
      value: form.custodian,
      onChange: value => updateField('custodian', value),
      options: CUSTODIAN_OPTIONS
    }), React.createElement(SelectField, {
      label: "Execution method",
      value: form.executionMethod,
      onChange: value => updateField('executionMethod', value),
      options: EXECUTION_METHOD_OPTIONS
    }))), React.createElement(Section, {
      id: "section-when",
      title: "When",
      flashKey: flashKeys['section-when']
    }, React.createElement(InlineFields, null, React.createElement(InputField, {
      label: "Trade date",
      value: form.tradeDate,
      onChange: value => updateField('tradeDate', value)
    }), React.createElement(InputField, {
      label: "Trade time",
      value: form.tradeTime,
      onChange: value => updateField('tradeTime', value),
      mask: "time"
    })), React.createElement(InlineFields, null, React.createElement(SelectField, {
      label: "Term",
      value: form.term,
      onChange: value => updateField('term', value),
      options: TERM_OPTIONS
    }), React.createElement(ReadonlyField, {
      label: "Settlement date",
      value: form.settlementDate || 'YYYY-MM-DD',
      fluid: true,
      help: 'Trade date plus the number of calendar days selected in Term.'
    }))), React.createElement(Section, {
      id: "section-how-much",
      title: "How much",
      flashKey: flashKeys['section-how-much']
    }, form.tradeType === 'sell' ? React.createElement(ReadonlyField, {
      label: 'Available quantity', value: props.availableQuantity.toLocaleString('en-US'), fluid: true,
    }) : null, React.createElement(InputField, {
      label: "Quantity",
      value: form.quantity,
      onChange: value => updateField('quantity', value),
      mask: "amount"
    }), React.createElement(InlineFields, null, React.createElement(InputField, {
      label: "Rate, %",
      value: form.rate,
      onChange: value => updateField('rate', value),
      mask: "amount"
    }), React.createElement(ReadonlyField, {
      label: "Price",
      value: form.price ? 'MXN ' + form.price : '—',
      fluid: true,
      help: 'Demo calculation: 10 / (1 + Rate / 100 × days to maturity / 360). Settlement must not be after maturity.'
    })), React.createElement(InlineFields, null, React.createElement(ReadonlyField, {
      label: "Sum",
      value: hasAmountInputs ? 'MXN ' + formatMoney(Number(String(form.quantity).replace(/,/g, '')) * Number(String(form.price || '0').replace(/,/g, ''))) : '—',
      fluid: true,
      help: 'Quantity multiplied by Price.'
    }))), React.createElement(Section, {
      id: "section-accounting",
      title: "Accounting",
      flashKey: flashKeys['section-accounting']
    }, React.createElement(SelectField, {
      label: "Strategy",
      value: form.strategy,
      onChange: value => updateField('strategy', value),
      options: STRATEGY_OPTIONS
    })));
  }
  function SecurityTradeReview(props) {
    const T = AuraTokens;
    const {
      mainInfoRows,
      flashKeys,
      whenRows,
      howMuchRows,
      accountingRows
    } = props;
    return React.createElement(React.Fragment, null, React.createElement(ReviewSection, {
      id: "section-main-info",
      title: "Main info",
      rows: mainInfoRows,
      flashKey: flashKeys['section-main-info']
    }), React.createElement(ReviewSection, {
      id: "section-when",
      title: "When",
      rows: whenRows,
      flashKey: flashKeys['section-when']
    }), React.createElement(ReviewSection, {
      id: "section-how-much",
      title: "How much",
      rows: howMuchRows,
      flashKey: flashKeys['section-how-much']
    }), React.createElement(ReviewSection, {
      id: "section-accounting",
      title: "Accounting",
      rows: accountingRows,
      flashKey: flashKeys['section-accounting'],
      stretch: true
    }));
  }
  Object.assign(window, {
    SecurityTradeForm,
    SecurityTradeReview
  });
})();
