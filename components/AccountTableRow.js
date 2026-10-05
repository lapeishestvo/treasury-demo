// Props: row, columns, validity, statusVariant, onClick.
function AccountTableRow(props) {
  var row = props.row;
  var columns = props.columns;
  return React.createElement(InteractiveRow, {
    onClick: props.onClick,
    hoverBg: AuraTokens.colors.bgSecondary,
  },
    React.createElement(Td, { width: columns[0].width, first: true }, React.createElement(TextCell, { value: row.name })),
    React.createElement(Td, { width: columns[1].width }, React.createElement(TextCell, { value: row.type })),
    React.createElement(Td, { width: columns[2].width }, React.createElement(TextCell, { value: row.owner })),
    React.createElement(Td, { width: columns[3].width }, React.createElement(TextCell, { value: row.custodian })),
    React.createElement(Td, { width: columns[4].width }, React.createElement(TextCell, { value: props.validity })),
    React.createElement(Td, { width: columns[5].width, paddingY: 10, last: true },
      React.createElement(BadgeCell, null, React.createElement(Badge, {
        label: row.status,
        variant: props.statusVariant || 'neutral-tertiary',
      }))
    )
  );
}

window.AccountTableRow = AccountTableRow;
