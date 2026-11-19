# Live Cast — setup and data sources

## Connecting campaign characters

Open the landing scene, click **Our Cast of Characters**, then **Manage cast** as GM. The same editor is available through module settings.

A fresh world defaults to **Automatically use players’ assigned characters**. This reads each non-GM User’s native `character` assignment, includes character-type actors only, and deduplicates shared assignments. If PCs are not assigned to users, or you want a custom order, turn automatic selection off and choose actors and players. Blank slots are ignored. Add/remove controls change the manual roster; switching modes preserves the unsaved manual draft. Automatic mode shows the actual assigned roster, not stale manual rows. Duplicate or deleted actors are rejected before saving.

PC pronouns are stored on the actor as `flags.laserw1tch-landing-page-prototyper.pronouns`. Player name and pronouns use the selected native User document; update those in Foundry User Configuration. A manual player ID is only a relationship, not a copied name/pronouns string. If no player is selected, the page tries the actor’s assigned player; otherwise it displays Unassigned.

The world setting **Show cast summaries to all players** is on by default. Every player then sees each cast member’s summary card, with portrait, name, pronouns, class, the six fields below and the player line. They don’t need Observer on that actor. Opening the full character sheet from the portrait still requires Observer: for anyone else the portrait is not clickable, and the click handler rechecks permission. Foundry already sends every world actor’s data to every connected client, so this setting changes what the page displays, not what the client receives.

Turn the setting off to get the old behaviour. Then a viewer without Observer sees a locked card: name and portrait if they have Limited, otherwise “Unshared character”, and no stats. In that mode the card never reads the actor’s system data. Existing actor permissions are never changed unless the GM explicitly checks **Share selected actors with all players (Observer)**, which grants access to the entire sheet and is no longer needed for the Cast page.

## Live field mapping (D&D5e6.0.6)

| Display | Foundry source |
|---|---|
| PC name | `Actor.name` |
| PC art | `Actor.img` (actor portrait, not prototype-token art) |
| PC pronouns | Actor module flag above |
| Class / subclass | `Actor.classes`, embedded class items and their native `subclass` association |
| Level | `Actor.system.details.level` (prepared total level) |
| Max HP | `Actor.system.attributes.hp.max` |
| AC | `Actor.system.attributes.ac.value` (prepared, not raw `flat`) |
| Passive Perception | `Actor.system.skills.prc.passive` |
| Speed | `Actor.system.attributes.movement.speeds`, units; older movement shape fallback |
| Spell Save DC | `Actor.system.attributes.spell.dc` when a primary spellcasting ability is set; noncasters show — |
| Player name/pronouns | `User.name`, `User.pronouns` |

No AC/passive/DC formulas are reimplemented, no current HP is substituted for max HP, and no level/bonus snapshot is saved. Zero-valued stats remain zero. Multiclass characters display their class/subclass records and per-class levels alongside the prepared total level.

The visible Cast responds to create/update/delete hooks for Actor, Item, ActiveEffect and User documents, plus the roster setting change callback. Refreshes are coalesced to one animation frame and run only while Cast is selected. This works across connected clients without a GM-maintained snapshot. No polling or external service is used.

## Presentation

Same landing Scene/background; no new world scene is activated when one player enters Cast. Selection is per client. The full view shares the scene camera transform, including mousewheel over controls. Up to six panels per page; three-by-two at six, group centered horizontally and vertically in scene space. Portrait left, name/pronouns/class and six numeric/movement fields right, player attribution below. Clicking portrait opens the native permitted character sheet. More than six PCs paginate; Back returns to the landing with its camera retained.
