// Shared UI. Dependencies and props are documented in COMPONENTS.md.
(function () {
function ToolbarDivider() {
  const T = AuraTokens;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      height: 40,
      padding: '0 4px',
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 1,
      height: 40,
      background: T.colors.borderNeutralLighter
    }
  }));
}
function DateGroupHeader(props) {
  const T = AuraTokens;
  const date = props.date;
  const count = props.count;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      padding: '20px 20px 12px'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: T.colors.tigNeutralPrimary,
      fontFamily: T.font.family,
      fontSize: T.font.size['heading/sm'],
      fontWeight: T.font.weightSemiBold || T.font.weightBold,
      lineHeight: T.font.lineHeight['heading/sm'] + 'px',
      whiteSpace: 'nowrap'
    }
  }, date), /*#__PURE__*/React.createElement(Badge, {
    label: count + ' ' + (count === 1 ? 'trade' : 'trades'),
    variant: "neutral-secondary"
  }));
}
const ROW_NUMBER_PADDING_LEFT = 20;
const ROW_NUMBER_WIDTH = 32;
const ROW_NUMBER_GAP = 8;
const ROW_NUMBER_SLOT_WIDTH = ROW_NUMBER_PADDING_LEFT + ROW_NUMBER_WIDTH + ROW_NUMBER_GAP;
function RowNumberHeaderCell() {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      width: ROW_NUMBER_SLOT_WIDTH,
      minWidth: ROW_NUMBER_SLOT_WIDTH,
      height: 52,
      flexShrink: 0,
      paddingLeft: ROW_NUMBER_PADDING_LEFT,
      paddingRight: ROW_NUMBER_GAP,
      boxSizing: 'border-box'
    }
  });
}
function RowNumberCell(props) {
  const T = AuraTokens;
  const value = props.value;
  return /*#__PURE__*/React.createElement(Td, {
    width: ROW_NUMBER_SLOT_WIDTH,
    paddingLeft: ROW_NUMBER_PADDING_LEFT,
    paddingRight: ROW_NUMBER_GAP
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: ROW_NUMBER_WIDTH,
      color: T.colors.tigNeutralSecondary,
      fontFamily: T.font.family,
      fontSize: T.font.size['body/md'],
      fontWeight: T.font.weightBody,
      lineHeight: T.font.lineHeight['body/md'] + 'px',
      whiteSpace: 'nowrap'
    }
  }, value));
}
Object.assign(window, { ToolbarDivider, DateGroupHeader, ROW_NUMBER_PADDING_LEFT, ROW_NUMBER_WIDTH, ROW_NUMBER_GAP, ROW_NUMBER_SLOT_WIDTH, RowNumberHeaderCell, RowNumberCell });
})();
