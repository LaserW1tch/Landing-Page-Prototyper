export const MODULE_ID = 'laserw1tch-landing-page-prototyper';
export const MODULE_PATH = `modules/${MODULE_ID}`;

// Original vector button frame drawn for this module (no third-party artwork).
const GOTHIC_FRAME = '<svg class="cm-gothic-frame" viewBox="0 0 240 228" preserveAspectRatio="none" aria-hidden="true" focusable="false"><path class="cm-gothic-backing" stroke="none" d="M22 6 H104 Q114 6 120 1 Q126 6 136 6 H218 L234 22 V206 L218 222 H136 Q126 222 120 227 Q114 222 104 222 H22 L6 206 V22 Z"/><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" vector-effect="non-scaling-stroke"><path stroke-width="1.6" d="M22 6 H104 Q114 6 120 1 Q126 6 136 6 H218 L234 22 V206 L218 222 H136 Q126 222 120 227 Q114 222 104 222 H22 L6 206 V22 Z"/><path stroke-width="0.9" d="M27 13 H108 Q116 13 120 7 Q124 13 132 13 H213 L227 27 V201 L213 215 H132 Q124 215 120 221 Q116 215 108 215 H27 L13 201 V27 Z"/><path stroke-width="0.9" d="M13 98 Q4 114 13 130 M227 98 Q236 114 227 130"/></g><g fill="none" stroke="currentColor" stroke-width="0.9" vector-effect="non-scaling-stroke"><g transform="translate(30 29)"><circle cx="0" cy="-4" r="3.6"/><circle cx="4" cy="0" r="3.6"/><circle cx="0" cy="4" r="3.6"/><circle cx="-4" cy="0" r="3.6"/></g><g transform="translate(210 29)"><circle cx="0" cy="-4" r="3.6"/><circle cx="4" cy="0" r="3.6"/><circle cx="0" cy="4" r="3.6"/><circle cx="-4" cy="0" r="3.6"/></g><g transform="translate(30 199)"><circle cx="0" cy="-4" r="3.6"/><circle cx="4" cy="0" r="3.6"/><circle cx="0" cy="4" r="3.6"/><circle cx="-4" cy="0" r="3.6"/></g><g transform="translate(210 199)"><circle cx="0" cy="-4" r="3.6"/><circle cx="4" cy="0" r="3.6"/><circle cx="0" cy="4" r="3.6"/><circle cx="-4" cy="0" r="3.6"/></g></g><g fill="currentColor" stroke="none"><path d="M120 17 l3 4 l-3 4 l-3 -4 Z M120 203 l3 4 l-3 4 l-3 -4 Z M8 114 l3 -4 l3 4 l-3 4 Z M226 114 l3 -4 l3 4 l-3 4 Z"/></g></svg>';

export const BUTTON_STYLES = Object.freeze(['gothic', 'parchment', 'etched', 'arcane', 'minimal', 'iron']);

// Original line-art borders for the other button styles, drawn for this module.
// Each border is nine-slice: fixed-size corner (and optional top/bottom centre)
// pieces, plus straight edge strips that stretch with the button without
// distorting. Edge strips use percentage coordinates, so they draw at 1:1 scale;
// repeated marks (ticks, runes, rivets) are dash patterns on a thick stroke.
// Corner pieces are drawn once as the top-left corner and mirrored in CSS.
const hLine = (o, w, extra = '') => `<line x1="0" y1="${o}" x2="100%" y2="${o}" stroke-width="${w}" ${extra}/>`;
const vLine = (o, w, extra = '') => `<line x1="${o}" y1="0" x2="${o}" y2="100%" stroke-width="${w}" ${extra}/>`;
const FRAME_ART = {
  // Scalloped certificate rules in ink, with a small peaked flourish at top and bottom.
  parchment: {
    size: 34,
    edge: line => line(7, 1.3) + line(11, 0.6),
    corner: '<path stroke-width="1.3" d="M34 7H22A15 15 0 0 1 7 22V34"/><path stroke-width=".6" d="M34 11H25.6A19 19 0 0 1 11 25.6V34"/><path stroke-width=".8" d="M3.5 13Q3.5 3.5 13 3.5"/><circle cx="7.6" cy="7.6" r="1.7" fill="currentColor" stroke="none"/>',
    mid: { w: 56, h: 22, svg: '<path stroke-width="1.3" d="M0 7H18C22 7 24 3 28 1C32 3 34 7 38 7H56"/><path stroke-width=".6" d="M0 11H20C24 11 26 7 28 5.5C30 7 32 11 36 11H56"/><path fill="currentColor" stroke="none" d="M28 12.5l2.4 3-2.4 3-2.4-3Z"/>' }
  },
  // Engraved plate: hairline rules around a milled (reeded) band, stamped corner diamonds.
  etched: {
    size: 26,
    edge: line => line(3, 1) + line(7.5, 4, 'stroke-dasharray=".7 2.3" stroke-opacity=".75"') + line(12, 0.7),
    corner: '<path stroke-width="1" d="M26 3H3V26"/><path stroke-width=".7" d="M26 12H12V26"/><path stroke-width="4" stroke-dasharray=".7 2.3" stroke-opacity=".75" d="M14 7.5H26M7.5 14V26"/><path stroke-width=".8" d="M7.5 3.8 11.2 7.5 7.5 11.2 3.8 7.5Z"/><circle cx="7.5" cy="7.5" r=".9" fill="currentColor" stroke="none"/><path stroke-width=".6" d="M16 23V16H23"/>'
  },
  // Warding circle: hairlines around a band of rune marks, sigil corners, triple moon at centre.
  arcane: {
    size: 30,
    edge: line => line(4, 0.8) + line(8, 3, 'stroke-dasharray="1 2 3 2 1 5" stroke-opacity=".8"') + line(12, 0.8),
    corner: '<circle cx="9" cy="9" r="7" stroke-width=".9"/><path stroke-width=".7" d="M9 2.4 14.7 12.3H3.3Z"/><circle cx="9" cy="9" r="1" fill="currentColor" stroke="none"/><path stroke-width=".8" d="M30 4H14M4 30V14M30 12H15.3M12 30V15.3"/><path stroke-width="3" stroke-dasharray="1 2 3 2 1 5" stroke-opacity=".8" d="M30 8H16.5M8 30V16.5"/>',
    mid: { w: 44, h: 16, svg: '<path stroke-width=".8" d="M0 4H5M39 4H44M0 12H5M39 12H44"/><circle cx="22" cy="8" r="5.5" stroke-width=".9"/><circle cx="22" cy="8" r="1" fill="currentColor" stroke="none"/><path stroke-width=".8" d="M13 3.5A4.5 4.5 0 0 0 13 12.5A5.5 5.5 0 0 1 13 3.5ZM31 3.5A4.5 4.5 0 0 1 31 12.5A5.5 5.5 0 0 0 31 3.5Z"/>' }
  },
  // A faint hairline with crisp corner brackets that spread apart on hover.
  minimal: {
    size: 18,
    edge: line => line(6, 0.8, 'stroke-opacity=".35"'),
    corner: '<path stroke-width=".8" stroke-opacity=".35" d="M18 6H6V18"/><path class="cm-art-bracket" stroke-width="1.4" d="M16 1.5H1.5V16"/>'
  },
  // Riveted iron strap with chamfered corners and slotted corner bolts.
  iron: {
    size: 30,
    edge: line => line(2.5, 1.2) + line(7.75, 3.4, 'stroke-dasharray="0 20" stroke-linecap="round"') + line(13, 1),
    corner: '<path stroke-width="1.2" d="M30 2.5H11L2.5 11V30"/><path stroke-width="1" d="M30 13H13V30"/><circle cx="8.4" cy="8.4" r="3.3" stroke-width="1"/><path stroke-width="1" d="M6.3 10.5 10.5 6.3"/>'
  }
};

function frameArt(style) {
  const art = FRAME_ART[style];
  const c = art.size;
  const strip = (cls, line) => `<svg class="cm-art-edge ${cls}">${art.edge(line)}</svg>`;
  const corners = ['tl', 'tr', 'bl', 'br'].map(pos => `<svg class="cm-art-corner cm-${pos}" viewBox="0 0 ${c} ${c}">${art.corner}</svg>`).join('');
  const mid = art.mid ? ['mt', 'mb'].map(pos => `<svg class="cm-art-mid cm-${pos}" viewBox="0 0 ${art.mid.w} ${art.mid.h}">${art.mid.svg}</svg>`).join('') : '';
  const horizontal = art.mid ? ['top-l', 'top-r', 'bottom-l', 'bottom-r'] : ['top', 'bottom'];
  const vars = `--c:${c}px${art.mid ? `;--mw:${art.mid.w}px;--mh:${art.mid.h}px` : ''}`;
  return `<span class="cm-art cm-art-${style}" style="${vars}" aria-hidden="true">${corners}${horizontal.map(cls => strip(`cm-${cls}`, hLine)).join('')}${strip('cm-left', vLine)}${strip('cm-right', vLine)}${mid}</span>`;
}

export function buttonFrame(style) {
  return FRAME_ART[style] ? frameArt(style) : GOTHIC_FRAME;
}

export const DESTINATIONS = Object.freeze([
  { key: 'story', name: 'The Story So Far', eyebrow: 'THE CHRONICLE', icon: 'book' },
  { key: 'graveyard', name: 'The Graveyard', eyebrow: 'IN MEMORIAM', icon: 'grave' },
  { key: 'cast', name: 'Our Cast of Characters', eyebrow: 'THE COMPANY', icon: 'portraits' },
  { key: 'quest', name: 'Quest Log', eyebrow: 'ACTIVE THREADS', icon: 'book' },
  { key: 'details', name: 'Important Items, NPCs, and Details', eyebrow: 'THE ARCHIVE', icon: 'key' },
  { key: 'rules', name: 'Rules', eyebrow: 'THE COVENANT', icon: 'scales' },
  { key: 'maps', name: 'Maps', eyebrow: 'EXPLORE', icon: 'scroll', special: true }
]);

const icons = {
  book: '<path d="M24 13C16 8 9 9 5 11v27c6-3 12-2 19 3 7-5 13-6 19-3V11c-4-2-11-3-19 2Zm0 0v28M10 16c3-1 7 0 10 2m-10 5c3-1 7 0 10 2m8-7c3-2 7-3 10-2m-10 9c3-2 7-3 10-2"/>',
  portraits: '<path d="M9 9h30v31H9zM5 5h38v39H5zM13 37c0-7 4-11 11-11s11 4 11 11M30 19c0 5-3 8-6 8s-6-3-6-8 3-7 6-7 6 2 6 7Z"/>',
  key: '<circle cx="16" cy="17" r="9"/><path d="m22 24 17 17m-8-8 5-5m0 10 5-5M13 14l6 6m0-6-6 6"/>',
  grave: '<path d="M12 39V21c0-9 5-15 12-15s12 6 12 15v18M7 40h34M24 13v17m-7-11h14M4 44h40"/><path d="m10 38-4-5m32 5 4-5"/>',
  scroll: '<path d="M13 13v22h22V13M13 13c-3 0-4-2-4-4s1-4 4-4h22c3 0 4 2 4 4s-1 4-4 4H13ZM13 35c-3 0-4 2-4 4s1 4 4 4h22c3 0 4-2 4-4s-1-4-4-4H13Z"/><path d="M17 19h14m-14 6h14m-14 6h10"/>',
  scales: '<path d="M24 7v33m-9 2h18M8 17l16-5 16 5M12 16 5 29h14Zm24 0-7 13h14ZM5 29c1 7 12 7 14 0m10 0c2 7 13 7 14 0"/><circle cx="24" cy="7" r="3"/>'
};

export function iconSVG(key) {
  return `<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${icons[key] ?? icons.book}</svg>`;
}

export function landingMarkup(config = {}, mapScenes = []) {
  const title = escapeHTML(config.title || 'Your Campaign');
  const enabled = new Set(config.buttons || DESTINATIONS.map(d => d.key));
  const destinations = DESTINATIONS.filter(d => enabled.has(d.key));
  const frame = buttonFrame(config.buttonStyle);
  return `<div class="cm-frame" aria-hidden="true"><span></span><span></span><span></span><span></span></div>
    <header class="cm-masthead">
      <h1>${title}</h1>
    </header>
    <section class="cm-navigation" aria-label="Campaign journals">
      <nav class="cm-links" aria-label="Campaign navigation">${destinations.map(d => `
        <button type="button" class="cm-link" data-cm-destination="${d.key}">
          <span class="cm-link-icon">${iconSVG(d.icon)}</span>
          <span class="cm-link-title${d.name.length > 24 ? ' cm-link-title-long' : ''}">${d.name}</span>
          ${frame}
        </button>`).join('')}
      </nav>
      ${mapScenes.length ? `<div class="cm-map-submenu" aria-label="Choose a map">${mapScenes.map(scene => `<button type="button" class="cm-map-choice" data-cm-open-map="${escapeHTML(scene.id)}">${escapeHTML(scene.name)}</button>`).join('')}</div>` : ''}
    </section>`;
}

export function escapeHTML(value) {
  return String(value).replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char]);
}
