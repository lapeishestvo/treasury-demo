// naturalSize is the design slot size; cropped glyphs retain their SVG dimensions.
function AssetIcon(props) {
  var size = props.size || 24;
  var naturalSize = props.naturalSize || 24;
  return React.createElement('span', {
    'aria-hidden': true,
    style: { display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: size, height: size, flexShrink: 0,
      transform: props.rotate ? 'rotate(' + props.rotate + 'deg)' : undefined },
  }, React.createElement('img', {
    src: props.src, alt: '',
    style: { display: 'block', flexShrink: 0,
      transform: 'scale(' + size / naturalSize + ') translate(' + (props.offsetX || 0) + 'px, ' + (props.offsetY || 0) + 'px)' },
  }));
}
window.AssetIcon = AssetIcon;
