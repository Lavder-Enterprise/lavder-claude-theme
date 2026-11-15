# lavder-theme

The Lavder look for the Claude desktop and mobile apps: the brand's ink black with Lavder orange as the accent. Dark only.

## Colors

All values are the Lavder brand tokens, the same ones lavder.com paints with.

| Role | Color |
| --- | --- |
| Accent: buttons, links, focus, switches | brand `#F87016`, hover brand-dark `#D05A0E` |
| Conversation | ink `#111113` |
| Text | neutral `#FAFAFA`, `#D4D4D8`, `#A1A1AA` |
| Error, success, warning, info | `#EF4444`, `#22C55E`, `#EAB308`, `#3B82F6` |

Every text color is at least 4.9:1 on every surface (WCAG AA).

## Blacks

`/lavder-tema ink` (default, conversation `#111113`), `/lavder-tema nero` (true black), `/lavder-tema caldo` (warm black). The choice is remembered across sessions.

## Install

At the prompt of a terminal session:

```
/plugin install lavder-theme --marketplace Lavder-Enterprise/lavder-claude-theme
```

From a shell:

```bash
claude plugin install lavder-theme --marketplace Lavder-Enterprise/lavder-claude-theme
```

In the desktop app: click + next to the prompt box, then Plugins, Add marketplace with `Lavder-Enterprise/lavder-claude-theme`, then Add plugin.

Answer `y` to add the marketplace and pick the user scope. The theme is drawn in each session started after that.

## What the mod does

It sets the app's colors at session start and registers the `/lavder-tema` command. It stores one value, the chosen black. It reads no files, runs no processes, makes no network calls and hooks no tool calls.

## Changing the colors

The values are in `hooks/palette.ts`. `hooks/make-colors.js` is generated from Claude's design system and copied unchanged from the `plugin-authoring` skill: copy it again when the app updates.

## License

Copyright Lavder Enterprise S.R.L. All rights reserved. "Lavder" and its brand colors identify Lavder Enterprise.
