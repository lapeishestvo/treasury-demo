// Native modal provides focus containment and an inert background.
function ConfirmationDialog(props) {
  var T = AuraTokens;
  var dialogRef = React.useRef(null);
  var cancelRef = React.useRef(null);
  var titleId = React.useId();
  var descriptionId = React.useId();
  React.useEffect(function() {
    if (!props.open || !dialogRef.current) return;
    var opener = document.activeElement;
    var dialog = dialogRef.current;
    dialog.showModal();
    cancelRef.current.focus();
    return function() {
      dialog.close();
      if (opener && opener.isConnected) opener.focus();
    };
  }, [props.open]);
  if (!props.open) return null;
  return ReactDOM.createPortal(React.createElement(React.Fragment, null,
    React.createElement('style', null, '.aura-confirmation-dialog::backdrop { background: ' + T.colors.bgNeutralInverse + '52; }'),
    React.createElement('dialog', {
      ref: dialogRef, className: 'aura-confirmation-dialog',
      'aria-labelledby': titleId, 'aria-describedby': props.description ? descriptionId : undefined, 'aria-modal': true,
      onCancel: function(event) { event.preventDefault(); if (!props.busy) props.onCancel(); },
      onKeyDown: function(event) {
        if (event.key !== 'Tab') return;
        var buttons = event.currentTarget.querySelectorAll('button:not(:disabled)');
        var first = buttons[0];
        var last = buttons[buttons.length - 1];
        if (!first) { event.preventDefault(); return; }
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
        else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
      },
      style: { width: 520, maxWidth: 'calc(100vw - 32px)', maxHeight: 'calc(100dvh - 32px)',
        margin: 'auto', padding: '40px 20px 20px', boxSizing: 'border-box', overflowY: 'auto',
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 32,
        background: T.colors.bgNeutralPrimary, border: '1px solid ' + T.colors.borderNeutralLighter,
        borderRadius: T.layout.islandRadius, boxShadow: '0 3px 27px rgba(32,47,78,0.09)', color: T.colors.tigNeutralPrimary },
    },
      React.createElement('div', { style: { padding: '0 40px', width: '100%', textAlign: 'center' } },
        React.createElement('img', { src: props.imageSrc || 'assets/icons/attention.png', alt: '', width: 96, height: 96, style: { display: 'block', margin: '0 auto', objectFit: 'contain' } }),
        React.createElement('div', { style: { padding: '20px 0 8px', display: 'flex', flexDirection: 'column', gap: 8 } },
          React.createElement('h2', { id: titleId, style: { margin: 0, fontFamily: T.font.family, fontSize: T.font.size['heading/lg'], fontWeight: T.font.weightBold, lineHeight: T.font.lineHeight['heading/lg'] + 'px', overflowWrap: 'anywhere' } }, props.title),
          props.description ? React.createElement('p', { id: descriptionId, style: { margin: 0, fontFamily: T.font.family, fontSize: T.font.size['body/lg'], lineHeight: '20px', whiteSpace: 'pre-line' } }, props.description) : null
        )
      ),
      props.error ? React.createElement('p', { role: 'alert', style: { margin: 0, fontFamily: T.font.family, fontSize: 15, lineHeight: '20px', color: T.colors.tigErrorPrimary } }, props.error) : null,
      React.createElement('div', { style: { display: 'flex', gap: 20, width: '100%', flexShrink: 0 } },
        React.createElement(BtnL, { label: props.cancelLabel || 'Cancel', variant: 'secondary', onClick: props.onCancel, disabled: props.busy, buttonRef: cancelRef }),
        React.createElement(BtnL, { label: props.confirmLabel || 'Delete', variant: 'negative', onClick: props.onConfirm, disabled: props.busy })
      ),
      React.createElement('button', { type: 'button', 'aria-label': props.closeLabel || 'Close', title: props.closeLabel || 'Close', disabled: props.busy, onClick: props.onCancel,
        style: { position: 'absolute', top: 20, right: 20, width: 40, height: 40, padding: 12, border: 'none', borderRadius: 12, background: 'transparent', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' } },
        React.createElement('span', { style: { width: 16, height: 16, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 } },
          React.createElement('img', { src: 'assets/icons/dialog-close-glyph.svg', alt: '', style: { display: 'block', flexShrink: 0 } }))
      )
    )
  ), document.body);
}
window.ConfirmationDialog = ConfirmationDialog;
