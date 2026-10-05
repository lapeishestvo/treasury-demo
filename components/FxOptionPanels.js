(function () {
  function FxOptionCreateColumn(props) {
    const T = AuraTokens;
    const {
      scrollRef,
      isReturnedToFo,
      reviewerDefaults,
      flashKeys,
      form,
      updateField,
      OPTION_TYPE_OPTIONS,
      ASSET_OPTIONS,
      COUNTERPARTY_OPTIONS,
      SETTLEMENT_TYPE_OPTIONS,
      CURRENCY_OPTIONS,
      FIXING_SOURCE_OPTIONS,
      openReview
    } = props;
    return React.createElement(IslandColumn, {
      colRef: scrollRef,
      fillMode: "filler-after-last",
      scrollChildren: React.createElement(React.Fragment, null, isReturnedToFo ? React.createElement(ReviewDetailsTile, reviewerDefaults || {}) : null, React.createElement(Section, {
        id: "section-main-info",
        title: "Main info",
        flashKey: flashKeys['section-main-info']
      }, React.createElement(SegmentedControl, {
        value: form.side,
        onChange: value => updateField('side', value),
        options: [{
          value: 'Buy',
          label: '+ Buy',
          activeColor: T.colors.tigSuccessPrimary
        }, {
          value: 'Sell',
          label: '− Sell',
          activeColor: T.colors.tigWarningPrimary
        }]
      }), React.createElement(FieldWithAddon, {
        addon: React.createElement(SelectField, {
          label: "Asset",
          value: form.asset,
          options: ASSET_OPTIONS,
          onChange: value => updateField('asset', value)
        })
      }, React.createElement(SelectField, {
        label: "Option type",
        value: form.optionType,
        options: OPTION_TYPE_OPTIONS,
        onChange: value => updateField('optionType', value)
      })), React.createElement(SelectField, {
        label: "Counterparty",
        value: form.counterparty,
        options: COUNTERPARTY_OPTIONS,
        onChange: value => updateField('counterparty', value)
      }), React.createElement(FieldWithAddon, {
        addon: form.settlementType === 'Cash' ? React.createElement(SelectField, {
          label: "",
          value: form.cashSettlementCurrency,
          options: CURRENCY_OPTIONS,
          onChange: value => updateField('cashSettlementCurrency', value)
        }) : null
      }, React.createElement(SelectField, {
        label: "Settlement type",
        value: form.settlementType,
        options: SETTLEMENT_TYPE_OPTIONS,
        onChange: value => updateField('settlementType', value)
      })), React.createElement(SelectField, {
        label: "Fixing source",
        value: form.fixingSource,
        options: FIXING_SOURCE_OPTIONS,
        onChange: value => updateField('fixingSource', value)
      })), React.createElement(Section, {
        id: "section-when",
        title: "When",
        flashKey: flashKeys['section-when']
      }, React.createElement(InputField, {
        label: "Maturity date",
        value: form.maturityDate,
        onChange: value => updateField('maturityDate', value)
      }), React.createElement(InputField, {
        label: "Strike date",
        value: form.strikeDate,
        onChange: value => updateField('strikeDate', value)
      }), React.createElement(InputField, {
        label: "Settlement date",
        value: form.settlementDate,
        onChange: value => updateField('settlementDate', value)
      })), React.createElement(Section, {
        id: "section-how-much",
        title: "How much",
        flashKey: flashKeys['section-how-much']
      }, React.createElement(InputField, {
        label: "Strike price",
        value: form.strikePrice,
        onChange: value => updateField('strikePrice', value),
        prefix: form.strikePrice ? 'MXN' : undefined
      }), React.createElement(FieldWithAddon, {
        addon: React.createElement(SelectField, {
          label: "",
          value: form.notionalCurrency,
          options: CURRENCY_OPTIONS,
          onChange: value => updateField('notionalCurrency', value)
        })
      }, React.createElement(InputField, {
        label: "Notional",
        value: form.notional,
        onChange: value => updateField('notional', value)
      })), React.createElement(FieldWithAddon, {
        addon: React.createElement(SelectField, {
          label: "",
          value: form.premiumCurrency,
          options: CURRENCY_OPTIONS,
          onChange: value => updateField('premiumCurrency', value)
        })
      }, React.createElement(InputField, {
        label: "Premium",
        value: form.premium,
        onChange: value => updateField('premium', value)
      })))),
      buttons: React.createElement(ButtonStack, {
        buttons: [{
          label: 'Continue',
          variant: 'primary',
          onClick: openReview
        }]
      })
    });
  }
  function FxOptionCreateReview(props) {
    const T = AuraTokens;
    const {
      scrollRef,
      tradeRows,
      flashKeys,
      whenRows,
      howMuchRows,
      setMode,
      submitCreateReview
    } = props;
    return React.createElement(IslandColumn, {
      colRef: scrollRef,
      fillMode: "filler-after-last",
      scrollChildren: React.createElement(React.Fragment, null, React.createElement(ReviewSection, {
        id: "section-main-info",
        title: "Main info",
        rows: tradeRows,
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
      })),
      buttons: React.createElement(ButtonStack, {
        buttons: [{
          label: 'Back',
          variant: 'secondary',
          onClick: () => setMode('edit')
        }, {
          label: 'Submit',
          variant: 'primary',
          onClick: submitCreateReview
        }]
      })
    });
  }
  function FxOptionTradeInfoColumn(props) {
    const T = AuraTokens;
    const {
      scrollRef,
      tradeRows,
      flashKeys,
      whenRows,
      howMuchRows,
      extraChildren
    } = props;
    return React.createElement(IslandColumn, {
      colRef: scrollRef,
      fillMode: "filler-after-last",
      scrollChildren: React.createElement(React.Fragment, null, React.createElement(ViewSection, {
        id: "section-main-info",
        title: "Main info",
        rows: tradeRows,
        flashKey: flashKeys['section-main-info']
      }), React.createElement(ViewSection, {
        id: "section-when",
        title: "When",
        rows: whenRows,
        flashKey: flashKeys['section-when']
      }), React.createElement(ViewSection, {
        id: "section-how-much",
        title: "How much",
        rows: howMuchRows,
        flashKey: flashKeys['section-how-much']
      }), extraChildren)
    });
  }
  function FxOptionApprovalPanel(props) {
    const T = AuraTokens;
    const {
      form,
      updateField,
      persistTrade,
      originalCreator,
      goToBlotter
    } = props;
    return React.createElement(IslandColumn, {
      fillMode: "stretch-last",
      scrollChildren: React.createElement(Section, {
        title: "Management approval"
      }, React.createElement(TextareaField, {
        label: "Comment",
        value: form.reviewComment,
        onChange: value => updateField('reviewComment', value)
      })),
      buttons: React.createElement(ButtonStack, {
        buttons: [{
          label: 'Return to maker',
          variant: 'secondary',
          onClick: () => {
            persistTrade('returned_to_fo', {
              assigned: originalCreator
            });
            goToBlotter();
          }
        }, {
          label: 'Approve',
          variant: 'primary',
          onClick: () => {
            persistTrade('pending_mo_reconciliation', {
              assigned: 'MO Desk'
            });
            goToBlotter();
          }
        }]
      })
    });
  }
  function FxOptionReconciliationPanel(props) {
    const T = AuraTokens;
    const {
      form,
      updateField,
      persistTrade,
      originalCreator,
      goToBlotter
    } = props;
    return React.createElement(IslandColumn, {
      fillMode: "stretch-last",
      scrollChildren: React.createElement(Section, {
        title: "MO trade reconciliation"
      }, React.createElement(InputField, {
        label: "Key trx confirmation",
        value: form.keyTrxConfirmation,
        onChange: value => updateField('keyTrxConfirmation', value)
      }), React.createElement(InputField, {
        label: "UTI",
        value: form.uti,
        onChange: value => updateField('uti', value)
      }), React.createElement(TextareaField, {
        label: "Comment",
        value: form.reviewComment,
        onChange: value => updateField('reviewComment', value)
      })),
      buttons: React.createElement(ButtonStack, {
        buttons: [{
          label: 'Return to maker',
          variant: 'secondary',
          onClick: () => {
            persistTrade('returned_to_fo', {
              assigned: originalCreator
            });
            goToBlotter();
          }
        }, {
          label: 'Mark as exception',
          variant: 'negative',
          onClick: () => {
            persistTrade('exception', {
              assigned: '—'
            });
            goToBlotter();
          }
        }, {
          label: 'Confirm reconciliation',
          variant: 'primary',
          onClick: () => {
            persistTrade('pending_settlement', {
              assigned: 'BO Maker'
            });
            goToBlotter();
          }
        }]
      })
    });
  }
  function FxOptionPremiumForm(props) {
    const T = AuraTokens;
    const {
      reviewerDefaults,
      form,
      updateField,
      setMode
    } = props;
    return React.createElement(IslandColumn, {
      fillMode: "filler-after-last",
      scrollChildren: React.createElement(React.Fragment, null, React.createElement(ReviewDetailsTile, reviewerDefaults || {}), React.createElement(Section, {
        title: "Premium settlement"
      }, React.createElement(InputField, {
        label: "Payment reference",
        value: form.paymentReference,
        onChange: value => updateField('paymentReference', value)
      }), React.createElement(UploadBox, {
        label: "Proof of payment",
        value: form.proofOfPayment,
        onChange: value => updateField('proofOfPayment', value)
      }), React.createElement(TextareaField, {
        label: "Comment",
        value: form.reviewComment,
        onChange: value => updateField('reviewComment', value)
      }))),
      buttons: React.createElement(ButtonStack, {
        buttons: [{
          label: 'Continue',
          variant: 'primary',
          onClick: () => setMode('premium_review')
        }]
      })
    });
  }
  function FxOptionPremiumReview(props) {
    const T = AuraTokens;
    const {
      form,
      setMode,
      submitPremiumReview
    } = props;
    return React.createElement(IslandColumn, {
      fillMode: "filler-after-last",
      scrollChildren: React.createElement(ReviewSection, {
        title: "Premium settlement",
        rows: [{
          label: 'Payment reference',
          value: form.paymentReference || '—'
        }, {
          label: 'Proof of payment',
          value: form.proofOfPayment || '—'
        }, {
          label: 'Comment',
          value: form.reviewComment || '—'
        }]
      }),
      buttons: React.createElement(ButtonStack, {
        buttons: [{
          label: 'Back',
          variant: 'secondary',
          onClick: () => setMode('premium_form')
        }, {
          label: 'Submit',
          variant: 'primary',
          onClick: submitPremiumReview
        }]
      })
    });
  }
  function FxOptionPremiumApprovalPanel(props) {
    const T = AuraTokens;
    const {
      form,
      updateField,
      persistTrade,
      goToBlotter
    } = props;
    return React.createElement(IslandColumn, {
      fillMode: "stretch-last",
      scrollChildren: React.createElement(Section, {
        title: "Premium settlement approval"
      }, React.createElement(TextareaField, {
        label: "Comment",
        value: form.authorizationComment,
        onChange: value => updateField('authorizationComment', value)
      })),
      buttons: React.createElement(ButtonStack, {
        buttons: [{
          label: 'Settlement returned',
          variant: 'secondary',
          onClick: () => {
            persistTrade('returned_to_bo', {
              assigned: 'BO Maker'
            });
            goToBlotter();
          }
        }, {
          label: 'Approve payment',
          variant: 'primary',
          onClick: () => {
            persistTrade('live', {
              assigned: '—'
            });
            goToBlotter();
          }
        }]
      })
    });
  }
  function FxOptionLiveColumn(props) {
    const T = AuraTokens;
    const {
      flashKeys,
      initialContext,
      scrollRef,
      tradeRows,
      whenRows,
      howMuchRows
    } = props;
    return React.createElement(FxOptionTradeInfoColumn, {
      scrollRef,
      tradeRows,
      flashKeys,
      whenRows,
      howMuchRows,
      extraChildren: React.createElement(ViewSection, {
        id: "section-live-position",
        title: "Live position",
        flashKey: flashKeys['section-live-position'],
        rows: [{
          label: 'Valmer status',
          value: initialContext.row && initialContext.row.valmerStatus ? initialContext.row.valmerStatus : 'REGISTERED'
        }, {
          label: 'Current valuation',
          value: '162,450.00 USD'
        }, {
          label: 'Last valuation date',
          value: '2026-07-08'
        }, {
          label: 'Unrealized p&l',
          value: '+15,250.00 USD'
        }]
      })
    });
  }
  function FxOptionExerciseForm(props) {
    const T = AuraTokens;
    const {
      form,
      updateField,
      MONEYNESS_OPTIONS,
      CURRENCY_OPTIONS,
      setMode
    } = props;
    const isCash = form.settlementType === 'Cash';
    return React.createElement(IslandColumn, {
      fillMode: "filler-after-last",
      scrollChildren: React.createElement(Section, {
        title: "Exercise decision"
      }, React.createElement(InputField, {
        label: "Observed rate",
        value: form.observedRate,
        onChange: value => updateField('observedRate', value)
      }), React.createElement(SelectField, {
        label: "Moneyness",
        value: form.moneyness,
        options: MONEYNESS_OPTIONS,
        onChange: value => updateField('moneyness', value)
      }), isCash ? React.createElement(React.Fragment, null, React.createElement(InputField, {
        label: "Payout amount",
        value: form.payoutAmount,
        onChange: value => updateField('payoutAmount', value)
      }), React.createElement(SelectField, {
        label: "Payout currency",
        value: form.payoutCurrency,
        options: CURRENCY_OPTIONS,
        onChange: value => updateField('payoutCurrency', value)
      })) : React.createElement(React.Fragment, null, React.createElement(InputField, {
        label: "Pay amount",
        value: form.payAmount,
        onChange: value => updateField('payAmount', value)
      }), React.createElement(SelectField, {
        label: "Pay currency",
        value: form.payCurrency,
        options: CURRENCY_OPTIONS,
        onChange: value => updateField('payCurrency', value)
      }), React.createElement(InputField, {
        label: "Receive amount",
        value: form.receiveAmount,
        onChange: value => updateField('receiveAmount', value)
      }), React.createElement(SelectField, {
        label: "Receive currency",
        value: form.receiveCurrency,
        options: CURRENCY_OPTIONS,
        onChange: value => updateField('receiveCurrency', value)
      }))),
      buttons: React.createElement(ButtonStack, {
        buttons: [{
          label: 'Continue',
          variant: 'primary',
          onClick: () => setMode('exercise_review')
        }]
      })
    });
  }
  function FxOptionExerciseReview(props) {
    const T = AuraTokens;
    const {
      form,
      setMode,
      submitExerciseReview
    } = props;
    const isCash = form.settlementType === 'Cash';
    const rows = [{
      label: 'Observed rate',
      value: form.observedRate
    }, {
      label: 'Moneyness',
      value: form.moneyness
    }];
    if (isCash) {
      rows.push({
        label: 'Payout amount',
        value: form.payoutAmount + ' ' + form.payoutCurrency
      });
    } else {
      rows.push({
        label: 'Pay amount',
        value: form.payAmount + ' ' + form.payCurrency
      }, {
        label: 'Receive amount',
        value: form.receiveAmount + ' ' + form.receiveCurrency
      });
    }
    return React.createElement(IslandColumn, {
      fillMode: "filler-after-last",
      scrollChildren: React.createElement(ReviewSection, {
        title: "Exercise decision",
        rows: rows
      }),
      buttons: React.createElement(ButtonStack, {
        buttons: [{
          label: 'Back',
          variant: 'secondary',
          onClick: () => setMode('exercise_form')
        }, {
          label: 'Submit',
          variant: 'primary',
          onClick: submitExerciseReview
        }]
      })
    });
  }
  function FxOptionSettlingForm(props) {
    const T = AuraTokens;
    const {
      form,
      updateField,
      setMode
    } = props;
    const isCash = form.settlementType === 'Cash';
    return React.createElement(IslandColumn, {
      fillMode: "filler-after-last",
      scrollChildren: React.createElement(Section, {
        title: "Exercise settlement"
      }, isCash ? React.createElement(React.Fragment, null, React.createElement(InputField, {
        label: "Payout reference",
        value: form.payoutReference,
        onChange: value => updateField('payoutReference', value)
      }), React.createElement(UploadBox, {
        label: "Payout proof",
        value: form.payoutProof,
        onChange: value => updateField('payoutProof', value)
      })) : React.createElement(React.Fragment, null, React.createElement(InputField, {
        label: "Pay reference",
        value: form.payReference,
        onChange: value => updateField('payReference', value)
      }), React.createElement(UploadBox, {
        label: "Pay proof",
        value: form.payProof,
        onChange: value => updateField('payProof', value)
      }), React.createElement(InputField, {
        label: "Receive reference",
        value: form.receiveReference,
        onChange: value => updateField('receiveReference', value)
      }), React.createElement(UploadBox, {
        label: "Receive proof",
        value: form.receiveProof,
        onChange: value => updateField('receiveProof', value)
      })), React.createElement(TextareaField, {
        label: "Comment",
        value: form.settlementComment,
        onChange: value => updateField('settlementComment', value)
      })),
      buttons: React.createElement(ButtonStack, {
        buttons: [{
          label: 'Continue',
          variant: 'primary',
          onClick: () => setMode('settling_review')
        }]
      })
    });
  }
  function FxOptionSettlingReview(props) {
    const T = AuraTokens;
    const {
      form,
      setMode,
      submitSettlingReview
    } = props;
    const isCash = form.settlementType === 'Cash';
    const rows = isCash ? [{
      label: 'Payout reference',
      value: form.payoutReference || '—'
    }, {
      label: 'Payout proof',
      value: form.payoutProof || '—'
    }, {
      label: 'Comment',
      value: form.settlementComment || '—'
    }] : [{
      label: 'Pay reference',
      value: form.payReference || '—'
    }, {
      label: 'Pay proof',
      value: form.payProof || '—'
    }, {
      label: 'Receive reference',
      value: form.receiveReference || '—'
    }, {
      label: 'Receive proof',
      value: form.receiveProof || '—'
    }, {
      label: 'Comment',
      value: form.settlementComment || '—'
    }];
    return React.createElement(IslandColumn, {
      fillMode: "filler-after-last",
      scrollChildren: React.createElement(ReviewSection, {
        title: "Exercise settlement",
        rows: rows
      }),
      buttons: React.createElement(ButtonStack, {
        buttons: [{
          label: 'Back',
          variant: 'secondary',
          onClick: () => setMode('settling_form')
        }, {
          label: 'Submit',
          variant: 'primary',
          onClick: submitSettlingReview
        }]
      })
    });
  }
  Object.assign(window, {
    FxOptionCreateColumn,
    FxOptionCreateReview,
    FxOptionTradeInfoColumn,
    FxOptionApprovalPanel,
    FxOptionReconciliationPanel,
    FxOptionPremiumForm,
    FxOptionPremiumReview,
    FxOptionPremiumApprovalPanel,
    FxOptionLiveColumn,
    FxOptionExerciseForm,
    FxOptionExerciseReview,
    FxOptionSettlingForm,
    FxOptionSettlingReview
  });
})();
