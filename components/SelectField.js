// SelectField.js — Dropdown select field
// Requires: AuraTokens.js
// Load with: <script src="components/SelectField.js">
//
// Props:
//   label     {string}
//   value     {string}
//   onChange  {function}
//   options   {Array<string | {value: string, label: string}>}

function SelectField(props) {
  var label   = props.label;
  var value   = props.value;
  var onChange= props.onChange;
  var options = props.options || [];
  function optionValue(option) { return typeof option === 'string' ? option : option.value; }
  function optionLabel(option) { return typeof option === 'string' ? option : option.label; }
  var selected = options.find(function(option) { return optionValue(option) === value; });
  var displayValue = selected ? optionLabel(selected) : (props.displayValue || value);
  var searchState = React.useState('');
  var query = searchState[0];
  var setQuery = searchState[1];
  var visibleOptions = options.filter(function(option) {
    return !props.searchable || optionLabel(option).toLowerCase().includes(query.toLowerCase());
  });
  var T = AuraTokens;

  var openState = React.useState(false);
  var open    = openState[0];
  var setOpen = openState[1];
  var ref = React.useRef(null);
  var menuRef = React.useRef(null);
  var posState = React.useState(null);
  var position = posState[0];
  var setPosition = posState[1];
  var focusState = React.useState(false);
  var focused = focusState[0];
  var setFocused = focusState[1];
  var hasValue = !!value;
  var hasLabel = label != null && String(label).length > 0;
  var raised = hasLabel && (hasValue || focused || open);

  function updatePosition() {
    if (!ref.current) return;
    var rect = ref.current.getBoundingClientRect();
    setPosition(getAnchoredDropdownPosition(rect, {
      width: rect.width,
      height: Math.min(Math.max(options.length, 1) * 44 + 16 + (props.searchable ? 48 : 0), props.searchable ? 480 : 256),
      minVisibleHeight: 160,
      preferredAlign: 'start',
      preferredSide: 'bottom',
      gap: 4,
      margin: 8,
    }));
  }

  React.useEffect(function() {
    function h(e) {
      var insideTrigger = ref.current && ref.current.contains(e.target);
      var insideMenu = menuRef.current && menuRef.current.contains(e.target);
      if (!insideTrigger && !insideMenu) setOpen(false);
    }
    document.addEventListener('mousedown', h);
    return function() { document.removeEventListener('mousedown', h); };
  }, []);

  React.useLayoutEffect(function() {
    if (!open) return;
    updatePosition();
    function handleViewportChange() { updatePosition(); }
    window.addEventListener('resize', handleViewportChange);
    window.addEventListener('scroll', handleViewportChange, true);
    return function() {
      window.removeEventListener('resize', handleViewportChange);
      window.removeEventListener('scroll', handleViewportChange, true);
    };
  }, [open, options.length]);

  React.useEffect(function() { if (!open) setQuery(''); }, [open]);

  return React.createElement('div', {
    ref: ref,
    'data-stepper-field': 'true',
    'data-stepper-empty': value ? 'false' : 'true',
    style: { position: 'relative', width: '100%', minWidth: 0, flexShrink: 0 },
  },
    React.createElement('div', {
      role: 'button',
      'aria-label': label || value,
      'aria-expanded': open,
      'aria-haspopup': 'listbox',
      tabIndex: 0,
      onFocus: function() { setFocused(true); },
      onBlur: function() { setFocused(false); },
      onClick: function() {
        if (!open) updatePosition();
        setOpen(function(o) { return !o; });
      },
      onKeyDown: function(e) {
        if (e.key === 'Escape') { setOpen(false); return; }
        if (e.key !== 'Enter' && e.key !== ' ') return;
        e.preventDefault();
        if (!open) updatePosition();
        setOpen(function(o) { return !o; });
      },
      style: {
        height: 48, borderRadius: T.radii.sm,
        background: T.colors.bgNeutralSecondary,
        padding: raised ? '5px 16px' : '0 16px', display: 'flex', alignItems: 'center',
        justifyContent: 'space-between', cursor: 'pointer',
        outline: 'none',
        boxShadow: focused ? ('inset 0 0 0 2px ' + T.colors.borderNeutralPrimary) : 'none',
        transition: 'box-shadow 0.12s, padding 0.12s',
      },
    },
      React.createElement('span', {
        style: {
          display: 'flex',
          flexDirection: 'column',
          justifyContent: raised ? 'flex-start' : 'center',
          minWidth: 0,
          flex: '1 1 auto',
          overflow: 'hidden',
        },
      },
        raised ? React.createElement('span', {
          style: {
            width: '100%',
            fontFamily: T.font.family,
            fontSize: T.font.size['body/sm'],
            fontWeight: T.font.weightBody,
            color: T.colors.tigNeutralSecondary,
            lineHeight: T.font.lineHeight['body/sm'] + 'px',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          },
        }, label) : null,
        React.createElement('span', {
          style: {
            width: '100%',
            height: T.font.lineHeight['body/md'] + 'px',
            fontFamily: T.font.family,
            fontSize: T.font.size['body/md'],
            fontWeight: T.font.weightBody,
            lineHeight: T.font.lineHeight['body/md'] + 'px',
            color: hasValue ? T.colors.tigNeutralPrimary : T.colors.tigNeutralTertiary,
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          },
        }, raised ? (displayValue || '') : (displayValue || label))
      ),
      React.createElement('svg', {
        width: 16, height: 16, viewBox: '0 0 16 16', fill: 'none',
        style: { transition: 'transform 0.15s', transform: open ? 'rotate(180deg)' : 'none', flexShrink: 0 },
      },
        React.createElement('path', {
          d: 'M4 6L8 10L12 6',
          stroke: T.colors.tigNeutralTertiary, strokeWidth: '1.5',
          strokeLinecap: 'round', strokeLinejoin: 'round',
        })
      )
    ),
    open && position ? ReactDOM.createPortal(
      React.createElement('div', {
        ref: menuRef,
        onKeyDown: function(e) {
          if (e.key === 'Escape') {
            setOpen(false);
            ref.current.querySelector('[role="button"]').focus();
          }
        },
        style: {
          position: 'fixed',
          left: position.left,
          width: position.width,
          top: position.top,
          bottom: position.bottom,
          background: T.colors.bgNeutralPrimary,
          border: '1px solid ' + T.colors.borderNeutralLighter,
          borderRadius: T.radii.sm,
          boxShadow: T.shadows.popup,
          zIndex: 1000,
          padding: 8,
          maxHeight: position.maxHeight,
          overflowY: 'auto',
        },
      },
      props.searchable ? React.createElement('input', {
        autoFocus: true, value: query, placeholder: 'Search', 'aria-label': 'Search ' + label,
        onChange: function(e) { setQuery(e.target.value); },
        style: { width: '100%', height: 40, marginBottom: 8, padding: '0 12px', borderRadius: T.radii.sm,
          border: '1px solid ' + T.colors.borderNeutralPrimary, fontFamily: T.font.family, fontSize: 15 },
      }) : null,
      React.createElement('div', { role: 'listbox', 'aria-label': label }, visibleOptions.map(function(opt) {
        return React.createElement('button', {
          key: optionValue(opt),
          type: 'button', role: 'option', 'aria-selected': value === optionValue(opt),
          title: optionLabel(opt),
          onClick: function() { onChange(optionValue(opt)); setOpen(false); ref.current.querySelector('[role="button"]').focus(); },
          style: {
            display: 'block', width: '100%', border: 'none', background: 'transparent', textAlign: 'left',
            padding: '10px 12px', borderRadius: T.radii.xs, cursor: 'pointer',
            fontFamily: T.font.family, fontSize: T.font.size['body/md'],
            color: T.colors.tigNeutralPrimary, transition: 'background 0.1s',
            whiteSpace: 'nowrap',
            overflow: 'hidden', textOverflow: 'ellipsis',
          },
          onMouseEnter: function(e) { e.currentTarget.style.background = T.colors.bgNeutralSecondary; },
          onMouseLeave: function(e) { e.currentTarget.style.background = 'transparent'; },
        }, optionLabel(opt));
      })),
      visibleOptions.length === 0 ? React.createElement('div', { role: 'status', style: { padding: 12, color: T.colors.tigNeutralSecondary } }, 'No results') : null),
      document.body
    ) : null
  );
}

Object.assign(window, { SelectField });
