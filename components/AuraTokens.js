// AuraTokens.js — Single source of truth for the Aura Design System tokens
// Generated from export.json (Day theme, Web sizes, Inter typography)
// Load with <script src="components/AuraTokens.js"> BEFORE any component scripts.

const AuraTokens = {
  colors: {
    // ── bg/neutral ──
    bgNeutralPrimary:            '#ffffff',
    bgNeutralPrimaryHover:       '#eceef5',
    bgNeutralSecondary:          '#eceef5',
    bgNeutralSecondaryHover:     '#d8dbe5',
    bgNeutralBase:               '#f2f5fa',
    bgNeutralInverse:            '#2c2f38',
    bgNeutralInverseSecondary:   '#3e424d',
    bgNeutralWhite:              '#ffffff',
    bgNeutralBlack:              '#252830',
    bgNeutralSkeleton:           '#eceef5',
    // ── bg/plata ──
    bgPlataPrimary:              '#ff5000',
    bgPlataPrimaryHover:         '#f24d00',
    bgPlataLight:                '#ffede5',
    // ── bg/accent ──
    bgAccentPrimary:             '#150dfe',
    bgAccentPrimaryHover:        '#1f19d1',
    bgAccentSecondary:           '#ccdaff',
    bgAccentTertiary:            '#e5ecff',
    bgAccentLight:               '#f4f7ff',
    // ── bg/success ──
    bgSuccessPrimary:            '#00a637',
    bgSuccessPrimaryHover:       '#008c2f',
    bgSuccessSecondary:          '#c4f5d4',
    bgSuccessTertiary:           '#e1fae9',
    // ── bg/error ──
    bgErrorPrimary:              '#f20c0c',
    bgErrorPrimaryHover:         '#e50b0b',
    bgErrorSecondary:            '#febebe',
    bgErrorTertiary:             '#fee5e5',
    // ── bg/warning ──
    bgWarningPrimary:            '#ff9500',
    bgWarningSecondary:          '#ffdaa6',
    bgWarningTertiary:           '#fff4e5',

    // ── tig/neutral ──
    tigNeutralPrimary:           '#252830',
    tigNeutralSecondary:         '#797e8c',
    tigNeutralTertiary:          '#acb1bf',
    tigNeutralInverse:           '#f2f5fa',
    tigNeutralInverseSecondary:  '#d8dbe5',
    tigNeutralWhite:             '#f2f5fa',
    tigNeutralBlack:             '#2c2f38',
    // ── tig/plata ──
    tigPlataPrimary:             '#f24d00',
    // ── tig/accent ──
    tigAccentPrimary:            '#150dfe',
    // ── tig/success ──
    tigSuccessPrimary:           '#00a637',
    // ── tig/error ──
    tigErrorPrimary:             '#f20c0c',
    // ── tig/warning ──
    tigWarningPrimary:           '#e08300',

    // ── border/neutral ──
    borderNeutralPrimary:        '#252830',
    borderNeutralSecondary:      '#acb1bf',
    borderNeutralTertiary:       '#ced2e0',
    borderNeutralLighter:        '#d8dbe5',
    // ── border/accent ──
    borderAccentPrimary:         '#150dfe',
    borderAccentSecondary:       '#99b4ff',
    borderAccentLighter:         '#e5ecff',
    // ── border/success ──
    borderSuccessPrimary:        '#00bf40',
    borderSuccessSecondary:      '#a8f0c0',
    // ── border/error ──
    borderErrorPrimary:          '#f20c0c',
    borderErrorSecondary:        '#fea5a5',
    // ── border/warning ──
    borderWarningPrimary:        '#ff9500',
    borderWarningSecondary:      '#ffdaa6',

    // ── Legacy aliases (keep existing components working) ──
    orange:        '#ff5000',
    orangeHover:   '#f24d00',
    orangePress:   '#ff6924',
    orangeLight:   '#ffede5',
    blue:          '#150dfe',
    blueHover:     '#1f19d1',
    blueLight:     '#e5ecff',
    blueBorder:    '#99b4ff',
    green:         '#00a637',
    greenHover:    '#008c2f',
    greenLight:    '#e1fae9',
    red:           '#f20c0c',
    redHover:      '#e50b0b',
    redLight:      '#fee5e5',
    bgBase:        '#ffffff',
    bgPrimary:     '#f2f5fa',
    bgSecondary:   '#eceef5',
    bgDark:        '#121416',
    bgInverse:     '#252830',
    fgPrimary:     '#252830',
    fgSecondary:   '#797e8c',
    fgTertiary:    '#acb1bf',
    fgDisabled:    '#c7cbd9',
    fgInverse:     '#f2f5fa',
    borderPrimary:   '#d8dbe5',
    borderSecondary: '#eceef5',
    borderTertiary:  '#ced2e0',
    grey01: '#f5f7fc', grey05: '#edf0f7', grey10: '#dfe3ed', grey20: '#d2d7e5',
    grey30: '#c7cbd9', grey40: '#babecc', grey50: '#b0b4bf', grey60: '#a1a5b2',
    grey70: '#9095a3', grey80: '#818796',
  },

  // ── Radii (from Sizes Tokens / Web) ──
  radii: {
    '5xs': 2, '4xs': 4, '3xs': 6, '2xs': 8, xs: 10, sm: 12, md: 16,
    lg: 20, xl: 24, '2xl': 32, '3xl': 40, '4xl': 48, full: 9999,
  },

  // ── Spacing (from Sizes Tokens / Web) ──
  spacing: {
    none: 0, half: 2, base: 4, 1.5: 6,
    2: 8, 3: 12, 3.5: 14, 4: 16, 5: 20, 6: 24, 8: 32,
    10: 40, 12: 48, 14: 56, 15: 60, 16: 64,
  },

  // ── Typography (Web, Inter) ──
  font: {
    family:          "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
    weightBody:      400,
    weightSemiBold:  600,
    weightBold:      650,
    // legacy
    weightRegular:   400,
    weightMedium:    500,

    // font-size
    size: {
      'heading/xl': 30, 'heading/lg': 26, 'heading/md': 20, 'heading/sm': 17,
      'heading/xs': 15, 'heading/2xs': 13, 'heading/3xs': 11,
      'body/lg': 17, 'body/md': 15, 'body/sm': 13, 'body/xs': 11,
    },
    // line-height
    lineHeight: {
      'heading/xl': 40, 'heading/lg': 32, 'heading/md': 24, 'heading/sm': 20,
      'heading/xs': 20, 'heading/2xs': 16, 'heading/3xs': 12,
      'body/lg': 20, 'body/md': 20, 'body/sm': 16, 'body/xs': 12,
    },
  },

  // ── Component sizes (size L unless noted) ──
  components: {
    badge: { height: 24, radius: 8,  hPadding: 8,  fontSize: 15, lineHeight: 20 },  // M size
    chip:  { height: 40, radius: 12, hPadding: 12, fontSize: 15, lineHeight: 20 },  // L size
    button: {
      L: { height: 56, radius: 16, hPadding: 16, fontSize: 17, lineHeight: 20 },
      M: { height: 48, radius: 12, hPadding: 14, fontSize: 15, lineHeight: 20 },
      S: { height: 40, radius: 12, hPadding: 12, fontSize: 13, lineHeight: 16 },
    },
    input: {
      L: { minHeight: 56, radius: 16, hPadding: 20, fontSize: 17, lineHeight: 20 },
      M: { minHeight: 48, radius: 12, hPadding: 16, fontSize: 15, lineHeight: 20 },
    },
  },

  // ── Layout system ──
  layout: {
    contentMinWidth: 1280,
    contentMaxWidth: 1536,
    islandRadius: 12,
    islandGap:     8,
    tileRadius:    0,
    tileGap:       4,
  },

  shadows: {
    popup: '0px 3px 27px 0px rgba(32,47,78,0.09)',
    card:  '0px 1px 8px 0px rgba(32,47,78,0.07)',
    modal: '0px 8px 40px 0px rgba(0,0,0,0.25)',
  },

  icons: {
    home:        'assets/icons/home.svg',
    dollar:      'assets/icons/dollar.svg',
    list:        'assets/icons/list.svg',
    history:     'assets/icons/history.svg',
    chevronDown: 'assets/icons/chevron-down.svg',
    plusBig:     'assets/icons/plus-big.svg',
    sortNone:    'assets/icons/sort-none.svg',
    sortAsc:     'assets/icons/sort-asc.svg',
    sortDesc:    'assets/icons/sort-desc.svg',
    filterOff:   'assets/icons/filter-off.svg',
    filterOn:    'assets/icons/filter-on.svg',
  },
};

Object.assign(window, { AuraTokens });

function getAnchoredDropdownPosition(anchorRect, config) {
  var opts = config || {};
  var margin = opts.margin != null ? opts.margin : 8;
  var gap = opts.gap != null ? opts.gap : 8;
  var desiredWidth = opts.width != null ? opts.width : anchorRect.width;
  var desiredHeight = opts.height != null ? opts.height : 256;
  var minVisibleHeight = opts.minVisibleHeight != null ? opts.minVisibleHeight : 160;
  var preferredAlign = opts.preferredAlign || 'start';
  var preferredSide = opts.preferredSide || 'bottom';

  var viewportWidth = window.innerWidth || document.documentElement.clientWidth || 0;
  var viewportHeight = window.innerHeight || document.documentElement.clientHeight || 0;

  var maxWidth = Math.max(0, viewportWidth - margin * 2);
  var width = Math.min(desiredWidth, maxWidth);

  var spaceBelow = Math.max(0, viewportHeight - anchorRect.bottom - gap - margin);
  var spaceAbove = Math.max(0, anchorRect.top - gap - margin);
  var desiredVisibleHeight = Math.min(desiredHeight, minVisibleHeight);

  var openAbove = false;
  if (preferredSide === 'top') {
    openAbove = true;
  } else if (preferredSide === 'auto') {
    openAbove = spaceAbove > spaceBelow && spaceBelow < desiredVisibleHeight;
  } else {
    openAbove = spaceBelow < desiredVisibleHeight && spaceAbove > spaceBelow;
  }

  var startLeft = anchorRect.left;
  var endLeft = anchorRect.right - width;
  var fitsStart = startLeft >= margin && startLeft + width <= viewportWidth - margin;
  var fitsEnd = endLeft >= margin && endLeft + width <= viewportWidth - margin;

  var left = startLeft;
  if (preferredAlign === 'end') {
    left = (fitsEnd || !fitsStart) ? endLeft : startLeft;
  } else if (preferredAlign === 'auto') {
    if (fitsStart && !fitsEnd) left = startLeft;
    else if (fitsEnd && !fitsStart) left = endLeft;
    else left = anchorRect.left + anchorRect.width / 2 < viewportWidth / 2 ? startLeft : endLeft;
  } else {
    left = (fitsStart || !fitsEnd) ? startLeft : endLeft;
  }

  left = Math.min(Math.max(left, margin), Math.max(margin, viewportWidth - margin - width));

  return {
    left: left,
    width: width,
    maxHeight: Math.max(96, openAbove ? spaceAbove : spaceBelow),
    top: openAbove ? 'auto' : anchorRect.bottom + gap,
    bottom: openAbove ? (viewportHeight - anchorRect.top + gap) : 'auto',
    openAbove: openAbove,
  };
}

Object.assign(window, { getAnchoredDropdownPosition });

if (typeof document !== 'undefined' && document.documentElement) {
  var rootStyle = document.documentElement.style;
  rootStyle.setProperty('--aura-font-family', AuraTokens.font.family);
  rootStyle.setProperty('--aura-bg-neutral-base', AuraTokens.colors.bgNeutralBase);
  rootStyle.setProperty('--aura-bg-neutral-primary', AuraTokens.colors.bgNeutralPrimary);
  rootStyle.setProperty('--aura-bg-accent-light', AuraTokens.colors.bgAccentLight);
  rootStyle.setProperty('--aura-border-tertiary', AuraTokens.colors.borderTertiary);
}
