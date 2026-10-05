// Stepper.js — Vertical step list for form flows
// Requires: AuraTokens.js
//
// Props:
//   steps        {Array<{label, anchor}>}
//   onStepClick  {function(anchor)}  — optional, called when a step is clicked
//                                      host can expand sections and flash tiles

function Stepper(props) {
  var steps       = props.steps || [];
  var onStepClick = props.onStepClick;
  var fillHeight  = !!props.fillHeight;
  var hideNumbers = !!props.hideNumbers;
  var disableAutoScroll = !!props.disableAutoScroll;
  var activeAnchor = props.activeAnchor;
  var T = AuraTokens;

  var items = [];
  for (var i = 0; i < steps.length; i++) {
    var step = steps[i];

    if (i > 0 && !hideNumbers) {
      items.push(React.createElement('div', {
        key: 'line-' + i,
        style: {
          width: 1, height: 16,
          background: T.colors.borderNeutralLighter,
          marginLeft: 28, flexShrink: 0,
        },
      }));
    }

    items.push(React.createElement(StepperItem, {
      key: 'step-' + i,
      number: i + 1,
      label: step.label,
      anchor: step.anchor,
      onStepClick: onStepClick,
      hideNumber: hideNumbers,
      disableAutoScroll: disableAutoScroll,
      active: step.anchor === activeAnchor,
    }));
  }

  return React.createElement('div', {
    style: {
      width: '100%', flexShrink: 0,
      background: T.colors.bgNeutralPrimary,
      borderRadius: T.layout.islandRadius,
      padding: T.layout.tileGap + 'px',
      display: 'flex', flexDirection: 'column',
      gap: hideNumbers ? T.layout.tileGap : 0,
      alignItems: 'stretch',
      height: fillHeight ? '100%' : undefined,
      minHeight: fillHeight ? 0 : undefined,
    },
  }, items);
}

function StepperItem(props) {
  var number      = props.number;
  var label       = props.label;
  var anchor      = props.anchor;
  var onStepClick = props.onStepClick;
  var hideNumber  = !!props.hideNumber;
  var disableAutoScroll = !!props.disableAutoScroll;
  var active      = !!props.active;
  var T = AuraTokens;

  var hovState = React.useState(false);
  var hov      = hovState[0];
  var setHov   = hovState[1];

  function handleClick(e) {
    e.preventDefault();
    if (!anchor) return;

    // 1. Let host expand the section first
    if (onStepClick) onStepClick(anchor);
    if (disableAutoScroll) return;

    // 2. Scroll after a short tick so the section is already expanded
    setTimeout(function() {
      var el = document.getElementById(anchor);
      if (!el) return;
      var parent = el.parentElement;
      while (parent) {
        var overflow = getComputedStyle(parent).overflowY;
        if (overflow === 'auto' || overflow === 'scroll') break;
        parent = parent.parentElement;
      }
      if (parent) {
        parent.scrollTo({ top: el.offsetTop - parent.offsetTop - 8, behavior: 'smooth' });
      }
    }, 30);
  }

  return React.createElement('a', {
    href: anchor ? '#' + anchor : undefined,
    onClick: handleClick,
    onMouseEnter: function() { setHov(true); },
    onMouseLeave: function() { setHov(false); },
    style: {
      display: 'flex', alignItems: 'center', gap: hideNumber ? 0 : T.spacing[4],
      height: hideNumber ? 48 : undefined,
      minHeight: hideNumber ? 48 : undefined,
      justifyContent: hideNumber ? 'flex-start' : undefined,
      padding: hideNumber ? '0 12px' : (T.spacing[2] + 'px ' + T.spacing[3] + 'px'),
      borderRadius: hideNumber ? 12 : T.radii.sm,
      background: hideNumber
        ? (active ? T.colors.bgNeutralBase : (hov ? T.colors.bgNeutralPrimaryHover : 'transparent'))
        : 'transparent',
      textDecoration: 'none', cursor: 'pointer',
      transition: 'background 0.12s',
      width: '100%',
      flexShrink: 0,
    },
  },
    hideNumber ? null : React.createElement('div', {
      style: {
        width: 32, height: 32, borderRadius: T.radii.full, flexShrink: 0,
        background: hov ? T.colors.bgNeutralSecondaryHover : T.colors.bgNeutralSecondary,
        border: 'none',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        transition: 'background 0.12s',
      },
    },
      React.createElement('span', {
        style: {
          fontFamily: T.font.family,
          fontSize: T.font.size['heading/xs'],
          fontWeight: T.font.weightSemiBold,
          color: hov ? T.colors.tigNeutralPrimary : T.colors.tigNeutralSecondary,
          lineHeight: T.font.lineHeight['heading/xs'] + 'px',
          transition: 'color 0.12s',
        },
      }, String(number))
    ),
    // Label
    React.createElement('span', {
      style: {
        fontFamily: T.font.family,
        fontSize: hideNumber ? T.font.size['body/md'] : T.font.size['heading/xs'],
        fontWeight: hideNumber ? T.font.weightBody : T.font.weightSemiBold,
        color: hideNumber
          ? T.colors.tigNeutralPrimary
          : (hov ? T.colors.tigNeutralPrimary : T.colors.tigNeutralSecondary),
        lineHeight: (hideNumber ? T.font.lineHeight['body/md'] : T.font.lineHeight['heading/xs']) + 'px',
        transition: 'color 0.12s',
        flex: hideNumber ? '1 0 0' : undefined,
        minWidth: hideNumber ? 0 : undefined,
      },
    }, label)
  );
}

Object.assign(window, { Stepper, StepperItem });
