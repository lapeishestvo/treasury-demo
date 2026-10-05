// FilterDropdown.js — Multi-select filter dropdown for table views
// Requires: AuraTokens.js
// Load with: <script src="components/FilterDropdown.js">
//
// Props:
//   Generic mode:
//     options            {Array}
//     selectedKeys       {string[]}
//     onToggleKey        {function(key)}
//     onSetSelectedKeys  {function(string[])}
//     getOptionKey       {function(option)}
//     getOptionLabel     {function(option)}
//   Legacy filter mode:
//     filterKey          {string}
//     rows               {Array}
//     activeValues       {string[]}
//     onToggle           {function(key, value)}
//     onSetValues        {function(key, values)}
//   Shared:
//     anchorRef          {ref}
//     onClose            {function}
//     width              {number}
//     preferredAlign     {'start'|'end'|'auto'}
//     preferredSide      {'bottom'|'top'|'auto'}
//     gap                {number}
//     margin             {number}
//     itemMinHeight      {number}
//     appearance         {'default'|'menu'} - right-hand checkboxes and roomy rows
//     renderOptionLabel  {function(option)}

function FilterDropdown(props) {
  var filterKey    = props.filterKey;
  var rows         = props.rows;
  var activeValues = props.activeValues;
  var onToggle     = props.onToggle;
  var onSetValues  = props.onSetValues;
  var onClose      = props.onClose;
  var anchorRef    = props.anchorRef;
  var T = AuraTokens;
  var menuAppearance = props.appearance === 'menu';

  var ref = React.useRef(null);
  var genericOptions = props.options;
  var getOptionKey = props.getOptionKey || function(option) { return option.key; };
  var getOptionLabel = props.getOptionLabel || function(option) { return option.dropdownLabel || option.label; };
  var options = genericOptions || Array.from(new Set(rows.map(function(r) { return r[filterKey]; }).filter(Boolean))).sort();
  var selectedKeys = props.selectedKeys || activeValues || [];
  var selectedCount = selectedKeys.length;
  var totalCount = options.length;
  var hasSelection = selectedCount > 0;
  var width = props.width || 200;
  var preferredAlign = props.preferredAlign || 'start';
  var preferredSide = props.preferredSide || 'bottom';
  var gap = props.gap != null ? props.gap : 6;
  var margin = props.margin != null ? props.margin : 8;
  var itemMinHeight = props.itemMinHeight || 48;
  var posState = React.useState({ top: 0, left: 0 });
  var position = posState[0];
  var setPosition = posState[1];

  function setSelectedKeys(nextKeys) {
    if (props.onSetSelectedKeys) {
      props.onSetSelectedKeys(nextKeys);
      return;
    }
    if (onSetValues) {
      onSetValues(filterKey, nextKeys);
    }
  }

  function toggleKey(optionKey) {
    if (props.onToggleKey) {
      props.onToggleKey(optionKey);
      return;
    }
    if (onToggle) {
      onToggle(filterKey, optionKey);
    }
  }

  React.useLayoutEffect(function() {
    function updatePosition() {
      if (!anchorRef || !anchorRef.current) return;
      var rect = anchorRef.current.getBoundingClientRect();
      setPosition(getAnchoredDropdownPosition(rect, {
        width: width,
        height: Math.min(52 + Math.max(options.length, 1) * itemMinHeight + 16, 368),
        minVisibleHeight: 160,
        preferredAlign: preferredAlign,
        preferredSide: preferredSide,
        gap: gap,
        margin: margin,
      }));
    }
    updatePosition();
    window.addEventListener('resize', updatePosition);
    window.addEventListener('scroll', updatePosition, true);
      return function() {
        window.removeEventListener('resize', updatePosition);
        window.removeEventListener('scroll', updatePosition, true);
      };
  }, [anchorRef, width, options.length, selectedCount, preferredAlign, preferredSide, gap, margin, itemMinHeight]);

  React.useEffect(function() {
    function h(e) {
      if (ref.current && !ref.current.contains(e.target) && !(anchorRef && anchorRef.current && anchorRef.current.contains(e.target))) onClose();
    }
    function onKeyDown(e) { if (e.key === 'Escape') onClose(); }
    document.addEventListener('mousedown', h);
    document.addEventListener('keydown', onKeyDown);
    return function() { document.removeEventListener('mousedown', h); document.removeEventListener('keydown', onKeyDown); };
  }, [onClose, anchorRef]);

  var dropdown = React.createElement('div', {
    ref: ref,
    role: 'group',
    'aria-label': props['aria-label'] || 'Filter options',
    style: {
      position: 'fixed', top: position.top, bottom: position.bottom, left: position.left,
      background: T.colors.bgNeutralPrimary,
      border: menuAppearance ? 'none' : '1px solid ' + T.colors.borderNeutralLighter,
      borderRadius: menuAppearance ? T.radii.md : T.radii.sm, boxShadow: T.shadows.popup,
      width: position.width, maxHeight: position.maxHeight, zIndex: 200, padding: menuAppearance ? 4 : 8,
      display: menuAppearance ? 'flex' : undefined,
      flexDirection: menuAppearance ? 'column' : undefined,
      gap: menuAppearance ? 4 : undefined,
      overflowY: 'auto', overflowX: 'hidden',
    },
  },
    React.createElement('div', {
      style: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 12,
        padding: menuAppearance ? '0 8px 0 16px' : '4px 12px 8px',
        minHeight: menuAppearance ? 48 : undefined,
        flexShrink: 0,
      },
    },
      React.createElement('span', {
        style: {
          color: T.colors.tigNeutralSecondary,
          fontFamily: T.font.family,
          fontSize: T.font.size['body/md'],
          fontWeight: T.font.weightBody,
          lineHeight: T.font.lineHeight['body/md'] + 'px',
          minWidth: 0,
        },
      }, menuAppearance ? 'Selected ' + selectedCount + ' out of ' + totalCount : totalCount + ' items · ' + selectedCount + ' selected'),
      React.createElement('button', {
        onClick: function() {
          setSelectedKeys(hasSelection ? [] : options.map(getOptionKey));
        },
        style: {
          border: 'none',
          background: 'transparent',
          color: T.colors.tigAccentPrimary,
          fontFamily: T.font.family,
          fontSize: T.font.size['body/md'],
          fontWeight: T.font.weightSemiBold,
          lineHeight: T.font.lineHeight['body/md'] + 'px',
          cursor: 'pointer',
          whiteSpace: 'nowrap',
          flexShrink: 0,
        },
      }, hasSelection ? 'Reset filter' : 'Select all')
    ),
    React.createElement('div', {
      style: {
        height: 1,
        background: T.colors.borderNeutralLighter,
        margin: menuAppearance ? '0 16px' : '0 4px 4px',
        flexShrink: 0,
      },
    }),
    options.map(function(option) {
      var optionKey = getOptionKey(option);
      var checked = selectedKeys.includes(optionKey);
      return React.createElement('div', {
        key: optionKey,
        role: 'checkbox',
        'aria-checked': checked,
        tabIndex: 0,
        onClick: function() { toggleKey(optionKey); },
        onKeyDown: function(e) { if (e.key === ' ' || e.key === 'Enter') { e.preventDefault(); toggleKey(optionKey); } },
        style: {
          display: 'flex', alignItems: 'center', gap: 10,
          padding: menuAppearance ? '0 16px' : '8px 12px', borderRadius: menuAppearance ? T.radii.sm : T.radii.xs,
          minHeight: menuAppearance ? itemMinHeight : undefined,
          flexShrink: 0,
          cursor: 'pointer', transition: 'background 0.1s',
        },
        onMouseEnter: function(e) { e.currentTarget.style.background = T.colors.bgNeutralBase; },
        onMouseLeave: function(e) { e.currentTarget.style.background = 'transparent'; },
      },
        menuAppearance ? React.createElement('span', { style: { order: 2, display: 'flex', marginLeft: 'auto' } }, React.createElement(CheckboxControl, { checked: checked })) : React.createElement('div', {
          style: {
            width: 18, height: 18, borderRadius: T.radii['4xs'],
            border: '1.5px solid ' + (checked ? T.colors.bgAccentPrimary : T.colors.borderNeutralLighter),
            background: checked ? T.colors.bgAccentPrimary : 'transparent',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            flexShrink: 0, transition: 'all 0.1s',
          },
        },
          checked ? React.createElement('svg', { width: 10, height: 8, viewBox: '0 0 10 8', fill: 'none' },
            React.createElement('path', { d: 'M1 4L4 7L9 1', stroke: T.colors.tigNeutralWhite, strokeWidth: '1.5', strokeLinecap: 'round', strokeLinejoin: 'round' })
          ) : null
        ),
        React.createElement('span', {
          style: {
            fontFamily: T.font.family,
            fontSize: T.font.size['body/md'],
            lineHeight: T.font.lineHeight['body/md'] + 'px',
            color: T.colors.tigNeutralPrimary,
          },
        }, props.renderOptionLabel ? props.renderOptionLabel(option) : getOptionLabel(option))
      );
    })
  );

  return ReactDOM.createPortal(dropdown, document.body);
}

Object.assign(window, { FilterDropdown });
