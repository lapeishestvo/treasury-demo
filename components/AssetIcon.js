// Keep exported SVG root dimensions intact; scale only within a stable icon slot.
function AssetIcon(props) {
  var size = props.size || 24;
  var naturalSize = props.naturalSize || 24;
  return React.createElement('span', {
    'aria-hidden': true,
    style: { display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: size, height: size, flexShrink: 0 },
  }, React.createElement('img', {
    src: props.src, alt: '',
    style: { display: 'block', flexShrink: 0, transform: 'scale(' + size / naturalSize + ') rotate(' + (props.rotate || 0) + 'deg)' },
  }));
}
window.AssetIcon = AssetIcon;
