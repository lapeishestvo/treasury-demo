// A flexible field paired with a fixed-width field, such as an amount and currency.
// Props: children (main field), addon (optional field), addonWidth, gap.
function FieldWithAddon(props) {
  return React.createElement('div', {
    style: { display: 'flex', gap: props.gap == null ? 16 : props.gap, width: '100%', alignItems: 'stretch' },
  },
    React.createElement('div', { style: { flex: 1, minWidth: 0 } }, props.children),
    props.addon ? React.createElement('div', {
      style: { width: props.addonWidth == null ? 104 : props.addonWidth, flexShrink: 0 },
    }, props.addon) : null
  );
}

window.FieldWithAddon = FieldWithAddon;
