// Reusable portfolio fields and read-only review. State and workflow belong to the host page.
function PortfolioForm(props) {
  var form = props.form;
  function field(key) { return function(value) { props.updateField(key, value); }; }
  return React.createElement(React.Fragment, null,
    React.createElement(Section, { id: 'portfolio-main', title: 'Main info' },
      React.createElement(InputField, { label: 'Name', value: form.name, onChange: field('name') }),
      React.createElement(FieldWithAddon, { addonWidth: 128,
        addon: React.createElement(SelectField, { label: 'Currency', value: form.currency, options: props.currencies, onChange: field('currency') }) },
        React.createElement(InputField, { label: 'Code', value: form.code, onChange: field('code') })),
      React.createElement(SelectField, { label: 'Owner', value: form.owner, options: props.owners, searchable: true, onChange: field('owner') })
    ),
    React.createElement(Section, { id: 'portfolio-classification', title: 'Classification', stretch: props.stretch },
      React.createElement(InlineFields, null,
        React.createElement(SelectField, { label: 'Book', value: form.book, options: props.books, onChange: field('book') }),
        React.createElement(SelectField, { label: 'Classification', value: form.classification, options: props.classifications, onChange: field('classification') })
      ),
      React.createElement(TextareaField, { label: 'Justification (required for Banking book + FVTPL)', value: form.justification, onChange: field('justification') })
    )
  );
}

function PortfolioReview(props) {
  var form = props.form;
  return React.createElement(React.Fragment, null,
    React.createElement(ReviewSection, { id: 'portfolio-main', title: 'Main info', rows: [
      { label: 'Name', value: form.name }, { label: 'Code', value: form.code },
      { label: 'Currency', value: form.currency }, { label: 'Owner', value: form.owner },
    ] }),
    React.createElement(ReviewSection, { id: 'portfolio-classification', title: 'Classification', stretch: props.stretch, rows: [
      { label: 'Book', value: form.book }, { label: 'Classification', value: form.classification },
      { label: 'Justification', value: form.justification || '-' },
    ] })
  );
}

Object.assign(window, { PortfolioForm, PortfolioReview });
