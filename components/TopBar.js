// TopBar.js — App-level top navigation bar
// Requires: AuraTokens.js

function TopBar(props) {
  var breadcrumbs = props.breadcrumbs || [];
  var user        = props.user;
  var onLogout    = props.onLogout;
  var T           = AuraTokens;

  var crumbs = [];
  for (var i = 0; i < breadcrumbs.length; i++) {
    var crumb  = breadcrumbs[i];
    var isLast = i === breadcrumbs.length - 1;

    if (i > 0) {
      crumbs.push(React.createElement('span', {
        key: 'sep-' + i,
        style: { color: T.colors.tigNeutralInverseSecondary, margin: '0 4px' },
      }, '›'));
    }

    crumbs.push(React.createElement('span', {
      key: 'crumb-' + i,
      onClick: (!isLast && crumb.href) ? function(href) {
        return function() { window.location.href = href; };
      }(crumb.href) : undefined,
      style: {
        fontFamily: T.font.family,
        fontSize: T.font.size['body/md'],
        fontWeight: T.font.weightSemiBold,
        color: isLast ? T.colors.tigNeutralWhite : T.colors.tigNeutralInverseSecondary,
        cursor: (!isLast && crumb.href) ? 'pointer' : 'default',
      },
    }, crumb.label));
  }

  return React.createElement('div', {
    className: props.responsive ? 'aura-topbar-responsive' : undefined,
    style: {
      height: 56, background: T.colors.bgNeutralInverse, flexShrink: 0,
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '0 ' + T.spacing[10] + 'px',
    },
  },
    React.createElement('div', {
      className: 'aura-breadcrumbs',
      style: { display: 'flex', alignItems: 'center', gap: T.spacing[2] + 'px' },
    }, crumbs),
    React.createElement('div', { style: { display: 'flex' } },
      user ? React.createElement('button', {
        className: 'aura-user-button',
        style: {
          height: 56, padding: '0 ' + T.spacing[5] + 'px',
          background: 'none', border: 'none', cursor: 'default',
          fontFamily: T.font.family,
          fontSize: T.font.size['body/md'],
          color: T.colors.tigNeutralInverseSecondary,
        },
      }, user) : null,
      React.createElement('button', {
        onClick: onLogout,
        style: {
          height: 56, padding: '0 ' + T.spacing[6] + 'px',
          background: 'none', border: 'none', cursor: 'pointer',
          fontFamily: T.font.family,
          fontSize: T.font.size['body/md'],
          color: T.colors.tigNeutralInverseSecondary,
        },
      }, 'Log out')
    )
  );
}

Object.assign(window, { TopBar });
