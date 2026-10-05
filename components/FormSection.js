// FormSection.js — Thin semantic wrappers over tile primitives
// Requires: AuraTokens.js, Island.js, ReviewRow.js
// Load with: <script src="components/FormSection.js">
//
// Exports: Section, ReviewSection

// Section — non-collapsible form tile with flash animation on stepper click
function Section(props) {
  var id        = props.id;
  var title     = props.title;
  var flashKey  = props.flashKey;
  var stretch   = props.stretch;
  var children  = props.children;

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
      flex: '1 0 auto',
      minHeight: 'min-content',
      display: 'flex',
      flexDirection: 'column',
    } : null,
  },
    React.createElement(Tile, {
      stretch: stretch,
      tileRef: ref,
    },
      React.createElement(TileHeader, {
      title: title,
      border: true,
      }),
      React.createElement(TileBody, {
      gap: 16,
      padding: '20px',
      stretch: stretch,
      border: false,
      }, children)
    )
  );
}

// ReviewSection — read-only tile shown on review step
function ReviewSection(props) {
  var id    = props.id;
  var title = props.title;
  var rows  = props.rows || [];
  var stretch = props.stretch;
  var flashKey = props.flashKey;
  var T = AuraTokens;
  var ref = React.useRef(null);
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

  return React.createElement(ReadonlyTile, {
    id: id,
    title: title,
    stretch: stretch,
    style: stretch ? { flex: '1 0 auto', minHeight: 'min-content' } : undefined,
    gap: 12,
    padding: '0 20px 20px',
    tileRef: ref,
  },
    React.createElement('div', {
      style: stretch ? { flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column', gap: 12 } : {
        display: 'flex',
        flexDirection: 'column',
        gap: 12,
      },
    },
      rows.map(function(r, i) { return React.createElement(ReviewRow, { key: i, label: r.label, value: r.value }); })
    )
  );
}

Object.assign(window, { Section, ReviewSection });
