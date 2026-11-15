import type { EngineInterface, Register } from 'claude-code'

import { isVariant, paletteOf, VARIANT_NAMES } from './palette'
import type { Variant } from './palette'

const COMMAND = 'lavder-tema'
const DEFAULT: Variant = 'ink'

async function paint($: EngineInterface, variant: Variant): Promise<string> {
  const { theme, problems } = paletteOf(variant)
  const unpainted = problems.find(line => line.startsWith("Desktop won't paint"))

  if (unpainted !== undefined) {
    return unpainted
  }
  const set = await $.theme.set({ colors: theme })

  return set.isDrawn ? `Tema ${theme.label} attivo.` : set.reason
}

export const register: Register = on => {
  on('session.start', async ($, e, next) => {
    await $.command.register({
      name: COMMAND,
      description: 'Cambia il nero del tema Lavder',
      argumentHint: VARIANT_NAMES.join(' | '),
    })
    const stored = await $.store.get('variant')

    await paint($, isVariant(stored) ? stored : DEFAULT)

    return next(e)
  })

  on('command.run', { command: COMMAND }, async ($, e) => {
    const asked = e.args.trim().toLowerCase()

    if (!isVariant(asked)) {
      return { text: `Varianti: ${VARIANT_NAMES.join(', ')}. Esempio: /${COMMAND} nero` }
    }
    await $.store.set('variant', asked)

    return { text: await paint($, asked) }
  })
}
