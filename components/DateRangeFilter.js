// Controlled, inclusive date range. Requires Chip, InputField, AssetIcon and RelativeInline.
(function() {
  function validDate(value) {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(value || '') || value.slice(0, 4) === '0000') return false;
    var date = new Date(value + 'T00:00:00Z');
    return Number.isFinite(date.getTime()) && date.toISOString().slice(0, 10) === value;
  }
  function validRange(value) {
    return (!value.from || validDate(value.from)) && (!value.to || validDate(value.to)) &&
      (!value.from || !value.to || value.from <= value.to);
  }
  function describe(value) {
    if (value.from && value.to) return 'From ' + value.from + ' to ' + value.to;
    return value.from ? 'From ' + value.from : value.to ? 'Before ' + value.to : 'Any time';
  }
  function DateRangeInput(props) {
    var nativeRef = React.useRef(null);
    var T = AuraTokens;
    return React.createElement(InputField, {
      label: props.label, value: props.value, onChange: props.onChange, onBlur: props.onBlur,
      mask: 'date', hideLabel: true, invalid: props.invalid, describedBy: props.describedBy,
      trailing: React.createElement('span', { style: { position: 'relative', display: 'flex', width: 24, height: 24 } },
        React.createElement('input', {
          ref: nativeRef, type: 'date', tabIndex: -1, 'aria-hidden': true,
          value: validDate(props.value) ? props.value : '', min: props.min, max: props.max,
          onChange: function(event) { props.onChange(event.target.value); },
          style: { position: 'absolute', inset: 0, width: 24, height: 24, opacity: 0, pointerEvents: 'none' },
        }),
        React.createElement('button', {
          type: 'button', title: 'Choose ' + props.label.toLowerCase(), 'aria-label': 'Choose ' + props.label.toLowerCase(),
          onClick: function() {
            var input = nativeRef.current;
            if (input.showPicker) { try { input.showPicker(); return; } catch (_) {} }
            input.focus(); input.click();
          },
          style: { position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', width: 24, height: 24,
            padding: 0, border: 0, background: 'transparent', color: T.colors.tigNeutralSecondary, cursor: 'pointer' },
        }, React.createElement(AssetIcon, { src: 'assets/icons/date-calendar-glyph.svg', size: 24, naturalSize: 24 }))
      ),
    });
  }
  function DateRangeFilter(props) {
    var T = AuraTokens;
    var value = props.value || { from: '', to: '' };
    var anchorRef = React.useRef(null), popupRef = React.useRef(null), keyboardOpen = React.useRef(false);
    var id = React.useId();
    var draftState = React.useState(value), draft = draftState[0], setDraft = draftState[1];
    var errorState = React.useState(''), error = errorState[0], setError = errorState[1];
    var positionState = React.useState({ width: 441 }), position = positionState[0], setPosition = positionState[1];
    var active = !!(value.from || value.to);
    React.useEffect(function() { setDraft({ from: value.from || '', to: value.to || '' }); setError(''); }, [value.from, value.to, props.open]);
    function close(restoreFocus) {
      props.onOpenChange(false);
      if (restoreFocus) anchorRef.current.querySelector('button').focus();
    }
    React.useLayoutEffect(function() {
      if (!props.open) return;
      function update() {
        setPosition(getAnchoredDropdownPosition(anchorRef.current.getBoundingClientRect(), {
          width: 441, height: 180, minVisibleHeight: 136, gap: 4, margin: 8,
        }));
      }
      function outside(event) {
        if (!popupRef.current.contains(event.target) && !anchorRef.current.contains(event.target)) close(false);
      }
      function keydown(event) { if (event.key === 'Escape') { event.preventDefault(); close(true); } }
      update();
      if (keyboardOpen.current) { popupRef.current.querySelector('input[type="text"]').focus(); keyboardOpen.current = false; }
      window.addEventListener('resize', update);
      window.addEventListener('scroll', update, true);
      document.addEventListener('mousedown', outside);
      document.addEventListener('keydown', keydown);
      return function() {
        window.removeEventListener('resize', update);
        window.removeEventListener('scroll', update, true);
        document.removeEventListener('mousedown', outside);
        document.removeEventListener('keydown', keydown);
      };
    }, [props.open]);
    function change(key, text) {
      var next = Object.assign({}, draft); next[key] = text;
      setDraft(next);
      if (validRange(next)) { setError(''); props.onChange(next); }
      else if ((next.from && next.from.length === 10 && !validDate(next.from)) || (next.to && next.to.length === 10 && !validDate(next.to))) setError('Enter a valid date.');
      else if (validDate(next.from) && validDate(next.to) && next.from > next.to) setError('Start date must not be after end date.');
      else setError('');
    }
    function validate() { if (!validRange(draft)) setError('Enter valid dates, with the start on or before the end.'); }
    function reset() { var empty = { from: '', to: '' }; setDraft(empty); setError(''); props.onChange(empty); }
    var narrow = position.width < 420;
    var popup = props.open ? React.createElement('div', {
      ref: popupRef, id: id, role: 'dialog', 'aria-label': props.label + ' filter',
      style: { position: 'fixed', top: position.top, bottom: position.bottom, left: position.left, width: position.width,
        maxHeight: position.maxHeight, overflowY: 'auto', zIndex: 200, padding: 4, borderRadius: T.radii.sm,
        background: T.colors.bgNeutralPrimary, boxShadow: T.shadows.popup, fontFamily: T.font.family,
        fontSize: T.font.size['body/md'], lineHeight: '20px', color: T.colors.tigNeutralPrimary },
    },
      React.createElement('div', { style: { minHeight: 48, padding: '8px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, flexWrap: narrow ? 'wrap' : 'nowrap' } },
        React.createElement('span', { 'aria-live': 'polite', style: { color: T.colors.tigNeutralSecondary } }, describe(value)),
        (active || draft.from || draft.to) ? React.createElement('button', {
          type: 'button', onClick: reset,
          style: { display: 'inline-flex', alignItems: 'center', flexShrink: 0, gap: 4, padding: 0, border: 0, background: 'transparent',
            font: 'inherit', color: T.colors.tigAccentPrimary, cursor: 'pointer', whiteSpace: 'nowrap' },
        }, React.createElement(AssetIcon, { src: 'assets/icons/filter-reset-glyph.svg', size: 18, naturalSize: 18, offsetX: -0.503, offsetY: -0.5 }), 'Reset filter') : null
      ),
      React.createElement('div', { role: 'separator', style: { height: 1, margin: '0 16px', background: T.colors.borderNeutralLighter } }),
      React.createElement('div', { style: { padding: 16, display: 'grid', gridTemplateColumns: narrow ? 'minmax(0, 1fr)' : '180px 17px 180px', gap: narrow ? 8 : 12, alignItems: 'center' } },
        React.createElement(DateRangeInput, { label: 'Start date', value: draft.from, onChange: function(text) { change('from', text); }, onBlur: validate,
          max: validDate(draft.to) ? draft.to : undefined, invalid: !!error, describedBy: error ? id + '-error' : undefined }),
        !narrow ? React.createElement('span', { 'aria-hidden': true, style: { textAlign: 'center', fontSize: 17 } }, '\u2014') : null,
        React.createElement(DateRangeInput, { label: 'End date', value: draft.to, onChange: function(text) { change('to', text); }, onBlur: validate,
          min: validDate(draft.from) ? draft.from : undefined, invalid: !!error, describedBy: error ? id + '-error' : undefined })
      ),
      error ? React.createElement('div', { id: id + '-error', role: 'alert', style: { padding: '0 16px 12px', color: T.colors.tigErrorPrimary } }, error) : null
    ) : null;
    return React.createElement(RelativeInline, { innerRef: anchorRef },
      React.createElement(Chip, {
        label: props.label, active: active, showChevron: true, gap: 4,
        'aria-haspopup': 'dialog', 'aria-expanded': props.open, 'aria-controls': props.open ? id : undefined,
        chevronElement: React.createElement(AssetIcon, { src: active ? 'assets/icons/date-chevron-active-glyph.svg' : 'assets/icons/date-chevron-glyph.svg',
          size: 16, naturalSize: 16, offsetY: -0.5066, rotate: props.open ? 0 : 180 }),
        onClick: function() { props.onOpenChange(!props.open); },
        onKeyDown: function(event) { if (event.key === 'ArrowDown') { event.preventDefault(); keyboardOpen.current = true; props.onOpenChange(true); } },
      }),
      popup ? ReactDOM.createPortal(popup, document.body) : null
    );
  }
  Object.assign(window, { DateRangeInput: DateRangeInput, DateRangeFilter: DateRangeFilter,
    DateRangeUtils: { validDate: validDate, validRange: validRange, describe: describe } });
})();
