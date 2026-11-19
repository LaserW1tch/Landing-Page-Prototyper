import test from 'node:test';
import assert from 'node:assert/strict';
import { BUTTON_STYLES, buttonFrame, landingMarkup } from '../scripts/presentation.js';

test('every non-gothic style draws its own nine-slice border art', () => {
  const frames = new Set();
  for (const style of BUTTON_STYLES.filter(s => s !== 'gothic')) {
    const frame = buttonFrame(style);
    assert.match(frame, new RegExp(`class="cm-art cm-art-${style}"`));
    for (const pos of ['tl', 'tr', 'bl', 'br']) assert.match(frame, new RegExp(`cm-art-corner cm-${pos}`));
    assert.match(frame, /cm-left/);
    assert.match(frame, /cm-right/);
    assert.match(frame, /aria-hidden="true"/);
    frames.add(frame);
  }
  assert.equal(frames.size, BUTTON_STYLES.length - 1, 'each style has a distinct border');
});

test('gothic and unknown styles use the gothic frame', () => {
  assert.match(buttonFrame('gothic'), /cm-gothic-frame/);
  assert.match(buttonFrame('no-such-style'), /cm-gothic-frame/);
  assert.match(buttonFrame(undefined), /cm-gothic-frame/);
});

test('landing buttons render only the selected style frame and keep their icons', () => {
  const html = landingMarkup({ buttonStyle: 'iron' });
  assert.match(html, /cm-art-iron/);
  assert.doesNotMatch(html, /cm-gothic-frame|cm-art-parchment|cm-link-symbol|cm-card-corner/);
  const buttons = html.match(/class="cm-link"/g).length;
  assert.equal(html.match(/class="cm-link-icon"><svg viewBox="0 0 48 48"/g).length, buttons);
});
