// Fieldset.js — Legacy alias for TileBody
// Requires: AuraTokens.js, Island.js

function Fieldset(props) {
  return React.createElement(TileBody, {
    gap: props.gap,
    padding: props.padding,
    border: props.bordered !== false,
    stretch: props.style && props.style.flex === 1,
    style: props.style,
  }, props.children);
}

Object.assign(window, { Fieldset });
