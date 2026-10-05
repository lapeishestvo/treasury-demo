// Controlled multi-select chip. Requires Chip, FilterDropdown, CheckboxControl,
// RelativeInline and AuraTokens. Options have {key, label, color?, outlined?}.
function FilterOptionLabel(props) {
  var option = props.option;
  return React.createElement('span', { style: { display: 'inline-flex', alignItems: 'center', gap: 4 } },
    option.color ? React.createElement('span', {
      'aria-hidden': 'true', style: { color: option.color },
    }, option.outlined ? '\u25cb' : '\u25cf') : null,
    option.label
  );
}

function FilterChip(props) {
  var anchorRef = React.useRef(null);
  var selected = props.selectedKeys || [];
  return React.createElement(RelativeInline, { innerRef: anchorRef },
    React.createElement(Chip, {
      label: props.label, active: selected.length > 0, count: selected.length,
      gap: props.gap, chevronElement: props.chevronElement,
      'aria-expanded': props.open,
      showChevron: true, onClick: function() { props.onOpenChange(!props.open); },
    }),
    props.open ? React.createElement(FilterDropdown, {
      'aria-label': props.label + ' filter',
      anchorRef: anchorRef, options: props.options, selectedKeys: selected,
      onSetSelectedKeys: props.onChange,
      onToggleKey: function(key) {
        props.onChange(selected.includes(key) ? selected.filter(function(item) { return item !== key; }) : selected.concat(key));
      },
      onClose: function() { props.onOpenChange(false); },
      width: props.width || 340, gap: 4, appearance: 'menu',
      renderOptionLabel: function(option) { return React.createElement(FilterOptionLabel, { option: option }); },
    }) : null
  );
}

Object.assign(window, { FilterChip, FilterOptionLabel });
