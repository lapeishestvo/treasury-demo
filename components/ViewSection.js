// ViewSection.js — Read-only tile presets
// Requires: AuraTokens.js, Island.js, ReviewRow.js
// Load with: <script src="components/ViewSection.js">
//
// Exports: ViewSection

// ViewSection — read-only tile with optional stretch and flash animation
function ViewSection(props) {
  var id       = props.id;
  var title    = props.title;
  var rows     = props.rows || [];
  var stretch  = props.stretch;
  var flashKey = props.flashKey;
  var T = AuraTokens;

  var ref     = React.useRef(null);
  var prevKey = React.useRef(flashKey);

  React.useLayoutEffect(function() {
    var shouldFlash = flashKey != null && flashKey !== prevKey.current;
    prevKey.current = flashKey;
    if (!shouldFlash) return;
    var el = ref.current;
    if (!el) return;
    el.classList.remove('tile-flash');
    void el.offsetWidth;
    el.classList.add('tile-flash');
    function onEnd() { el.classList.remove('tile-flash'); el.removeEventListener('animationend', onEnd); }
    el.addEventListener('animationend', onEnd);
  }, [flashKey]);

  return React.createElement('div', {
    id: id,
    style: stretch ? {
      flex: 1,
      minHeight: 0,
      display: 'flex',
      flexDirection: 'column',
    } : null,
  },
    React.createElement(ReadonlyTile, {
      title: title,
      stretch: stretch,
      gap: 12,
      padding: '0 20px 20px',
      bodyStyle: stretch ? { flex: 1, minHeight: 0 } : null,
      tileRef: ref,
    },
      rows.map(function(r, i) { return React.createElement(ReviewRow, { key: i, label: r.label, value: r.value }); })
    )
  );
}

Object.assign(window, { ViewSection });
