import { MODULE_ID, DESTINATIONS } from './presentation.js';

// No background art ships with the module. Use the GM's chosen background if one is set.
function configuredBackground() {
  try { return game.settings.get(MODULE_ID, 'landingConfig')?.background || null; } catch { return null; }
}

let installation;

/** Explicit GM action only. Reuses flagged records and never overwrites journal content. */
export async function installLanding({ view = true } = {}) {
  if (!game.user.isGM) throw new Error('Only the Game Master can create the landing scene.');
  if (installation) return installation;
  installation = createOrRepair({ view });
  try { return await installation; } finally { installation = undefined; }
}

async function createOrRepair({ view }) {
  let folder = game.folders.find(f => f.type === 'JournalEntry' && f.getFlag(MODULE_ID, 'landingFolder'));
  if (!folder) folder = await Folder.create({ name: 'Landing Page Records', type: 'JournalEntry', flags: { [MODULE_ID]: { landingFolder: true } } });
  const journals = {};
  // Maps is a scene chooser, not a JournalEntry destination. Keep the Cast
  // placeholder for existing worlds, where it may contain authored notes.
  for (const destination of DESTINATIONS.filter(destination => !destination.special)) {
    let journal = game.journal.find(j => j.getFlag(MODULE_ID, 'destination') === destination.key);
    if (!journal) journal = await JournalEntry.create({
      name: destination.name, folder: folder.id, ownership: { default: CONST.DOCUMENT_OWNERSHIP_LEVELS.OBSERVER },
      flags: { [MODULE_ID]: { destination: destination.key } },
      pages: [{ name: destination.name, type: 'text', text: { format: CONST.JOURNAL_ENTRY_PAGE_FORMATS.HTML, content: '' } }]
    });
    else if (destination.key === 'details' && journal.name === 'Important Items, NPCs, and Other Details') {
      await journal.update({ name: destination.name });
      const page = journal.pages.contents.find(p => p.name === 'Important Items, NPCs, and Other Details');
      if (page) await page.update({ name: destination.name });
    }
    // Existing journals belong to the GM. Repair only reconnects them; it must
    // never rewrite page content authored since the last install.
    journals[destination.key] = journal.uuid;
  }
  let scene = game.scenes.find(s => s.getFlag(MODULE_ID, 'landing'));
  const background = configuredBackground();
  if (!scene) scene = await Scene.create({
    name: 'Landing Page', width: 1920, height: 1200, padding: 0,
    levels: [{ _id: 'landingPageLevel', name: 'Landing', background: { src: background } }],
    initialLevel: 'landingPageLevel',
    grid: { type: CONST.GRID_TYPES.GRIDLESS, size: 100, distance: 5, units: 'ft' },
    tokenVision: false, fog: { mode: CONST.FOG_EXPLORATION_MODES.DISABLED }, navigation: true, active: false,
    flags: { [MODULE_ID]: { landing: true, journals } }
  });
  else await scene.setFlag(MODULE_ID, 'journals', journals);
  ui.notifications.info(background ? 'The landing page is ready. Six campaign journals are linked.' : 'The landing page is ready. Six campaign journals are linked. Choose a background image in Customize landing.');
  // Activate (not just view) so the landing is what everyone sees at login.
  // Activating also moves connected players to it.
  if (view) {
    if (!scene.active) await scene.activate();
    else await scene.view();
  }
  return { scene, journals };
}
