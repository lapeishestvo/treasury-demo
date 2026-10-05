// AuraStepper.js — Figma-aligned vertical stepper component
// Requires: AuraTokens.js
// Load with: <script src="components/AuraStepper.js">

function AuraStepper(props) {
  var T = AuraTokens;
  var steps = props.steps || [];
  var activeIndex = props.activeIndex != null ? props.activeIndex : 0;
  var activeAnchor = props.activeAnchor;
  var skeleton = !!props.skeleton;
  var skeletonCount = props.skeletonCount || 3;
  var width = props.width != null ? props.width : 240;
  var fillHeight = !!props.fillHeight;
  var onStepClick = props.onStepClick;
  var disableAutoScroll = !!props.disableAutoScroll;
  var style = props.style || {};

  var items = skeleton
    ? Array.from({ length: skeletonCount }, function() { return null; })
    : steps;
  var hasAnyDescription = !skeleton && steps.some(function(step) {
    return !!(step && step.description);
  });

  return React.createElement('nav', {
    className: props.className,
    'aria-label': props['aria-label'] || 'Progress',
    style: Object.assign({
      width: width,
      maxWidth: '100%',
      padding: hasAnyDescription || skeleton ? '8px 0' : T.layout.tileGap + 'px',
      background: T.colors.bgNeutralPrimary,
      borderRadius: T.layout.islandRadius,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'stretch',
      flexShrink: 0,
      minWidth: 0,
      height: fillHeight ? '100%' : undefined,
      minHeight: fillHeight ? 0 : undefined,
      overflow: 'hidden',
    }, style),
  }, items.map(function(step, index) {
    var isActive = !skeleton && (
      activeAnchor ? step && step.anchor === activeAnchor : index === activeIndex
    );
    var itemState = skeleton
      ? 'Skeleton'
      : (step && step.state ? step.state : (isActive ? 'Active' : (step && step.completed ? 'Completed' : 'Default')));
    var showLine = index < items.length - 1;

    return React.createElement(React.Fragment, { key: skeleton ? ('skeleton-' + index) : (step.key || step.anchor || step.label || index) },
      React.createElement(AuraStepperItem, {
        step: step,
        index: index,
        active: itemState === 'Active',
        completed: itemState === 'Completed',
        state: itemState,
        skeleton: skeleton,
        onStepClick: onStepClick,
        disableAutoScroll: disableAutoScroll,
      }),
      showLine ? React.createElement(AuraStepperLine, { compact: !hasAnyDescription && !skeleton }) : null
    );
  }), props.footer ? React.createElement('div', {
    style: { marginTop: 'auto', flexShrink: 0,
      marginLeft: hasAnyDescription || skeleton ? 0 : -T.layout.tileGap,
      marginRight: hasAnyDescription || skeleton ? 0 : -T.layout.tileGap,
      marginBottom: hasAnyDescription || skeleton ? -8 : -T.layout.tileGap },
  }, props.footer) : null);
}

function AuraStepperItem(props) {
  var T = AuraTokens;
  var step = props.step || {};
  var index = props.index || 0;
  var skeleton = !!props.skeleton;
  var state = skeleton ? 'Skeleton' : (props.state || (props.active ? 'Active' : (props.completed ? 'Completed' : 'Default')));
  var active = state === 'Active';
  var completed = state === 'Completed';
  var onStepClick = props.onStepClick;
  var disableAutoScroll = !!props.disableAutoScroll;
  var disabled = !!step.disabled || skeleton;
  var description = step.description;
  var hasDescription = !!description;

  var hovState = React.useState(false);
  var hov = hovState[0];
  var setHov = hovState[1];

  function handleClick(e) {
    e.preventDefault();
    if (disabled || !step.anchor) return;
    if (onStepClick) onStepClick(step.anchor, step, index);
    if (disableAutoScroll) return;

    setTimeout(function() {
      var el = document.getElementById(step.anchor);
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

  if (skeleton) {
    return React.createElement('div', {
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 16,
        width: '100%',
        minHeight: 56,
        padding: '12px 16px',
        borderRadius: T.radii.sm,
        flexShrink: 0,
      },
    },
      React.createElement('div', {
        style: {
          width: 32,
          height: 32,
          borderRadius: T.radii.full,
          background: T.colors.bgNeutralSkeleton,
          flexShrink: 0,
        },
      }),
      React.createElement('div', {
        style: {
          width: 112,
          display: 'flex',
          flexDirection: 'column',
          gap: 12,
          padding: '3px 0',
          flexShrink: 0,
        },
      },
        React.createElement('div', {
          style: {
            width: '100%',
            height: 11,
            borderRadius: T.radii['3xs'],
            background: T.colors.bgNeutralSkeleton,
          },
        }),
        React.createElement('div', {
          style: {
            width: 69,
            height: 9,
            borderRadius: T.radii['3xs'],
            background: T.colors.bgNeutralSkeleton,
          },
        })
      )
    );
  }

  return React.createElement('a', {
    href: step.anchor ? ('#' + step.anchor) : undefined,
    onClick: handleClick,
    onMouseEnter: function() { if (!disabled) setHov(true); },
    onMouseLeave: function() { setHov(false); },
    'aria-current': active ? 'step' : undefined,
    'data-state': state,
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 16,
      width: '100%',
      height: hasDescription ? undefined : 48,
      minHeight: hasDescription ? 56 : 48,
      padding: hasDescription ? '12px 16px' : '8px 16px',
      borderRadius: T.radii.sm,
      textDecoration: 'none',
      cursor: disabled ? 'default' : 'pointer',
      background: hov ? T.colors.bgNeutralPrimaryHover : 'transparent',
      transition: 'background 0.12s',
      flexShrink: 0,
    },
  },
    React.createElement(AuraStepperNumber, {
      number: step.number || index + 1,
      active: active,
      completed: completed,
      disabled: disabled,
    }),
    React.createElement('span', {
      style: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        gap: 4,
        minWidth: 0,
        flex: '1 1 auto',
      },
    },
      React.createElement('span', {
        style: {
          display: 'block',
          color: active || completed ? T.colors.tigNeutralPrimary : T.colors.tigNeutralSecondary,
          fontFamily: T.font.family,
          fontSize: T.font.size['heading/xs'],
          fontWeight: T.font.weightSemiBold,
          lineHeight: T.font.lineHeight['heading/xs'] + 'px',
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
        },
      }, step.label || 'Name of step'),
      hasDescription ? React.createElement('span', {
        style: {
          display: 'block',
          color: T.colors.tigNeutralSecondary,
          fontFamily: T.font.family,
          fontSize: T.font.size['body/sm'],
          fontWeight: T.font.weightBody,
          lineHeight: T.font.lineHeight['body/sm'] + 'px',
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
        },
      }, description) : null
    )
  );
}

function AuraStepperNumber(props) {
  var T = AuraTokens;
  var active = !!props.active;
  var completed = !!props.completed;
  var disabled = !!props.disabled;

  return React.createElement('span', {
    style: {
      width: 32,
      height: 32,
      borderRadius: T.radii.full,
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexShrink: 0,
      background: active ? T.colors.bgNeutralInverseSecondary : T.colors.bgNeutralPrimary,
      color: active ? T.colors.tigNeutralWhite : T.colors.tigNeutralSecondary,
      fontFamily: T.font.family,
      fontSize: T.font.size['heading/xs'],
      fontWeight: T.font.weightSemiBold,
      lineHeight: T.font.lineHeight['heading/xs'] + 'px',
      boxShadow: active || disabled ? 'none' : ('inset 0 0 0 1px ' + T.colors.borderNeutralLighter),
    },
  }, completed
    ? React.createElement('svg', {
        width: 16,
        height: 16,
        viewBox: '0 0 16 16',
        fill: 'none',
        'aria-hidden': 'true',
        focusable: 'false',
      },
        React.createElement('path', {
          d: 'M4 8.2L6.7 10.9L12 5.1',
          stroke: T.colors.tigNeutralSecondary,
          strokeWidth: '1.8',
          strokeLinecap: 'round',
          strokeLinejoin: 'round',
        })
      )
    : String(props.number));
}

function AuraStepperLine(props) {
  var compact = !!(props && props.compact);
  var T = AuraTokens;

  return React.createElement('div', {
    'aria-hidden': 'true',
    style: {
      width: '100%',
      height: compact ? T.layout.tileGap : 0,
      position: 'relative',
      flexShrink: 0,
    },
  },
    React.createElement('span', {
      style: {
        position: 'absolute',
        left: 32,
        top: compact ? -6 : -8,
        width: 1,
        height: 16,
        background: T.colors.borderNeutralLighter,
      },
    })
  );
}

Object.assign(window, { AuraStepper, AuraStepperItem });
