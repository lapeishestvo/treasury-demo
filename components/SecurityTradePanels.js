(function () {
  function TradeApprovalPanel(props) {
    const T = AuraTokens;
    const {
      form,
      updateField,
      returnToFo,
      persistTradeAndReturn
    } = props;
    return React.createElement(IslandColumn, {
      fillMode: "stretch-last",
      scrollChildren: React.createElement(Tile, {
        stretch: true
      }, React.createElement(TileHeader, {
        title: "FO checker review",
        border: true
      }), React.createElement(TileBody, {
        padding: "20px",
        gap: 16,
        stretch: true,
        border: false
      }, React.createElement(TextareaField, {
        label: "Comment",
        value: form.comment,
        onChange: value => updateField('comment', value),
        stretch: true
      }))),
      buttons: React.createElement(ButtonStack, {
        buttons: [{
          label: 'Return to maker',
          variant: 'negative',
          onClick: returnToFo
        }, {
          label: 'Approve',
          variant: 'success',
          onClick: function () {
            persistTradeAndReturn('pending_mo_reconciliation', 'mo_reconciliation_detail', false);
          }
        }]
      })
    });
  }
  function TradeReconciliationForm(props) {
    const T = AuraTokens;
    const {
      form,
      updateField,
      setMode
    } = props;
    return React.createElement(IslandColumn, {
      fillMode: "stretch-last",
      scrollChildren: React.createElement(Tile, {
        stretch: true
      }, React.createElement(TileHeader, {
        title: "MO reconciliation",
        border: true
      }), React.createElement(TileBody, {
        padding: "20px",
        gap: 16,
        stretch: true,
        border: false
      }, React.createElement(InputField, {
        label: "Confirmation reference",
        value: form.moConfirmationReference,
        onChange: value => updateField('moConfirmationReference', value)
      }), React.createElement(InputField, {
        label: "Confirmation date & time",
        value: form.moConfirmationDateTime,
        onChange: value => updateField('moConfirmationDateTime', value)
      }), React.createElement(SegmentedControl, {
        value: form.moDetailsMatch ? 'yes' : 'no',
        onChange: value => updateField('moDetailsMatch', value === 'yes'),
        options: [{
          value: 'yes',
          label: 'Details match'
        }, {
          value: 'no',
          label: 'Mismatch found'
        }]
      }), !form.moDetailsMatch ? React.createElement(TextareaField, {
        label: "Comment",
        value: form.comment,
        onChange: value => updateField('comment', value)
      }) : null)),
      buttons: React.createElement(ButtonStack, {
        primary: {
          label: 'Continue',
          variant: 'primary',
          onClick: () => setMode('mo_reconciliation_review', 'pending_mo_reconciliation')
        }
      })
    });
  }
  function TradeReconciliationReview(props) {
    const T = AuraTokens;
    const {
      moReconciliationRows,
      moReconciliationCommentRows,
      form,
      setMode,
      persistTradeAndReturn,
      returnToFo
    } = props;
    return React.createElement(IslandColumn, {
      fillMode: "stretch-last",
      scrollChildren: React.createElement(React.Fragment, null, React.createElement(ViewSection, {
        title: "MO reconciliation",
        rows: moReconciliationRows
      }), React.createElement(ViewSection, {
        title: "Comment",
        rows: moReconciliationCommentRows,
        stretch: true
      })),
      buttons: form.moDetailsMatch ? React.createElement(ButtonStack, {
        secondary: {
          label: 'Back to edit',
          variant: 'secondary',
          onClick: () => setMode('mo_reconciliation_detail', 'pending_mo_reconciliation')
        },
        primary: {
          label: 'Confirm reconciliation',
          variant: 'primary',
          onClick: function () {
            persistTradeAndReturn('pending_settlement', 'counterparty_form', false);
          }
        }
      }) : React.createElement(ButtonStack, {
        secondary: {
          label: 'Back to edit',
          variant: 'secondary',
          onClick: () => setMode('mo_reconciliation_detail', 'pending_mo_reconciliation')
        },
        primary: {
          label: 'Return to FO Maker',
          variant: 'negative',
          onClick: returnToFo
        }
      })
    });
  }
  function TradeCounterpartyForm(props) {
    const T = AuraTokens;
    const {
      form,
      updateField,
      setMode
    } = props;
    return React.createElement(IslandColumn, {
      fillMode: "stretch-last",
      scrollChildren: React.createElement(Tile, {
        stretch: true
      }, React.createElement(TileHeader, {
        title: "Settlement details",
        border: true
      }), React.createElement(TileBody, {
        padding: "20px",
        gap: 16,
        stretch: true,
        border: false
      }, React.createElement(SelectField, {
        label: "Confirmation method",
        value: form.confirmationMethod,
        onChange: value => updateField('confirmationMethod', value),
        options: ['Platform Swift', 'Phone', 'Email', 'Bloomberg']
      }), React.createElement(InputField, {
        label: "Counterparty confirmation number",
        value: form.confirmationNumber,
        onChange: value => updateField('confirmationNumber', value)
      }), React.createElement(InputField, {
        label: "Contact person",
        value: form.contactPerson,
        onChange: value => updateField('contactPerson', value)
      }), React.createElement(InlineFields, null, React.createElement(InputField, {
        label: "Confirmation date",
        value: form.confirmationDate,
        onChange: value => updateField('confirmationDate', value)
      }), React.createElement(InputField, {
        label: "Confirmation time",
        value: form.confirmationTime,
        onChange: value => updateField('confirmationTime', value)
      })), React.createElement(SegmentedControl, {
        value: form.matchState,
        onChange: value => updateField('matchState', value),
        options: [{
          value: 'matched',
          label: 'Details matched',
          activeColor: T.colors.tigSuccessPrimary
        }, {
          value: 'mismatch',
          label: 'Mismatch found',
          activeColor: T.colors.tigErrorPrimary
        }]
      }), React.createElement(TextareaField, {
        label: "Comment",
        value: form.comment,
        onChange: value => updateField('comment', value)
      }), React.createElement(AttachmentsField, null))),
      buttons: React.createElement(ButtonStack, {
        primary: {
          label: 'Continue',
          variant: 'primary',
          onClick: () => setMode('counterparty_review', 'pending_settlement')
        }
      })
    });
  }
  function TradeCounterpartyReview(props) {
    const T = AuraTokens;
    const {
      counterpartyRows,
      counterpartyCommentRows,
      form,
      setMode,
      persistTradeAndContinue,
      returnToFo
    } = props;
    return React.createElement(IslandColumn, {
      fillMode: "stretch-last",
      scrollChildren: React.createElement(React.Fragment, null, React.createElement(ViewSection, {
        title: "Settlement details",
        rows: counterpartyRows
      }), React.createElement(ViewSection, {
        title: "Comment",
        rows: counterpartyCommentRows,
        stretch: true
      })),
      buttons: form.matchState === 'matched' ? React.createElement(ButtonStack, {
        secondary: {
          label: 'Back to edit',
          variant: 'secondary',
          onClick: () => setMode('counterparty_form', 'pending_settlement')
        },
        primary: {
          label: 'Confirm counterparty',
          variant: 'primary',
          onClick: () => persistTradeAndContinue('counterparty_confirmed', 'settlement_form', false)
        }
      }) : React.createElement(ButtonStack, {
        secondary: {
          label: 'Back to edit',
          variant: 'secondary',
          onClick: () => setMode('counterparty_form', 'pending_settlement')
        },
        primary: {
          label: 'Return to FO',
          variant: 'red',
          onClick: returnToFo
        }
      })
    });
  }
  function TradeSettlementForm(props) {
    const T = AuraTokens;
    const {
      showReviewerCommentTile,
      reviewerComment,
      form,
      updateField,
      formatMoney,
      setMode
    } = props;
    return React.createElement(IslandColumn, {
      fillMode: "stretch-last",
      scrollChildren: React.createElement(React.Fragment, null, showReviewerCommentTile ? React.createElement(ReviewCommentTile, {
        comment: reviewerComment,
        reviewedBy: form.reviewedBy,
        reviewedAt: form.reviewedAt
      }) : null, React.createElement(Tile, {
        stretch: true
      }, React.createElement(TileHeader, {
        title: "Settlement record",
        border: true
      }), React.createElement(TileBody, {
        padding: "20px",
        gap: 16,
        stretch: true,
        border: false
      }, React.createElement(InputField, {
        label: "Bank reference",
        value: form.bankReference,
        onChange: value => updateField('bankReference', value)
      }), React.createElement(InlineFields, null, React.createElement(SelectField, {
        label: "Settlement account",
        value: form.settlementAccount,
        onChange: value => updateField('settlementAccount', value),
        options: ['Main settlement account', 'Reserve account']
      }), React.createElement(InputField, {
        label: "Actual settlement date",
        value: form.settlementDateFinal,
        onChange: value => updateField('settlementDateFinal', value)
      })), React.createElement(InlineFields, null, React.createElement(InputField, {
        label: "Actual settlement amount",
        prefix: form.currency || props.instrumentCurrency,
        value: form.amount,
        onChange: value => updateField('amount', value)
      }), React.createElement(SelectField, {
        label: "Settlement currency",
        value: form.currency,
        onChange: value => updateField('currency', value),
        options: [props.instrumentCurrency || 'MXN']
      })), React.createElement(InlineFields, null, React.createElement(InputField, {
        label: "Fee / commission",
        prefix: form.currency || props.instrumentCurrency,
        value: form.fee,
        onChange: value => updateField('fee', value)
      }), React.createElement(InputField, {
        label: "Net amount",
        prefix: form.currency || props.instrumentCurrency,
        value: form.netAmount || (form.amount && form.fee ? formatMoney(Number(String(form.amount).replace(/[^0-9.-]/g, '')) - Number(String(form.fee).replace(/[^0-9.-]/g, ''))) : form.netAmount),
        onChange: value => updateField('netAmount', value)
      })), React.createElement(InputField, {
        label: "Custodian reference",
        value: form.custodianReference,
        onChange: value => updateField('custodianReference', value)
      }), React.createElement(SegmentedControl, {
        value: form.settlementSide,
        onChange: value => updateField('settlementSide', value),
        options: [{
          value: 'buy',
          label: 'Received',
          activeColor: T.colors.tigSuccessPrimary
        }, {
          value: 'sell',
          label: 'Delivered',
          activeColor: T.colors.tigWarningPrimary
        }]
      }), React.createElement(TextareaField, {
        label: "Comment",
        value: form.comment,
        onChange: value => updateField('comment', value)
      }), React.createElement(AttachmentsField, null)))),
      buttons: React.createElement(ButtonStack, {
        primary: {
          label: 'Continue',
          variant: 'primary',
          onClick: () => setMode('settlement_review', 'counterparty_confirmed')
        }
      })
    });
  }
  function TradeSettlementReview(props) {
    const T = AuraTokens;
    const {
      settlementRows,
      counterpartyCommentRows,
      setMode,
      persistTradeAndReturn
    } = props;
    return React.createElement(IslandColumn, {
      fillMode: "stretch-last",
      scrollChildren: React.createElement(React.Fragment, null, React.createElement(ViewSection, {
        title: "Settlement record",
        rows: settlementRows
      }), React.createElement(ViewSection, {
        title: "Comment",
        rows: counterpartyCommentRows,
        stretch: true
      })),
      buttons: React.createElement(ButtonStack, {
        secondary: {
          label: 'Back to edit',
          variant: 'secondary',
          onClick: () => setMode('settlement_form', 'counterparty_confirmed')
        },
        primary: {
          label: 'Submit for approval',
          variant: 'primary',
          onClick: () => persistTradeAndReturn('settling', 'bo_approval_detail', false)
        }
      })
    });
  }
  function TradeBoCheckerForm(props) {
    const T = AuraTokens;
    const {
      form,
      updateField,
      setMode
    } = props;
    return React.createElement(IslandColumn, {
      fillMode: "stretch-last",
      scrollChildren: React.createElement(Tile, {
        stretch: true
      }, React.createElement(TileHeader, {
        title: "BO checker",
        border: true
      }), React.createElement(TileBody, {
        padding: "20px",
        gap: 16,
        stretch: true,
        border: false
      }, React.createElement(InputField, {
        label: "Custodian statement reference",
        value: form.moCustodianStatementReference,
        onChange: value => updateField('moCustodianStatementReference', value)
      }), React.createElement(SegmentedControl, {
        value: form.moStatementMatch ? 'yes' : 'no',
        onChange: value => updateField('moStatementMatch', value === 'yes'),
        options: [{
          value: 'yes',
          label: 'Statement matches'
        }, {
          value: 'no',
          label: 'Mismatch found'
        }]
      }), !form.moStatementMatch ? React.createElement(TextareaField, {
        label: "Discrepancy notes",
        value: form.moSettlementDiscrepancyNotes,
        onChange: value => updateField('moSettlementDiscrepancyNotes', value)
      }) : null, !form.moStatementMatch ? React.createElement(TextareaField, {
        label: "Comment",
        value: form.comment,
        onChange: value => updateField('comment', value)
      }) : null)),
      buttons: React.createElement(ButtonStack, {
        primary: {
          label: 'Continue',
          variant: 'primary',
          onClick: () => setMode('bo_approval_review', 'settling')
        }
      })
    });
  }
  function TradeBoCheckerReview(props) {
    const T = AuraTokens;
    const {
      boApprovalRows,
      boApprovalCommentRows,
      form,
      setMode,
      persistTradeAndReturn,
      rejectSettlement
    } = props;
    return React.createElement(IslandColumn, {
      fillMode: "stretch-last",
      scrollChildren: React.createElement(React.Fragment, null, React.createElement(ViewSection, {
        title: "BO checker review",
        rows: boApprovalRows
      }), React.createElement(ViewSection, {
        title: "Comment",
        rows: boApprovalCommentRows,
        stretch: true
      })),
      buttons: form.moStatementMatch ? React.createElement(ButtonStack, {
        secondary: {
          label: 'Back to edit',
          variant: 'secondary',
          onClick: () => setMode('bo_approval_detail', 'settling')
        },
        primary: {
          label: 'Approve settlement',
          variant: 'green',
          onClick: () => persistTradeAndReturn('pending_mo_settlement_confirmation', 'mo_settlement_confirmation_detail', false)
        }
      }) : React.createElement(ButtonStack, {
        secondary: {
          label: 'Back to edit',
          variant: 'secondary',
          onClick: () => setMode('bo_approval_detail', 'settling')
        },
        primary: {
          label: 'Return to BO Maker',
          variant: 'negative',
          onClick: rejectSettlement
        }
      })
    });
  }
  function TradeSettlementApprovalPanel(props) {
    const T = AuraTokens;
    const {
      form,
      updateField,
      returnToBo,
      persistTradeAndReturn
    } = props;
    return React.createElement(IslandColumn, {
      fillMode: "stretch-last",
      scrollChildren: React.createElement(Tile, {
        stretch: true
      }, React.createElement(TileHeader, {
        title: "Settlement approval",
        border: true
      }), React.createElement(TileBody, {
        padding: "20px",
        gap: 16,
        stretch: true,
        border: false
      }, React.createElement(TextareaField, {
        label: "Comment",
        value: form.comment,
        onChange: value => updateField('comment', value),
        stretch: true
      }))),
      buttons: React.createElement(ButtonStack, {
        secondary: {
          label: 'Return to BO Maker',
          variant: 'negative',
          onClick: returnToBo
        },
        primary: {
          label: 'Approve settlement',
          variant: 'success',
          onClick: () => persistTradeAndReturn('settled', 'settled_detail', true)
        }
      })
    });
  }
  function TradeReviewerPanel(props) {
    const T = AuraTokens;
    const {
      reviewerComment,
      form
    } = props;
    return React.createElement(IslandColumn, {
      fillMode: "filler-after-last",
      scrollChildren: React.createElement(ReviewCommentTile, {
        comment: reviewerComment,
        reviewedBy: form.reviewedBy,
        reviewedAt: form.reviewedAt
      })
    });
  }
  Object.assign(window, {
    TradeApprovalPanel,
    TradeReconciliationForm,
    TradeReconciliationReview,
    TradeCounterpartyForm,
    TradeCounterpartyReview,
    TradeSettlementForm,
    TradeSettlementReview,
    TradeBoCheckerForm,
    TradeBoCheckerReview,
    TradeSettlementApprovalPanel,
    TradeReviewerPanel
  });
})();
