// Requires AuraTokens and UploadBox. Upload props are forwarded to UploadBox.
function AttachmentsField(props) {
  var T = AuraTokens;
  var title = props.title == null ? 'Attachments' : props.title;
  var uploadProps = Object.assign({}, props);
  delete uploadProps.title;
  return React.createElement('div', {
    style: { display: 'flex', flexDirection: 'column', gap: 12 },
  },
    React.createElement('span', {
      style: {
        color: T.colors.tigNeutralPrimary,
        fontFamily: T.font.family,
        fontSize: T.font.size['heading/sm'],
        fontWeight: T.font.weightBold,
        lineHeight: T.font.lineHeight['heading/sm'] + 'px',
      },
    }, title),
    React.createElement(UploadBox, uploadProps)
  );
}

window.AttachmentsField = AttachmentsField;
