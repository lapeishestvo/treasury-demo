// Shared UI. Dependencies and props are documented in COMPONENTS.md.
(function () {
function WorkflowNote(props) {
  var text = props.text;
  var T = AuraTokens;
  if (!text) return null;
  return React.createElement(Tile, null, React.createElement(TileBody, {
    padding: '16px 20px',
    gap: 0,
    border: false
  }, React.createElement('span', {
    style: {
      color: T.colors.tigNeutralPrimary,
      fontFamily: T.font.family,
      fontSize: T.font.size['body/md'],
      fontWeight: T.font.weightBody,
      lineHeight: T.font.lineHeight['body/md'] + 'px'
    }
  }, text)));
}
function ReviewCommentTile(props) {
  var comment = props.comment;
  var reviewedBy = props.reviewedBy;
  var reviewedAt = props.reviewedAt;
  var T = AuraTokens;
  if (!String(comment || '').trim()) return null;
  return React.createElement(Tile, null, React.createElement(TileHeader, {
    title: 'Review',
    border: false
  }), React.createElement(TileBody, {
    padding: '8px 20px 24px',
    gap: 4,
    border: false
  }, React.createElement('p', {
    style: {
      color: T.colors.tigNeutralPrimary,
      fontFamily: T.font.family,
      fontSize: T.font.size['body/md'],
      fontWeight: T.font.weightBody,
      lineHeight: T.font.lineHeight['body/md'] + 'px',
      width: '100%'
    }
  }, comment), React.createElement('p', {
    style: {
      color: T.colors.tigNeutralSecondary,
      fontFamily: T.font.family,
      fontSize: T.font.size['body/md'],
      fontWeight: T.font.weightBody,
      lineHeight: T.font.lineHeight['body/md'] + 'px',
      width: '100%'
    }
  }, [reviewedBy, reviewedAt].filter(Boolean).join(', '))));
}
function ReviewDetailsTile(props) {
  if (!props.comment) return null;
  return /*#__PURE__*/React.createElement(ViewSection, {
    title: props.title || 'Review',
    rows: [{
      label: 'Reviewer',
      value: props.reviewer || '—'
    }, {
      label: 'Reviewed at',
      value: props.reviewedAt || '—'
    }, {
      label: 'Comment',
      value: props.comment
    }]
  });
}
function ApprovalPanel(props) {
  return React.createElement(IslandColumn, {
    scrollChildren: React.createElement(React.Fragment, null,
      props.error ? React.createElement(WorkflowNote, { key: 'error', text: props.error }) : null,
      React.createElement(Section, { key: 'review', title: props.title || 'Review' },
        React.createElement(TextareaField, {
          label: 'Comment (required when returning)', value: props.comment, onChange: props.onCommentChange,
        })
      )
    ),
    buttons: React.createElement(ButtonStack, { buttons: [
      { label: props.returnLabel || 'Return to maker', variant: 'negative', onClick: props.onReturn },
      { label: props.approveLabel || 'Approve', variant: 'success', onClick: props.onApprove },
    ] }),
  });
}
function ReviewEventTile(props) {
  var T = AuraTokens;
  var textStyle = { fontFamily: T.font.family, fontSize: T.font.size['body/md'], lineHeight: '20px', color: T.colors.tigNeutralPrimary };
  var captionStyle = { fontSize: 13, lineHeight: '16px', color: T.colors.tigNeutralSecondary };
  return React.createElement(Tile, null,
    React.createElement(TileHeader, { title: 'Review', border: false }),
    React.createElement('div', { style: Object.assign({}, textStyle, { padding: '0 16px 12px', display: 'flex', gap: 12, alignItems: 'center' }) },
      React.createElement('img', { src: props.iconSrc, alt: '', style: { flexShrink: 0 } }),
      React.createElement('div', { style: { flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: 2 } },
        React.createElement('span', null, props.status),
        React.createElement('span', { style: Object.assign({}, captionStyle, { overflowWrap: 'anywhere' }) }, props.reviewedBy || '-')
      ),
      React.createElement('div', { style: { textAlign: 'right', flexShrink: 0, display: 'flex', flexDirection: 'column', gap: 2 } },
        React.createElement('span', null, props.date),
        React.createElement('span', { style: captionStyle }, props.time)
      )
    ),
    props.comment ? React.createElement('div', { style: { padding: '0 20px 32px 68px' } },
      React.createElement('div', { style: Object.assign({}, textStyle, { padding: 12, border: '1px solid ' + T.colors.borderNeutralLighter, borderRadius: T.layout.islandRadius, whiteSpace: 'pre-wrap', overflowWrap: 'anywhere' }) }, props.comment)
    ) : null
  );
}
Object.assign(window, { WorkflowNote, ReviewCommentTile, ReviewDetailsTile, ApprovalPanel, ReviewEventTile });
})();
