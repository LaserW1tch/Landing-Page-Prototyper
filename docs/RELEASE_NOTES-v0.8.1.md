# Release notes — v0.8.1

## No zoom-in on load

- The landing no longer zooms in to fill the screen each time it loads. It opens at Foundry's normal view, which shows the whole background image with nothing cropped.
- Maps opened from the Maps button also keep Foundry's normal view (unchanged from 0.8.0).

## Buttons back near the bottom

- The landing buttons sit near the bottom of the background image again.
- At 1920×1080 and larger, Foundry's hotbar sits below the image. At the minimum 1366×768 window, only the buttons' lower frame edge meets the hotbar; the labels stay clear and every button stays clickable.

## Cast page

- The Cast page uses the full image. Its text is about 25% larger, so it stays readable at Foundry's normal view, including at 1366×768.

## Checks

- Automated Node tests: 29/29 passed.
- Checked in a local Foundry 14.370 world (D&D5e 6.1.0) at 1366×768:
  - the landing: whole image visible, buttons readable and clickable;
  - the Cast page: no clipping and no overlap with Foundry's interface.
