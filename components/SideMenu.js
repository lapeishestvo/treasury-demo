// SideMenu.js — Collapsible sidebar navigation
// Requires: AuraTokens.js
// Load with: <script src="components/SideMenu.js">
//
// Props:
//   activeSectionKey  {string}
//   activeItemKey     {string}

var _SIDE_NAV = [
  { key: 'dashboard', label: 'Dashboard', icon: 'assets/icons/home.svg' },
  {
    key: 'trades', label: 'Trades', icon: 'assets/icons/dollar.svg',
    children: [
      { key: 'security', label: 'Security',           href: 'Security Trades.html' },
      { key: 'money',    label: 'Money Market' },
      { key: 'fx',       label: 'FX Options',        href: 'FX Options.html' },
      { key: 'nonopex',  label: 'Non-OPEX payments' },
    ],
  },
  {
    key: 'portfolios', label: 'Portfolios', icon: 'assets/icons/portfolios.svg', iconNaturalSize: 32,
    children: [
      { key: 'portfolio-list', label: 'Portfolio list', href: 'Portfolios.html' },
      { key: 'positions', label: 'Positions', href: 'Positions.html' },
    ],
  },
  {
    key: 'reference', label: 'Directories', icon: 'assets/icons/list.svg',
    children: [
      { key: 'accounts',    label: 'Accounts',       href: 'Accounts.html' },
      { key: 'approval-g',  label: 'Approval groups' },
      { key: 'approval-r',  label: 'Approval rules' },
      { key: 'calendars',   label: 'Calendars' },
      { key: 'contacts',    label: 'Contacts' },
      { key: 'contracts',   label: 'Contracts' },
      { key: 'instruments', label: 'Instruments' },
    ],
  },
  { key: 'activity', label: 'Activity Log', icon: 'assets/icons/history.svg' },
];

function SideMenu(props) {
  var activeSectionKey = props.activeSectionKey;
  var activeItemKey    = props.activeItemKey;
  var T = AuraTokens;

  var hovState  = React.useState(false);
  var hov       = hovState[0];
  var setHov    = hovState[1];
  var openState = React.useState(activeSectionKey || null);
  var open      = openState[0];
  var setOpen   = openState[1];

  var expanded = hov;
  var panelWidth = expanded ? 240 : 64;

  function toggleSection(key) {
    setOpen(function(prev) { return prev === key ? null : key; });
  }

  var rows = _SIDE_NAV.map(function(item) {
    var hasChildren    = !!(item.children && item.children.length);
    var isParentActive = hasChildren
      ? item.children.some(function(c) { return c.key === activeItemKey; })
      : item.key === activeSectionKey;
    var isOpen = open === item.key;

    // Parent row
    var parentRow = React.createElement(SideMenuItem, {
      key: item.key,
      label: item.label,
      icon: item.icon,
      iconNaturalSize: item.iconNaturalSize,
      active: hasChildren ? (!expanded && isParentActive) : isParentActive,
      hasChevron: hasChildren,
      chevronOpen: isOpen,
      expanded: expanded,
      onClick: function() {
        if (hasChildren) toggleSection(item.key);
        else if (item.href) window.location.href = item.href;
      },
    });

    // Sub-items
    var subDrawer = hasChildren ? React.createElement('div', {
      key: 'sub-' + item.key,
      style: {
        display: 'flex', flexDirection: 'column', gap: T.layout.tileGap + 'px',
        maxHeight: (isOpen && expanded) ? item.children.length * 52 : 0,
        overflow: 'hidden',
        transition: 'max-height 0.22s cubic-bezier(0.4,0,0.2,1)',
        paddingLeft: 0,
      },
    }, item.children.map(function(child) {
      var childActive = child.key === activeItemKey;
      return React.createElement(SideMenuSubItem, {
        key: child.key,
        label: child.label,
        active: childActive,
        expanded: expanded,
        onClick: function() { if (child.href) window.location.href = child.href; },
      });
    })) : null;

    return React.createElement(React.Fragment, { key: item.key }, parentRow, subDrawer);
  });

  return React.createElement('div', {
    style: { width: 64, flexShrink: 0, position: 'relative', zIndex: 10 },
    onMouseEnter: function() { setHov(true); },
    onMouseLeave: function() { setHov(false); },
  },
    React.createElement('div', {
      style: {
        position: 'absolute', top: 0, left: 0,
        width: panelWidth,
        background: T.colors.bgNeutralPrimary,
        borderRadius: T.layout.islandRadius,
        paddingTop: T.spacing[2] + 'px',
        paddingBottom: T.spacing[5] + 'px',
        paddingLeft: '8px',
        paddingRight: '8px',
        display: 'flex', flexDirection: 'column', gap: T.layout.tileGap + 'px',
        overflow: 'hidden',
        transition: 'width 0.22s cubic-bezier(0.4,0,0.2,1)',
        boxShadow: expanded ? T.shadows.popup : 'none',
        minHeight: '100%',
      },
    }, rows)
  );
}

function SideMenuItem(props) {
  var label      = props.label;
  var icon       = props.icon;
  var iconNaturalSize = props.iconNaturalSize || 24;
  var active     = props.active;
  var hasChevron = props.hasChevron;
  var chevronOpen= props.chevronOpen;
  var expanded   = props.expanded;
  var onClick    = props.onClick;
  var T = AuraTokens;

  var hovState = React.useState(false);
  var hov      = hovState[0];
  var setHov   = hovState[1];

  var bg = active ? T.colors.bgNeutralBase : hov ? T.colors.bgNeutralBase : 'transparent';

  return React.createElement('div', {
    onClick: onClick,
    onMouseEnter: function() { setHov(true); },
    onMouseLeave: function() { setHov(false); },
    style: {
      height: 48, minHeight: 48, borderRadius: T.radii.sm,
      background: bg,
      display: 'flex', alignItems: 'center',
      paddingLeft: T.spacing[3] + 'px', paddingRight: T.spacing[3] + 'px',
      cursor: 'pointer', flexShrink: 0,
      transition: 'background 0.12s',
      overflow: 'hidden',
    },
  },
    // Icon container
    React.createElement('div', {
      style: {
        flexShrink: 0,
        paddingRight: T.spacing[3] + 'px',
        display: 'flex', alignItems: 'center',
      },
    },
      React.createElement('span', { style: { width: 24, height: 24, display: 'flex', alignItems: 'center', justifyContent: 'center' } }, React.createElement('img', {
        src: icon, width: iconNaturalSize, height: iconNaturalSize, alt: '',
        style: {
          display: 'block',
          opacity: 1,
          transition: 'opacity 0.15s',
          flexShrink: 0,
          transform: iconNaturalSize !== 24 ? 'scale(' + (24 / iconNaturalSize) + ')' : undefined,
        },
      }))
    ),
    // Label
    React.createElement('div', {
      style: {
        flex: 1, minWidth: 0,
        paddingTop: T.spacing[2] + 'px', paddingBottom: T.spacing[2] + 'px',
        display: 'flex', alignItems: 'center',
      },
    },
      React.createElement('span', {
        style: {
          fontFamily: T.font.family,
          fontSize: T.font.size['body/md'],
          fontWeight: T.font.weightBody,
          color: T.colors.tigNeutralPrimary,
          lineHeight: T.font.lineHeight['body/md'] + 'px',
          whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
          opacity: expanded ? 1 : 0,
          transition: 'opacity 0.15s',
        },
      }, label)
    ),
    // Chevron
    hasChevron && expanded ? React.createElement('div', {
      style: {
        flexShrink: 0, paddingLeft: T.spacing[3] + 'px',
        paddingTop: T.spacing[3] + 'px', paddingBottom: T.spacing[3] + 'px',
        display: 'flex', alignItems: 'center',
      },
    },
      React.createElement('svg', {
        width: 16, height: 16, viewBox: '0 0 16 16', fill: 'none',
        style: { transition: 'transform 0.2s', transform: chevronOpen ? 'rotate(180deg)' : 'rotate(0deg)' },
      },
        React.createElement('path', {
          d: 'M4 6L8 10L12 6',
          stroke: T.colors.tigNeutralTertiary, strokeWidth: '1.5',
          strokeLinecap: 'round', strokeLinejoin: 'round',
        })
      )
    ) : null
  );
}

function SideMenuSubItem(props) {
  var label    = props.label;
  var active   = props.active;
  var expanded = props.expanded;
  var onClick  = props.onClick;
  var T = AuraTokens;

  var hovState = React.useState(false);
  var hov      = hovState[0];
  var setHov   = hovState[1];

  var bg = active ? T.colors.bgNeutralBase : hov ? T.colors.bgNeutralBase : 'transparent';

  return React.createElement('div', {
    onClick: onClick,
    onMouseEnter: function() { setHov(true); },
    onMouseLeave: function() { setHov(false); },
    style: {
      height: 48, minHeight: 48, borderRadius: T.radii.sm,
      background: bg,
      display: 'flex', alignItems: 'center',
      paddingLeft: 48,
      paddingRight: 12,
      cursor: 'pointer', whiteSpace: 'nowrap',
      transition: 'background 0.12s',
      gap: T.spacing[2] + 'px',
    },
  },
    React.createElement('span', {
      style: {
        fontFamily: T.font.family,
        fontSize: T.font.size['body/md'],
        fontWeight: T.font.weightBody,
        color: T.colors.tigNeutralPrimary,
        lineHeight: T.font.lineHeight['body/md'] + 'px',
        opacity: expanded ? 1 : 0,
        transition: 'opacity 0.15s',
      },
    }, label)
  );
}

Object.assign(window, { SideMenu, SideMenuItem, SideMenuSubItem });
