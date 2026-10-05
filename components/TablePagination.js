(function() {
  function TablePagination(props) {
    var T = AuraTokens;
    var pages = [];
    for (var page = 1; page <= props.pageCount; page += 1) {
      if (page === 1 || page === props.pageCount || Math.abs(page - props.page) <= 2 || (props.page <= 3 && page <= 5)) pages.push(page);
    }
    var controls = [];
    pages.forEach(function(page, index) {
      if (index && page - pages[index - 1] > 1) controls.push(React.createElement('span', { key: 'gap-' + page, style: { padding: '0 16px' } }, '...'));
      controls.push(React.createElement('button', {
        key: page, type: 'button', 'aria-label': 'Page ' + page, 'aria-current': page === props.page ? 'page' : undefined,
        onClick: function() { props.onChange(page); },
        style: { width: 40, height: 40, borderRadius: T.radii.sm, flexShrink: 0,
          border: page === props.page ? '1px solid ' + T.colors.borderAccentSecondary : '1px solid transparent',
          background: page === props.page ? T.colors.bgAccentTertiary : T.colors.bgNeutralPrimary,
          color: page === props.page ? T.colors.tigAccentPrimary : T.colors.tigNeutralPrimary,
          fontFamily: T.font.family, fontSize: 15, cursor: 'pointer' },
      }, page));
    });
    function arrow(label, target, icon) {
      var disabled = target < 1 || target > props.pageCount;
      return React.createElement('button', { type: 'button', 'aria-label': label, title: label, disabled: disabled,
        onClick: function() { props.onChange(target); },
        style: { width: 40, height: 40, padding: 12, border: 0, background: 'transparent',
          borderRadius: T.radii.sm, flexShrink: 0, cursor: disabled ? 'default' : 'pointer', opacity: disabled ? 0.4 : 1 },
      }, React.createElement(AssetIcon, { src: icon, size: 16, naturalSize: 24 }));
    }
    return React.createElement('nav', { 'aria-label': 'Table pagination',
      style: { display: 'flex', alignItems: 'center', padding: '0 20px 20px', height: 60, flexShrink: 0,
        overflowX: 'auto', color: T.colors.tigNeutralPrimary, background: T.colors.bgNeutralPrimary } },
      arrow('Previous page', props.page - 1, 'assets/icons/lot-prev.svg'), controls,
      arrow('Next page', props.page + 1, 'assets/icons/lot-next.svg')
    );
  }
  window.TablePagination = TablePagination;
})();
