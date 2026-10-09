// UiPrimitives.js — Small shared UI building blocks for page-level composition
// Requires: AuraTokens.js, Island.js
// Load with: <script src="components/UiPrimitives.js">

function TextActionButton(props) {
  var label = props.label;
  var onClick = props.onClick;
  var icon = props.icon;
  var T = AuraTokens;

  var hovState = React.useState(false);
  var hov = hovState[0];
  var setHov = hovState[1];

  return React.createElement('button', {
    onClick: onClick,
    onMouseEnter: function() { setHov(true); },
    onMouseLeave: function() { setHov(false); },
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 6,
      height: 40,
      padding: '0 12px',
      border: 'none',
      borderRadius: T.radii.sm,
      background: hov ? T.colors.bgNeutralSecondary : 'transparent',
      color: T.colors.tigNeutralSecondary,
      fontFamily: T.font.family,
      fontSize: T.font.size['body/md'],
      fontWeight: T.font.weightSemiBold,
      lineHeight: T.font.lineHeight['body/md'] + 'px',
      cursor: 'pointer',
      flexShrink: 0,
      transition: 'background 0.12s, color 0.12s',
    },
  },
    icon ? React.createElement('span', {
      style: {
        width: 16,
        height: 16,
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
      },
    }, icon) : null,
    label
  );
}

function PrimaryActionButton(props) {
  var label = props.label;
  var onClick = props.onClick;
  var icon = props.icon;
  var T = AuraTokens;
  var size = T.components.chip;

  var hovState = React.useState(false);
  var hov = hovState[0];
  var setHov = hovState[1];

  return React.createElement('button', {
    onClick: onClick,
    onMouseEnter: function() { setHov(true); },
    onMouseLeave: function() { setHov(false); },
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 8,
      height: size.height,
      padding: '0 ' + size.hPadding + 'px',
      border: 'none',
      borderRadius: size.radius,
      background: hov ? T.colors.bgPlataPrimaryHover : T.colors.bgPlataPrimary,
      color: T.colors.tigNeutralWhite,
      fontFamily: T.font.family,
      fontSize: size.fontSize,
      fontWeight: T.font.weightSemiBold,
      lineHeight: size.lineHeight + 'px',
      cursor: 'pointer',
      flexShrink: 0,
      transition: 'background 0.12s',
    },
  },
    icon ? React.createElement('span', {
      style: {
        width: props.iconSize || 16,
        height: props.iconSize || 16,
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
      },
    },
      typeof icon === 'string'
        ? React.createElement('img', {
            src: icon,
            alt: '',
            style: {
              width: props.iconSize || 16,
              height: props.iconSize || 16,
              display: 'block',
              filter: 'brightness(0) invert(1)',
            },
          })
        : icon
    ) : null,
    label
  );
}

function CloseIcon16() {
  return React.createElement('svg', {
    width: 16,
    height: 16,
    viewBox: '0 0 16 16',
    fill: 'none',
  },
    React.createElement('path', {
      d: 'M4 4L12 12M12 4L4 12',
      stroke: 'currentColor',
      strokeWidth: '1.5',
      strokeLinecap: 'round',
    })
  );
}

function EmptyState(props) {
  var label = props.label;
  var minHeight = props.minHeight || 200;
  var T = AuraTokens;

  return React.createElement('div', {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: minHeight,
      color: T.colors.fgTertiary,
      fontFamily: T.font.family,
      fontSize: T.font.size['body/md'],
      lineHeight: T.font.lineHeight['body/md'] + 'px',
      textAlign: 'center',
      padding: '0 20px',
    },
  }, label);
}

function PageTitle(props) {
  var label = props.label;
  var T = AuraTokens;

  return React.createElement('h1', {
    style: {
      fontFamily: T.font.family,
      fontSize: T.font.size['heading/lg'],
      fontWeight: T.font.weightBold,
      color: T.colors.tigNeutralPrimary,
      lineHeight: T.font.lineHeight['heading/lg'] + 'px',
    },
  }, label);
}

function FlexSpacer() {
  return React.createElement('div', { style: { flex: 1 } });
}

function FillRow(props) {
  return React.createElement('div', {
    style: {
      flex: props.flex != null ? props.flex : 1,
      display: 'flex',
      minHeight: 0,
    },
  }, props.children);
}

function PageScreen(props) {
  var breadcrumbs = props.breadcrumbs || [];
  var user = props.user;
  var children = props.children;

  return React.createElement('div', {
    style: { display: 'flex', flexDirection: 'column', height: '100vh' },
  },
    React.createElement(TopBar, { breadcrumbs: breadcrumbs, user: user, responsive: props.responsiveTopBar }),
    children
  );
}

function PageWorkspace(props) {
  var children = props.children;
  var padding = props.padding != null ? props.padding : 20;
  var gap = props.gap != null ? props.gap : 8;
  var justifyContent = props.justifyContent || 'flex-start';
  var T = AuraTokens;

  return React.createElement('div', {
    style: {
      flex: 1,
      display: 'flex',
      gap: gap,
      padding: padding,
      overflowX: 'auto',
      overflowY: 'hidden',
      justifyContent: justifyContent,
      minHeight: 0,
      background: T.colors.bgNeutralBase,
    },
  }, children);
}

function StackColumn(props) {
  var children = props.children;
  var gap = props.gap != null ? props.gap : 8;
  var flex = props.flex;
  var width = props.width;
  var minWidth = props.minWidth;
  var minHeight = props.minHeight;
  var height = props.height;
  var flexShrink = props.flexShrink != null ? props.flexShrink : 0;

  return React.createElement('div', {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: gap,
      flex: flex,
      width: width,
      maxWidth: props.maxWidth,
      minWidth: minWidth,
      minHeight: minHeight,
      height: height,
      flexShrink: flexShrink,
      overflow: 'hidden',
    },
  }, children);
}

function CenteredStage(props) {
  var children = props.children;
  var width = props.width;
  var gap = props.gap != null ? props.gap : 8;
  var height = props.height;

  return React.createElement('div', {
    style: {
      width: width,
      minWidth: width,
      height: height,
      display: 'flex',
      flexDirection: 'column',
      gap: gap,
      flexShrink: 0,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  }, children);
}

function SplitRow(props) {
  var children = props.children;
  var gap = props.gap != null ? props.gap : 8;
  var flex = props.flex != null ? props.flex : 1;

  return React.createElement('div', {
    style: {
      flex: flex,
      display: 'flex',
      gap: gap,
      overflow: 'hidden',
      minHeight: 0,
      alignItems: 'stretch',
    },
  }, children);
}

function FixedColumn(props) {
  var children = props.children;
  var width = props.width;
  var alignSelf = props.alignSelf || 'stretch';

  return React.createElement('div', {
    style: { width: width, flexShrink: 0, alignSelf: alignSelf },
  }, children);
}

function getFlowStageWidth(props) {
  var gap = props.gap != null ? props.gap : 8;
  var totalWidth = 0;

  if (props.nav) totalWidth += props.navWidth || 0;
  if (props.main) {
    if (totalWidth > 0) totalWidth += gap;
    totalWidth += props.mainWidth || 0;
  }
  if (props.side) {
    if (totalWidth > 0) totalWidth += gap;
    totalWidth += props.sideWidth || 0;
  }

  return totalWidth;
}

function FlowStageLayout(props) {
  var T = AuraTokens;
  var gap = props.gap != null ? props.gap : 8;
  var stageGap = props.stageGap != null ? props.stageGap : T.layout.islandGap;
  var height = props.height || '100%';
  var nav = props.nav;
  var main = props.main;
  var side = props.side;
  var totalWidth = getFlowStageWidth({
    nav: nav,
    navWidth: props.navWidth,
    main: main,
    mainWidth: props.mainWidth,
    side: side,
    sideWidth: props.sideWidth,
    gap: gap,
  });
  var header = typeof props.header === 'function'
    ? props.header(totalWidth)
    : props.header;

  return React.createElement(CenteredStage, {
    width: totalWidth,
    gap: stageGap,
    height: height,
  },
    header,
    React.createElement(SplitRow, {
      gap: gap,
      flex: props.flex != null ? props.flex : 1,
    },
      nav ? React.createElement(FixedColumn, {
        width: props.navWidth,
        alignSelf: props.navAlignSelf || 'stretch',
      }, nav) : null,
      main ? React.createElement(FixedColumn, {
        width: props.mainWidth,
        alignSelf: props.mainAlignSelf || 'stretch',
      }, main) : null,
      side ? React.createElement(FixedColumn, {
        width: props.sideWidth,
        alignSelf: props.sideAlignSelf || 'stretch',
      }, side) : null
    )
  );
}

function LayoutFillerTile() {
  return React.createElement(Tile, { stretch: true });
}

function flattenContentChildren(children) {
  var flat = [];
  var autoKey = 0;

  function pushChild(child) {
    if (child.key == null) {
      flat.push(React.cloneElement(child, { key: 'content-child-' + (autoKey++) }));
    } else {
      flat.push(child);
    }
  }

  React.Children.forEach(children, function(child) {
    if (!child) return;
    if (child.type === React.Fragment) {
      React.Children.forEach(flattenContentChildren(child.props.children), function(nestedChild) {
        pushChild(nestedChild);
      });
      return;
    }
    pushChild(child);
  });

  return flat;
}

function IslandColumn(props) {
  var width = props.width;
  var scrollChildren = props.scrollChildren;
  var buttons = props.buttons;
  var colRef = props.colRef;
  var fillMode = props.fillMode || (props.fitContent ? 'natural' : 'stretch-last');
  var T = AuraTokens;
  var childList = flattenContentChildren(scrollChildren);

  if (fillMode === 'stretch-last' && childList.length > 0) {
    var lastIndex = childList.length - 1;
    childList[lastIndex] = React.cloneElement(childList[lastIndex], {
      stretch: true,
    });
  }

  if (fillMode === 'filler-after-last') {
    childList.push(React.createElement(LayoutFillerTile, { key: 'layout-filler' }));
  }

  return React.createElement('div', {
    style: {
      width: width != null ? width : '100%',
      flexShrink: 0,
      height: props.fitContent ? 'auto' : '100%',
      maxHeight: '100%',
      minHeight: 0,
    },
  },
    React.createElement(Island, {
      background: T.colors.bgNeutralBase,
      style: {
        height: props.fitContent ? 'auto' : '100%',
        maxHeight: '100%',
        minHeight: 0,
      },
    },
    React.createElement(ScrollColumn, {
      x: 'hidden',
      y: 'auto',
      flex: props.fitContent ? '0 1 auto' : 1,
      containerRef: colRef,
    },
      React.createElement('div', {
        style: {
          minHeight: props.fitContent ? undefined : '100%',
          display: 'flex',
          flexDirection: 'column',
          gap: T.layout.tileGap,
          flex: 1,
        },
      }, childList)
    ),
    buttons ? React.createElement('div', { style: { flexShrink: 0 } }, buttons) : null
    )
  );
}

function IslandGridColumn(props) {
  var width = props.width;
  var scrollChildren = props.scrollChildren;
  var buttons = props.buttons;
  var colRef = props.colRef;
  var columns = props.columns || 2;
  var columnGap = props.columnGap != null ? props.columnGap : AuraTokens.layout.tileGap;
  var rowGap = props.rowGap != null ? props.rowGap : AuraTokens.layout.tileGap;
  var externalLayoutKey = props.layoutKey || '';
  var T = AuraTokens;
  var childList = flattenContentChildren(scrollChildren).map(function(child) {
    if (!React.isValidElement(child) || !child.props || !child.props.stretch) return child;
    return React.cloneElement(child, { stretch: false });
  });
  var layoutKey = externalLayoutKey + '|' + childList.map(function(child, index) {
    return child && child.key != null ? child.key : index;
  }).join('|') + '|' + columns;
  var measurementState = React.useState({ key: null, stretchColumns: {}, targetHeight: null });
  var measurement = measurementState[0];
  var setMeasurement = measurementState[1];
  var columnRefs = React.useRef([]);
  var scrollViewportRef = React.useRef(null);

  var splitSize = Math.ceil(childList.length / columns);
  var columnLists = [];
  for (var colIndex = 0; colIndex < columns; colIndex++) {
    columnLists.push(childList.slice(colIndex * splitSize, (colIndex + 1) * splitSize));
  }

  function setScrollContainer(el) {
    scrollViewportRef.current = el;
    if (typeof colRef === 'function') {
      colRef(el);
    } else if (colRef && typeof colRef === 'object') {
      colRef.current = el;
    }
  }

  React.useLayoutEffect(function() {
    if (measurement.key === layoutKey) return;
    var heights = columnRefs.current.slice(0, columns).map(function(el) {
      return el ? el.scrollHeight : 0;
    });
    var visibleHeights = heights.filter(function(height) { return height > 0; });
    if (!visibleHeights.length) {
      setMeasurement({ key: layoutKey, stretchColumns: {}, targetHeight: null });
      return;
    }

    var maxHeight = Math.max.apply(Math, visibleHeights);
    var viewportHeight = scrollViewportRef.current ? scrollViewportRef.current.clientHeight : 0;
    var targetHeight = Math.max(maxHeight, viewportHeight);
    var stretchColumns = {};

    heights.forEach(function(height, index) {
      if (!height || !columnLists[index] || !columnLists[index].length) return;
      if (targetHeight - height > 1) stretchColumns[index] = true;
    });

    setMeasurement({
      key: layoutKey,
      stretchColumns: stretchColumns,
      targetHeight: Object.keys(stretchColumns).length ? targetHeight : null,
    });
  }, [layoutKey, columns, measurement.key]);

  var activeMeasurement = measurement.key === layoutKey ? measurement : null;

  return React.createElement('div', {
    style: {
      width: width != null ? width : '100%',
      flexShrink: 0,
      height: '100%',
      minHeight: 0,
    },
  },
    React.createElement(Island, {
      background: T.colors.bgNeutralBase,
      style: {
        height: '100%',
        minHeight: 0,
      },
    },
      React.createElement(ScrollColumn, {
        x: 'hidden',
        y: 'auto',
        flex: 1,
        containerRef: setScrollContainer,
      },
        React.createElement('div', {
          style: {
            minHeight: '100%',
            display: 'flex',
            alignItems: 'flex-start',
            gap: columnGap,
          },
        }, columnLists.map(function(columnChildren, columnIndex) {
          var shouldStretchLast = !!(activeMeasurement && activeMeasurement.stretchColumns && activeMeasurement.stretchColumns[columnIndex]);
          var renderedChildren = columnChildren.map(function(child, childIndex) {
            var isLast = childIndex === columnChildren.length - 1;
            if (!React.isValidElement(child)) return child;
            return React.cloneElement(child, {
              stretch: shouldStretchLast && isLast,
            });
          });

          return React.createElement('div', {
            key: 'grid-column-' + columnIndex,
            ref: function(el) { columnRefs.current[columnIndex] = el; },
            style: {
              flex: 1,
              minWidth: 0,
              height: shouldStretchLast && activeMeasurement.targetHeight ? activeMeasurement.targetHeight : undefined,
              display: 'flex',
              flexDirection: 'column',
              gap: rowGap,
            },
          }, renderedChildren);
        }))
      ),
      buttons ? React.createElement('div', { style: { flexShrink: 0 } }, buttons) : null
    )
  );
}

function ScrollColumn(props) {
  var children = props.children;
  var x = props.x || 'hidden';
  var y = props.y || 'auto';
  var flex = props.flex != null ? props.flex : 1;
  var containerRef = props.containerRef;

  return React.createElement('div', {
    ref: containerRef,
    className: 'scrollable',
    style: {
      flex: flex,
      overflowX: x,
      overflowY: y,
      display: 'flex',
      flexDirection: 'column',
      minHeight: 0,
    },
  }, children);
}

function CardHeader(props) {
  var title = props.title;
  var children = props.children;
  var T = AuraTokens;

  return React.createElement(React.Fragment, null,
    React.createElement('div', { style: { padding: '20px 20px 0' } },
      React.createElement(PageTitle, { label: title })
    ),
    children ? React.createElement('div', {
      className: 'scrollable',
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        padding: '20px 20px 16px',
        overflowX: 'auto',
      },
    }, children) : null
  );
}

function RelativeInline(props) {
  return React.createElement('div', {
    ref: props.innerRef,
    style: {
      position: 'relative',
      flexShrink: props.flexShrink != null ? props.flexShrink : 0,
    },
  }, props.children);
}

function InlineFields(props) {
  var gap = props.gap != null ? props.gap : 16;

  return React.createElement('div', {
    style: {
      display: 'flex',
      gap: gap,
      flexShrink: 0,
    },
  }, React.Children.map(props.children, function(child, index) {
    if (!child) return null;
    return React.createElement('div', {
      key: child.key != null ? child.key : 'inline-field-' + index,
      style: {
        flex: 1,
        minWidth: 0,
      },
    }, child);
  }));
}

function StickyTableHeader(props) {
  var T = AuraTokens;

  return React.createElement('div', {
    style: {
      display: 'flex',
      borderBottom: props.border === false ? 'none' : '1px solid ' + T.colors.borderPrimary,
      flexShrink: 0,
      position: 'sticky',
      top: 0,
      background: T.colors.bgBase,
      zIndex: 1,
    },
  }, props.children);
}

function InteractiveRow(props) {
  var children = props.children;
  var selected = !!props.selected;
  var onClick = props.onClick;
  var selectedBg = props.selectedBg;
  var hoverBg = props.hoverBg;
  var borderColor = props.borderColor;
  var T = AuraTokens;

  return React.createElement('div', {
    onClick: onClick,
    style: {
      display: 'flex',
      borderBottom: '1px solid ' + (borderColor || T.colors.borderSecondary),
      background: selected ? (selectedBg || hoverBg || T.colors.bgSecondary) : 'transparent',
      cursor: 'pointer',
      transition: 'background 0.1s',
    },
    onMouseEnter: function(e) {
      if (!selected) e.currentTarget.style.background = hoverBg || T.colors.bgSecondary;
    },
    onMouseLeave: function(e) {
      if (!selected) e.currentTarget.style.background = 'transparent';
    },
  }, children);
}

function ReadonlyField(props) {
  var label = props.label;
  var value = props.value;
  var width = props.width;
  var fluid = !!props.fluid;
  var T = AuraTokens;

  return React.createElement('div', {
    'data-readonly-field': label,
    style: {
      position: 'relative',
      width: width != null ? width : (fluid ? '100%' : 120),
      flex: fluid ? 1 : undefined,
      flexShrink: fluid ? 1 : 0,
      minWidth: 0,
      height: 48,
      borderRadius: T.radii.md,
      background: T.colors.bgNeutralPrimary,
      border: '1px solid ' + T.colors.borderNeutralLighter,
      padding: props.help ? '0 44px 0 16px' : '0 16px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      gap: 2,
    },
  },
    React.createElement('span', {
      style: {
        fontFamily: T.font.family,
        fontSize: T.font.size[props.help ? 'body/sm' : 'body/xs'],
        fontWeight: T.font.weightBody,
        color: T.colors.tigNeutralTertiary,
        lineHeight: T.font.lineHeight['body/xs'] + 'px',
      },
    }, label),
    React.createElement('span', {
      style: {
        fontFamily: T.font.family,
        fontSize: T.font.size['body/md'],
        fontWeight: props.help ? T.font.weightBody : T.font.weightSemiBold,
        color: T.colors.tigNeutralPrimary,
        lineHeight: T.font.lineHeight['body/md'] + 'px',
      },
    }, value),
    props.help ? React.createElement('button', {
      type: 'button', title: props.help, 'aria-label': 'About ' + label,
      style: { position: 'absolute', right: 12, top: 13, width: 20, height: 20,
        padding: 0, border: 0, background: 'transparent', cursor: 'help' },
    }, React.createElement('img', { src: 'assets/icons/field-help.svg', alt: '' })) : null
  );
}

Object.assign(window, {
  TextActionButton,
  PrimaryActionButton,
  CloseIcon16,
  EmptyState,
  ReadonlyField,
  PageTitle,
  FlexSpacer,
  FillRow,
  PageScreen,
  PageWorkspace,
  StackColumn,
  CenteredStage,
  SplitRow,
  FixedColumn,
  getFlowStageWidth,
  FlowStageLayout,
  LayoutFillerTile,
  IslandColumn,
  IslandGridColumn,
  ScrollColumn,
  RelativeInline,
  InlineFields,
  StickyTableHeader,
  CardHeader,
  InteractiveRow,
});
