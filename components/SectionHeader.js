// SectionHeader.js — Legacy alias for collapsible TileHeader
// Requires: AuraTokens.js, Island.js

function SectionHeader(props) {
  return React.createElement(TileHeader, {
    title: props.title,
    expanded: props.expanded,
    collapsible: true,
    onToggle: props.onToggle,
    border: false,
  });
}

Object.assign(window, { SectionHeader });
