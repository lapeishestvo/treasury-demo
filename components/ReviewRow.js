// ReviewRow.js — Label + value row for read-only review mode
// Requires: AuraTokens.js

function ReviewRow(props) {
  var label = props.label;
  var value = props.value;
  var T     = AuraTokens;

  return React.createElement('div', {
    style: {
      display: 'flex', flexDirection: 'row',
      gap: T.spacing[4], alignItems: 'flex-start',
      minHeight: T.font.lineHeight['body/md'],
    },
  },
    React.createElement('span', {
      style: {
        width: 160, flexShrink: 0,
        fontFamily: T.font.family,
        fontSize: T.font.size['body/md'],
        fontWeight: T.font.weightBody,
        color: T.colors.tigNeutralSecondary,
        lineHeight: T.font.lineHeight['body/md'] + 'px',
      },
    }, label),
    React.createElement('span', {
      style: {
        flex: 1,
        fontFamily: T.font.family,
        fontSize: T.font.size['body/md'],
        fontWeight: T.font.weightBody,
        color: T.colors.tigNeutralPrimary,
        lineHeight: T.font.lineHeight['body/md'] + 'px',
      },
    }, value || '—')
  );
}

Object.assign(window, { ReviewRow });
