// Single-choice menu built on Chip and the shared anchored-popup positioning API.
function ChoiceChip(props) {
  var T = AuraTokens;
  var anchorRef = React.useRef(null);
  var menuRef = React.useRef(null);
  var menuId = React.useId();
  var state = React.useState({ top: 0, left: 0, width: 240 });
  var position = state[0], setPosition = state[1];
  function close(restoreFocus) {
    props.onOpenChange(false);
    if (restoreFocus) anchorRef.current.querySelector('button').focus();
  }
  React.useLayoutEffect(function() {
    if (!props.open) return;
    function update() {
      setPosition(getAnchoredDropdownPosition(anchorRef.current.getBoundingClientRect(), {
        width: 240, height: props.options.length * 48 + 8, gap: 4, margin: 8,
      }));
    }
    update();
    var buttons = menuRef.current.querySelectorAll('button');
    var index = props.options.findIndex(function(option) { return option.key === props.value; });
    if (buttons[index >= 0 ? index : 0]) buttons[index >= 0 ? index : 0].focus();
    function outside(event) {
      if (!menuRef.current.contains(event.target) && !anchorRef.current.contains(event.target)) close(false);
    }
    window.addEventListener('resize', update);
    window.addEventListener('scroll', update, true);
    document.addEventListener('mousedown', outside);
    return function() {
      window.removeEventListener('resize', update);
      window.removeEventListener('scroll', update, true);
      document.removeEventListener('mousedown', outside);
    };
  }, [props.open]);
  return React.createElement(RelativeInline, { innerRef: anchorRef },
    React.createElement(Chip, {
      label: props.label, iconElement: props.icon, showChevron: true, gap: 4,
      chevronElement: props.chevronElement, 'aria-haspopup': 'menu', 'aria-expanded': props.open,
      'aria-controls': props.open ? menuId : undefined,
      onClick: function() { props.onOpenChange(!props.open); },
      onKeyDown: function(event) {
        if (event.key === 'ArrowDown' || event.key === 'ArrowUp') { event.preventDefault(); props.onOpenChange(true); }
      },
    }),
    props.open ? ReactDOM.createPortal(React.createElement('div', {
      id: menuId, ref: menuRef, role: 'menu', 'aria-label': props.menuLabel || 'Group by',
      onKeyDown: function(event) {
        if (event.key === 'Escape') { event.preventDefault(); close(true); }
        if (event.key === 'Tab') { event.preventDefault(); close(true); }
        var buttons = Array.from(menuRef.current.querySelectorAll('button'));
        var index = buttons.indexOf(document.activeElement);
        var next = event.key === 'ArrowDown' ? (index + 1) % buttons.length : event.key === 'ArrowUp' ? (index + buttons.length - 1) % buttons.length : event.key === 'Home' ? 0 : event.key === 'End' ? buttons.length - 1 : -1;
        if (next >= 0) { event.preventDefault(); buttons[next].focus(); }
      },
      style: { position: 'fixed', top: position.top, bottom: position.bottom, left: position.left, width: position.width,
        maxHeight: position.maxHeight, overflowY: 'auto', zIndex: 200, padding: 4, borderRadius: T.radii.sm,
        background: T.colors.bgNeutralPrimary, boxShadow: T.shadows.popup },
    }, props.options.map(function(option) {
      var selected = option.key === props.value;
      return React.createElement('button', {
        key: option.key, type: 'button', role: 'menuitemradio', 'aria-checked': selected,
        onClick: function() { props.onChange(option.key); close(true); },
        style: { display: 'block', width: '100%', height: 48, padding: '0 16px', textAlign: 'left', border: 'none', borderRadius: 8,
          background: selected ? T.colors.bgNeutralSecondary : T.colors.bgNeutralPrimary, color: T.colors.tigNeutralPrimary,
          fontFamily: T.font.family, fontSize: 15, fontWeight: selected ? 600 : 400, cursor: 'pointer' },
      }, option.label);
    })), document.body) : null
  );
}
window.ChoiceChip = ChoiceChip;
