// LimitBlock.js — Labeled progress bar block
// Requires: AuraTokens.js
// Load with: <script src="components/LimitBlock.js">
//
// Props:
//   title   {string}
//   percent {string}
//   amount  {string}
//   fill    {string}
//   color   {string}

function LimitBlock(props) {
  var T = AuraTokens;

  return React.createElement('div', {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 8,
    },
  },
    React.createElement('span', {
      style: {
        fontFamily: T.font.family,
        fontSize: T.font.size['heading/xs'],
        fontWeight: T.font.weightSemiBold,
        color: T.colors.tigNeutralPrimary,
        lineHeight: T.font.lineHeight['heading/xs'] + 'px',
      },
    }, props.title),
    React.createElement('div', {
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 16,
      },
    },
      React.createElement('span', {
        style: {
          flex: 1,
          color: T.colors.tigNeutralPrimary,
          fontSize: T.font.size['body/md'],
        },
      }, props.percent),
      React.createElement('span', {
        style: {
          color: T.colors.tigNeutralPrimary,
          fontSize: T.font.size['body/md'],
        },
      }, props.amount)
    ),
    React.createElement('div', {
      style: {
        width: '100%',
        height: 8,
        borderRadius: 8,
        background: T.colors.bgNeutralSecondary,
        overflow: 'hidden',
      },
    },
      React.createElement('div', {
        style: {
          width: props.fill,
          height: '100%',
          borderRadius: 8,
          background: props.color,
        },
      })
    )
  );
}

Object.assign(window, { LimitBlock });
