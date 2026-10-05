// Flat table structure; the surrounding Island owns the surface and rounding.
function TableContent(props) {
  return React.createElement('div', {
    style: {
      minWidth: props.minWidth,
      display: 'flex',
      flexDirection: 'column',
      gap: props.gap,
      paddingBottom: props.paddingBottom,
      flex: props.fill ? 1 : undefined,
      minHeight: props.fill ? 0 : undefined,
    },
  }, props.children);
}

function ToolbarTile(props) {
  return React.createElement(Tile, {
    className: props.scrollable ? 'scrollable' : undefined,
    style: {
      minHeight: props.minHeight == null ? 72 : props.minHeight,
      display: 'flex',
      alignItems: 'center',
      gap: props.gap == null ? 8 : props.gap,
      padding: '20px',
      overflowX: props.scrollable ? 'auto' : undefined,
    },
  }, props.children);
}

Object.assign(window, { TableContent, ToolbarTile });
