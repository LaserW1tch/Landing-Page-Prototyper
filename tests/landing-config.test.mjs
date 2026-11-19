import { test } from 'node:test';
import assert from 'node:assert/strict';
import { applyLandingTypography } from '../scripts/landing-config.js';

function root() {
  const props = {};
  return { props, dataset: {}, style: { setProperty(k, v) { props[k] = v; } } };
}

test('fonts come from Foundry, and a font that is no longer installed falls back to the default', () => {
  globalThis.CONFIG = { fontDefinitions: { Amiri: {}, 'Modesto Condensed': {}, Signika: {} } };
  const r = root();
  applyLandingTypography(r, { titleFont: 'Some Removed Font', buttonFont: 'Signika' });
  assert.equal(r.props['--cm-title-font'], '"Modesto Condensed"');
  assert.equal(r.props['--cm-button-font'], '"Signika"');
  delete globalThis.CONFIG;
});

test('fonts added through Foundry Additional Fonts are offered', () => {
  globalThis.foundry = { applications: { settings: { menus: { FontConfig: { getAvailableFonts: () => ['Amiri', 'My Added Font'] } } } } };
  const r = root();
  applyLandingTypography(r, { titleFont: 'My Added Font' });
  assert.equal(r.props['--cm-title-font'], '"My Added Font"');
  delete globalThis.foundry;
});
