// Island.js — Canonical island/tile primitives
// Requires: AuraTokens.js

function Island(props) {
  var T = AuraTokens;
  var children = props.children;
  var gap = props.gap != null ? props.gap : T.layout.tileGap;
  var style = props.style || {};
  var background = props.background || T.colors.bgNeutralPrimary;

  return React.createElement('div', {
    style: Object.assign({
      background: background,
      borderRadius: T.layout.islandRadius,
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      gap: gap,
      minWidth: 0,
    }, style),
  }, children);
}

function Tile(props) {
  var T = AuraTokens;
  var children = props.children;
  var stretch = !!props.stretch;
  var background = props.background || T.colors.bgNeutralPrimary;
  var style = props.style || {};

  return React.createElement('div', {
    id: props.id,
    ref: props.tileRef,
    className: props.className,
    style: Object.assign({
      background: background,
      borderRadius: 0,
      overflow: 'hidden',
      flexShrink: 0,
      minWidth: 0,
    }, stretch ? {
      flex: 1,
      minHeight: 0,
      display: 'flex',
      flexDirection: 'column',
    } : {}, style),
  }, children);
}

function TileHeader(props) {
  var T = AuraTokens;
  var title = props.title;
  var expanded = props.expanded;
  var collapsible = !!props.collapsible;
  var onToggle = props.onToggle;
  var actions = props.actions;
  var border = props.border !== false;

  var hovState = React.useState(false);
  var hov = hovState[0];
  var setHov = hovState[1];

  var interactive = collapsible && typeof onToggle === 'function';

  return React.createElement('div', {
    onClick: interactive ? onToggle : undefined,
    onMouseEnter: function() { if (interactive) setHov(true); },
    onMouseLeave: function() { if (interactive) setHov(false); },
    style: {
      position: 'relative',
      height: 60,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 20px',
      background: interactive && hov ? T.colors.bgNeutralPrimaryHover : 'transparent',
      cursor: interactive ? 'pointer' : 'default',
      transition: 'background 0.12s',
      flexShrink: 0,
      gap: 16,
    },
  },
    border ? React.createElement('div', {
      style: {
        position: 'absolute',
        left: 20,
        right: 20,
        bottom: 0,
        height: 1,
        background: T.colors.borderNeutralLighter,
        pointerEvents: 'none',
      },
    }) : null,
    React.createElement('div', {
      style: {
        minWidth: 0,
        flex: 1,
        display: 'flex',
        alignItems: 'center',
      },
    },
      React.createElement('span', {
        style: {
          fontFamily: T.font.family,
          fontSize: T.font.size['heading/sm'],
          fontWeight: T.font.weightBold,
          color: T.colors.tigNeutralPrimary,
          lineHeight: T.font.lineHeight['heading/sm'] + 'px',
          minWidth: 0,
        },
      }, title)
    ),
    actions ? React.createElement('div', { style: { flexShrink: 0, display: 'flex', alignItems: 'center' } }, actions) : null,
    collapsible ? React.createElement('svg', {
      width: 20,
      height: 20,
      viewBox: '0 0 20 20',
      fill: 'none',
      style: {
        flexShrink: 0,
        transition: 'transform 0.2s',
        transform: expanded ? 'rotate(0deg)' : 'rotate(180deg)',
      },
    },
      React.createElement('path', {
        d: 'M5 12.5L10 7.5L15 12.5',
        stroke: T.colors.tigNeutralSecondary,
        strokeWidth: '1.5',
        strokeLinecap: 'round',
        strokeLinejoin: 'round',
      })
    ) : null
  );
}

function TileBody(props) {
  var children = props.children;
  var T = AuraTokens;
  var gap = props.gap != null ? props.gap : 16;
  var padding = props.padding || '20px';
  var stretch = !!props.stretch;
  var border = props.border !== false;
  var style = props.style || {};

  return React.createElement('div', {
    style: Object.assign({
      display: 'flex',
      flexDirection: 'column',
      gap: gap,
      padding: padding,
      borderTop: border ? ('1px solid ' + T.colors.borderNeutralLighter) : 'none',
      minWidth: 0,
    }, stretch ? {
      flex: 1,
      minHeight: 0,
      overflowY: 'auto',
    } : {}, style),
  }, children);
}

function CollapsibleTile(props) {
  return React.createElement(Tile, {
    stretch: props.stretch,
    style: props.style,
    tileRef: props.tileRef,
    className: props.className,
  },
    React.createElement(TileHeader, {
      title: props.title,
      expanded: props.expanded,
      collapsible: true,
      onToggle: props.onToggle,
      border: !!props.expanded,
    }),
    props.expanded ? React.createElement(TileBody, {
      gap: props.gap,
      padding: props.padding,
      stretch: props.stretch,
      border: false,
      style: props.bodyStyle,
    }, props.children) : null
  );
}

function ReadonlyTile(props) {
  return React.createElement(Tile, {
    id: props.id,
    stretch: props.stretch,
    style: props.style,
    tileRef: props.tileRef,
    className: props.className,
  },
    React.createElement(TileHeader, {
      title: props.title,
      border: false,
      actions: props.actions,
    }),
    React.createElement(TileBody, {
      gap: props.gap != null ? props.gap : 12,
      padding: props.padding || '0 20px 20px',
      stretch: props.stretch,
      border: false,
      style: props.bodyStyle,
    }, props.children)
  );
}

Object.assign(window, {
  Island,
  Tile,
  TileHeader,
  TileBody,
  CollapsibleTile,
  ReadonlyTile,
});
