(function () {
  function AccountForm(props) {
    const T = AuraTokens;
    const {
      mainExpanded,
      setMainExpanded,
      flashKeys,
      form,
      set,
      ownerExpanded,
      setOwnerExpanded
    } = props;
    return React.createElement(React.Fragment, null, React.createElement(Section, {
      id: "section-main",
      title: "Main info",
      expanded: mainExpanded,
      onToggle: () => setMainExpanded(v => !v),
      flashKey: flashKeys['section-main']
    }, React.createElement(InputField, {
      label: "Number",
      value: form.number,
      onChange: set('number')
    }), React.createElement(InputField, {
      label: "Name",
      value: form.name,
      onChange: set('name')
    }), React.createElement(TextareaField, {
      label: "Description (optional)",
      value: form.description,
      onChange: set('description')
    }), React.createElement(InlineFields, null, React.createElement(SelectField, {
      label: "Type",
      value: form.type,
      onChange: set('type'),
      options: ['NOSTRO', 'INTERNAL', 'INVESTMENT']
    }), React.createElement(ReadonlyField, {
      label: "Currency",
      value: form.currency,
      width: 120
    })), React.createElement(InlineFields, null, React.createElement(InputField, {
      label: "Valid from",
      value: form.validFrom,
      onChange: set('validFrom'),
      mask: "date"
    }), React.createElement(InputField, {
      label: "Valid to",
      value: form.validTo,
      onChange: set('validTo'),
      mask: "date"
    }))), React.createElement(Section, {
      id: "section-owner",
      title: "Owner & Custodian",
      expanded: ownerExpanded,
      onToggle: () => setOwnerExpanded(v => !v),
      flashKey: flashKeys['section-owner']
    }, React.createElement(InputField, {
      label: "Owner",
      value: form.owner,
      onChange: set('owner')
    }), React.createElement(InputField, {
      label: "Custodian",
      value: form.custodian,
      onChange: set('custodian')
    }), React.createElement(InputField, {
      label: "Bank",
      value: form.bank,
      onChange: set('bank')
    })));
  }
  function AccountReview(props) {
    const T = AuraTokens;
    const {
      mainRows,
      flashKeys,
      ownerRows
    } = props;
    return React.createElement(React.Fragment, null, React.createElement(ReviewSection, {
      id: "section-main",
      title: "Main info",
      rows: mainRows,
      flashKey: flashKeys['section-main']
    }), React.createElement(ReviewSection, {
      id: "section-owner",
      title: "Owner & Custodian",
      rows: ownerRows,
      flashKey: flashKeys['section-owner'],
      stretch: true
    }));
  }
  function AccountApprovalPanel(props) {
    const T = AuraTokens;
    const {
      comment,
      setComment,
      updateStatus
    } = props;
    return React.createElement(IslandColumn, {
      fillMode: "stretch-last",
      scrollChildren: React.createElement(Tile, {
        stretch: true
      }, React.createElement(TileHeader, {
        title: "Review",
        border: true
      }), React.createElement(TileBody, {
        padding: "20px",
        stretch: true,
        border: false
      }, React.createElement(TextareaField, {
        label: "Comment (optional)",
        value: comment,
        onChange: setComment,
        stretch: true
      }))),
      buttons: React.createElement(ButtonStack, {
        secondary: {
          label: 'Decline',
          variant: 'negative',
          onClick: () => updateStatus('Declined')
        },
        primary: {
          label: 'Approve',
          variant: 'green',
          onClick: () => updateStatus('Active')
        }
      })
    });
  }
  Object.assign(window, {
    AccountForm,
    AccountReview,
    AccountApprovalPanel
  });
})();
