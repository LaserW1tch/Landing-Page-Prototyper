# LaserW1tch's Landing Page Prototyper 5e

A customizable gothic landing scene for **Foundry VTT 14** (verified on 14.370). The landing overlay anchors to scene coordinates, so its title, borders and buttons zoom and pan with the background. Gothic buttons use an original vector frame drawn for this module over a transparent background. The live Cast page uses a separate readable typeface and live actor data. The landing offers these destinations:

1. The Story So Far
2. Our Cast of Characters
3. Important Items, NPCs, and Details
4. The Graveyard
5. Rules
6. Quest Log
7. Maps (configured Scene links)

Journal destinations are installed with blank pages for the GM to author. Rebuilding the landing reconnects existing journals without changing their pages or content. Cast opens the live character gallery; Maps opens configured Scenes for the current client.

## Preview

With the preview server running, open **http://localhost:5174/preview.html**. Each card opens a preview of its destination. This browser preview is not the Foundry runtime.

Add `?style=` (`gothic`, `parchment`, `etched`, `arcane`, `minimal` or `iron`) to preview a button appearance, `&bg=light` or `&bg=busy` to check it over a light or busy background, `&glow=%23ff9f43` to try a hover glow colour, and `&backing` to show Gothic's optional backing.

To start it manually from this directory:

```sh
python3 -m http.server 5174 --bind 0.0.0.0
```

## Foundry installation

This module has **no third-party/community dependencies** and no additional module dependencies. FXMaster is optional. The live Cast statistics target **D&D5e 6.0.6 and 6.1.0**; the landing itself uses core Foundry. It uses a real Foundry Scene, standard JournalEntry documents, ordinary document permissions and core journal sheets. The module supplies the scene-anchored navigation, live Cast view and explicit GM setup actions. It supplies the single-click, keyboard-accessible navigation; custom card navigation is not built into core Foundry.

1. Copy this directory into `Data/modules/laserw1tch-landing-page-prototyper/`, keeping `module.json` directly inside that folder. Alternatively extract the supplied release ZIP into `Data/modules/`.
2. Restart Foundry to discover the module.
3. Open the desired world and enable **LaserW1tch's Landing Page Prototyper 5e** in Manage Modules.
4. Open Configure Settings → LaserW1tch's Landing Page Prototyper 5e → **Create / Repair Landing**.
5. The action creates one landing scene, one journal folder and six blank journals. It then **activates** the landing scene, so everyone sees it at login. Connected players are moved to it.
6. Single-click a card or Tab to it and press Enter/Space. Cast opens the live gallery; journal buttons open their blank journals; Maps shows configured Scene links.
7. On Cast, the GM can use **Manage cast** to choose actors, their order, players and PC pronouns. By default, a fresh world uses non-GM players’ assigned characters automatically. See [Cast setup and live fields](docs/CAST.md).

For The Forge, install using the manifest URL in `module.json`, restart the server, enable the module, then run Create / Repair Landing in the destination world.

Alternative GM setup: paste `scripts/open-landing-macro.js` into a Script Macro, or execute:

```js
await game.modules.get('laserw1tch-landing-page-prototyper').api.install();
```

The action can be run again: it reuses flagged records, repairs missing destinations, and preserves existing journal content, permissions and scene customisation. It never overwrites an unrelated scene. Newly created journals are **Observer for all players**; restrict individual journals in Foundry when appropriate. The menu and macro are GM-only.

## Live Cast page

The six-panel reference layout is implemented as a centered group of up to three columns and two rows. Fewer characters remain centered; more than six paginate. Art comes from each actor’s portrait. Names, class/subclass, level, max HP, AC, passive perception, movement and primary spell DC read the current prepared actor data; there is no stat snapshot or second calculation. Actor/item/effect updates refresh the open view. Native User updates refresh the player name/pronouns line. PC pronouns live in the actor’s module flag and can be edited through Manage cast. Clicking a portrait opens its character sheet. Return to the village preserves the shared background and camera.

The GM can alternatively open **Configure Settings → LaserW1tch's Landing Page Prototyper 5e → Cast members and PC pronouns**. Connect your actual character actors and Foundry users there. By default (**Show cast summaries to all players**), every player sees all cast summary cards without needing Observer permission on other PCs. Only the full character sheet, opened from the portrait, requires Observer. Use the explicit sharing option only if you want everyone to be able to open the full sheets; otherwise existing actor permissions are preserved. Turn the setting off to show locked cards for unshared actors.

New worlds do not create any demo characters or players.

## Editing and recovery

- Edit journal contents normally in Foundry. Do not delete module flags unless intentionally detaching a record.
- The navigation displays only on the flagged landing scene. Switching scenes removes it.
- Foundry shows everyone the world’s **active** scene at login. Create / Repair activates the landing. If you later activate another scene (such as a battle map), activate the landing again from the Scenes sidebar, or run Create / Repair, to bring everyone back.
- The landing illustration is initially framed to fill the viewport. The entire overlay follows native scene zoom and pan, including mousewheel zoom over the cards. Camera zoom does not reflow or detach the layout. Foundry’s central pause graphic is hidden on this scene only; the world’s actual paused state is preserved.
- Selected background images and videos are assigned to the Foundry Scene itself. The landing UI does not place a second HTML background over the canvas, so canvas effects such as FXMaster particles and filters can render with the scene. FXMaster is optional and is not a module dependency.
- To temporarily hide the navigation while editing the scene, disable **Show landing navigation** in the module’s client settings. This affects your client only.
- Disabling the module removes its interactive overlay but preserves the Scene and all journals. Players can still open shared records from the Journal sidebar. Re-enable it to restore the cards.
- No fonts are bundled. The landing uses Foundry’s built-in fonts: Modesto Condensed for the title and Amiri for buttons and the Cast page. In **Customize landing** you can pick any font Foundry has loaded. For more variety, download fonts you’re licensed to use and add them under **Configure Settings → Core → Additional Fonts**. The module makes no network font requests.
- **Button appearance** (Customize landing) offers six styles. Gothic is transparent over the scene. Parchment (deckled paper ruled in ink), Etched (smoked-glass plate with an engraved, milled border), Arcane (a sigil panel lit by the hover-glow colour), Minimal (frosted pane with corner brackets) and Iron (a chamfered plate in a riveted strap) each carry their own backing, so they stay readable over any background image. Gothic has an optional **Faint backing behind Gothic buttons** checkbox for light or busy backgrounds. Every style keeps the same line-art icons and draws its own original vector border.
- **Small screens.** The layout is sized for Foundry's minimum supported window, 1366×768. At that size the scene is drawn at about 71%: everything stays readable, and the landing buttons and Cast page sit clear of Foundry's controls, hotbar, players list and chat input. The landing draws beneath Foundry's own interface, so Foundry's controls always stay clickable. An expanded chat sidebar covers the right side of any scene, including the landing; collapse it to reach buttons underneath.
- The design uses static moonlight, restrained aged-brass accents and accessible hover/focus states. It includes no autoplay audio, flashing or required animation.

## Files and validation

- `module.json`, `scripts/module.js`: Foundry entry point and navigation lifecycle.
- `scripts/installer.js`: explicit, repeat-safe GM installer.
- `scripts/cast-data.js`, `cast-page.js`, `cast-config.js`, `styles/cast.css`: live actor/user projection, centered panels and GM roster editor.
- `scripts/scene-transform.js`: camera-to-DOM registration shared by landing and Cast.
- `scripts/presentation.js`, `styles/landing.css`: shared design, exact link names and original vector icons.
- `preview.html`: interactive standalone design preview.
- `tests/`: Node unit tests for Cast data, landing fonts, the installer and the camera transform.

Run `npm test` (no dependencies or installation needed). The release ZIP contains only runtime files and instructions.

Rebuild the manual-install ZIP with `python3 scripts/package.py`. Nothing is published automatically.

## Sources

Foundry: [Scenes](https://foundryvtt.com/article/scenes/), [Journal Entries](https://foundryvtt.com/article/journal/), [V14 API](https://foundryvtt.com/api/v14/).

No background artwork, campaign text or official logos are included. Choose your own landing background in **Customize landing**; it is applied to the Foundry Scene. The scene is 1920×1200, so art at that aspect ratio fits best.
