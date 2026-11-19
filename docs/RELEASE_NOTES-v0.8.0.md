# Release notes — v0.8.0

## Rebuilt button appearances

- **Parchment, Etched, Arcane, Minimal and Iron** are rebuilt from scratch. Each has its own look and an original line-art border that suits its name. The line-art icons on the buttons are unchanged.
  - **Parchment:** a deckled paper sheet ruled in ink, with a small flourish at top and bottom.
  - **Etched:** a smoked-glass plate with an engraved border around a milled band.
  - **Arcane:** a sigil panel lit by your hover-glow colour, with a rune band and a triple-moon centrepiece.
  - **Minimal:** a frosted pane with a hairline and corner brackets that spread apart on hover.
  - **Iron:** a chamfered, brushed plate bound by a riveted strap.
- Each of these styles has its own backing, so the buttons stay readable over any background image, light or dark.
- Removed visual leftovers from earlier versions: a stray arrow glyph under each label, an old shared panel and a mismatched hover outline.

## Gothic

- Long labels such as "Important Items, NPCs, and Details" no longer run into the frame ornaments.
- New option in **Customize landing**: **Faint backing behind Gothic buttons**. It's off by default. Turn it on if the text is hard to read over a light or busy background.

## Foundry's minimum window (1366×768)

- The landing and the Cast page are sized to fit Foundry's minimum supported window.
- The landing now draws beneath Foundry's own interface, so Foundry's controls, hotbar, players list and chat always stay on top and clickable.
- The landing buttons sit higher, clear of the hotbar, players list and chat input.
- The Cast page title and Back button are fully on screen. **Previous / Next** and the page count are now in the header, so they're always visible with more than six characters. The cards are slightly shorter, so two rows fit above the hotbar.

## Maps

- On a map opened from the Maps button, **Back to landing page** stays fixed at the top centre of the screen, however the map is panned or zoomed.
- Maps now open with their own default view instead of being stretched to fill the window.
- The map choice buttons have larger text.

## Landing scene loads at login (first published here; prepared as 0.7.1)

- **Create / Repair Landing** now *activates* the landing scene instead of only viewing it. Foundry shows everyone the active scene at login, so the landing loads every time, without a blank screen or re-running setup.
- Activating moves any connected players to the landing. The Create / Repair dialog says so before you confirm.

## Preview

- `preview.html` now shows the selected style. You can add `?style=`, `&bg=light` or `&bg=busy`, `&glow=` and `&backing`.

## Checks

- Automated Node tests: 29/29 passed.
- Checked in a local Foundry 14.370 world (D&D5e 6.1.0) at 1366×768:
  - the landing in all six styles, including hover;
  - the Cast page and its Back button;
  - opening a journal from the landing;
  - both configured maps, with their Back button before and after panning and zooming.
