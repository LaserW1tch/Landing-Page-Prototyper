# Release notes — v0.7.1

## Landing scene loads at login

- **Create / Repair Landing** now *activates* the landing scene instead of only viewing it. Foundry shows everyone the active scene at login, so the landing loads every time, without a blank screen or re-running setup.
- Activating moves any connected players to the landing. The Create / Repair dialog says so before you confirm.
- If the landing is already active, Create / Repair takes you to it without activating it again.

## Checks

- Automated Node tests: 24/24 passed.
- Owner tested in a local Foundry world and confirmed the fix.
