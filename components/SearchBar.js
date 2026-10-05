// Shared UI. Dependencies and props are documented in COMPONENTS.md.
(function () {
function SearchBar(props) {
  const T = AuraTokens;
  const value = props.value;
  const onChange = props.onChange;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      width: 240,
      height: 40,
      flexShrink: 0,
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      padding: '0 12px',
      borderRadius: 12,
      background: T.colors.bgNeutralSecondary
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 16,
      height: 16,
      color: T.colors.tigNeutralSecondary,
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexShrink: 0
    }
  }, props.icon || /*#__PURE__*/React.createElement(SearchIcon16, null)), /*#__PURE__*/React.createElement("input", {
    type: "text",
    'aria-label': props.label || 'Search',
    value: value,
    onChange: e => onChange(e.target.value),
    placeholder: "Search",
    style: {
      flex: 1,
      minWidth: 0,
      border: 'none',
      outline: 'none',
      background: 'transparent',
      color: T.colors.tigNeutralPrimary,
      fontFamily: T.font.family,
      fontSize: T.font.size['body/md'],
      fontWeight: T.font.weightBody,
      lineHeight: T.font.lineHeight['body/md'] + 'px'
    }
  }));
}
Object.assign(window, { SearchBar });
})();
