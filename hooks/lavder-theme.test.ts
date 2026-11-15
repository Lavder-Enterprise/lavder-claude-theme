import { expect, test } from 'claude-code/testing'
import type { ThemeSetArgs } from 'claude-code'

import { paletteOf, VARIANT_NAMES } from './palette'

const BRAND = '#f87016'
const TYPED = {
  origin: { kind: 'composer' },
  presentation: { isFullscreen: false, columns: 80 },
} as const

test('every variant paints on Desktop, with the brand orange as the accent', async () => {
  for (const variant of VARIANT_NAMES) {
    const { theme, problems } = paletteOf(variant)
    const dark = theme.inputs.dark as Record<string, string>

    expect(problems.filter(line => line.startsWith("Desktop won't paint"))).toEqual([])
    expect(dark['role-accent-fill']).toBe(BRAND)
    expect(dark['role-accent-300']).toBe(BRAND)
    expect(theme.inputs.light).toBe(undefined)
  }
})

test('the session starts on ink and /lavder-tema switches and remembers', async ($, on) => {
  const painted: string[] = []
  const store = new Map<string, unknown>()

  on('command.register', () => ({ value: { command: 'lavder-tema' } }))
  on('store.get', (_, e) => ({ value: store.get(e.key) }))
  on('store.set', (_, e) => {
    store.set(e.key, e.value)

    return { value: undefined }
  })
  on('theme.set', (_, e: ThemeSetArgs) => {
    painted.push(e.colors?.label ?? '')

    return { value: { isDrawn: true as const, requestId: 'theme' } }
  })
  on('session.start', (_, e) => ({ cwd: e.cwd }))

  await $.session.start({ cwd: '/', surface: 'desktop', isInteractive: true })
  expect(painted).toEqual(['Lavder'])

  const switched = await $.command.run({ command: 'lavder-tema', args: 'nero', ...TYPED })

  expect(switched.text).toBe('Tema Lavder Nero attivo.')
  expect(store.get('variant')).toBe('nero')

  const unknown = await $.command.run({ command: 'lavder-tema', args: 'blu', ...TYPED })

  expect(unknown.text).toBe('Varianti: ink, nero, caldo. Esempio: /lavder-tema nero')
  expect(painted).toEqual(['Lavder', 'Lavder Nero'])
})

test('the working row shows the Lavder mark and the row\'s words on desktop', async $ => {
  const ui = await $.ui.mount({
    plugin: 'lavder-theme',
    component: 'Spinner',
    surface: 'desktop',
    props: { word: 'Working', message: null, suffix: '…', mode: 'thinking' },
  })

  expect((await ui.find({ type: 'Svg' }))?.props.alt).toBe('Lavder')
  expect((await ui.find({ type: 'Text' }))?.text).toBe('Working…')
  await ui.unmount()
})
