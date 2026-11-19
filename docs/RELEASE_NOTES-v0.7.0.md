# Release notes — v0.7.0

First release under the module ID `laserw1tch-landing-page-prototyper`.

## Breaking: new module ID

- Foundry treats this as a new module. Earlier installs are not upgraded in place. Install this module fresh, disable and uninstall the earlier one, then run **Create / Repair Landing**. That creates a new landing scene and six blank journals.
- Records made by earlier versions stay in the world unchanged but are not linked. These are the scene, the journals, the cast roster and the PC pronouns. Reconnect or copy their content by hand.

## Cast page

- New world setting **Show cast summaries to all players**, on by default. Every player sees each cast member's summary card without needing Observer on other characters. Opening the full character sheet still requires Observer, and portraits of other characters are not clickable.
- Turning the setting off restores locked cards for unshared characters.

## Landing scene

- The module no longer bundles a background image. Choose your own in **Customize landing**. The scene is 1920×1200.
- The Gothic button style now uses an original vector frame drawn for this module. The module ships no image files.
- New default names: scene "Landing Page", journal folder "Landing Page Records".

## Fonts

- The module no longer bundles any fonts. The landing defaults to Foundry's built-in Modesto Condensed (title) and Amiri (buttons and Cast).
- **Customize landing** lists every font Foundry has loaded, and notes that you can add your own under **Configure Settings → Core → Additional Fonts**.
- A previously chosen font that is no longer available falls back to the default.

## Checks

- Automated Node tests: 23/23 passed.
- Release ZIP built with `scripts/package.py`; the archive was integrity-checked and its exclusions verified.
