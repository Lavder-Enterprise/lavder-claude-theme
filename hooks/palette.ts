import type { ThemeColors } from 'claude-code'

import { makeColors } from './make-colors.js'

// Every value is a Lavder brand token, the same ones lavder.com paints with: brand #F87016, brand-dark #D05A0E,
// ink #111113, the neutral ramp and the semantic colors.
const BRAND = '#F87016'
const BRAND_DARK = '#D05A0E'

const roles = {
  // Stop 300 is the accent text, the focus ring and the filled controls: the
  // brand orange itself, with ink on it. Stop 250 is the hover: brand-dark.
  accent: { seed: BRAND, stops: { 250: BRAND_DARK, 300: BRAND }, fillShade: 300 },
  danger: '#EF4444',
  success: '#22C55E',
  warning: '#EAB308',
  pro: { seed: '#3B82F6', stops: { 400: '#2E7AF0' } },
}

const git = {
  added: '#4ADE80',
  removed: '#F87171',
  modified: '#FACC15',
  merged: '#C4A7FF',
  closed: '#FF7A72',
  conflicting: '#FF8A3D',
  draft: '#B4B4BB',
}

type Anchors = {
  'surface-0': string
  'surface-1': string
  'surface-2': string
  'surface-3': string
  'text-primary': string
  'text-secondary': string
  'text-muted': string
}

const NEUTRAL_TEXT = {
  'text-primary': '#FAFAFA',
  'text-secondary': '#D4D4D8',
  'text-muted': '#A1A1AA',
}

// What each anchor paints in the desktop app (measured on screenshots):
// surface-0 the sidebar, surface-1 the conversation, surface-2 the side
// panels, surface-3 the message box and menus. So ink sits on surface-1.
const VARIANTS = {
  // The brand's own black: the conversation is ink #111113.
  ink: {
    label: 'Lavder',
    code: 'ayu-dark',
    anchors: {
      'surface-0': '#0C0C0E',
      'surface-1': '#111113',
      'surface-2': '#17171A',
      'surface-3': '#1E1E21',
      ...NEUTRAL_TEXT,
    },
  },
  // True black (ink-pure) for the sidebar and the conversation.
  nero: {
    label: 'Lavder Nero',
    code: 'ayu-dark',
    anchors: {
      'surface-0': '#000000',
      'surface-1': '#000000',
      'surface-2': '#0C0C0E',
      'surface-3': '#141416',
      ...NEUTRAL_TEXT,
    },
  },
  // Ink pulled toward the orange: a warm black with warm paper text.
  caldo: {
    label: 'Lavder Caldo',
    code: 'vitesse-dark',
    anchors: {
      'surface-0': '#0F0D0B',
      'surface-1': '#141210',
      'surface-2': '#1B1815',
      'surface-3': '#221E1A',
      'text-primary': '#FBF8F4',
      'text-secondary': '#DAD3CB',
      'text-muted': '#A89F96',
    },
  },
} satisfies Record<string, { label: string; code: string; anchors: Anchors }>

export type Variant = keyof typeof VARIANTS

export const VARIANT_NAMES = Object.keys(VARIANTS) as Variant[]

export const isVariant = (value: unknown): value is Variant =>
  typeof value === 'string' && value in VARIANTS

export function paletteOf(variant: Variant): { theme: ThemeColors; problems: string[] } {
  const { label, code, anchors } = VARIANTS[variant]

  return makeColors({
    label,
    only: 'dark',
    roles,
    dark: { gray: { anchors }, git },
    // The app's own code themes: these two put orange or earth tones on a
    // near-black ground, where the default has violet keywords.
    codeTheme: { dark: code },
    // On true black the hairlines need the stronger setting to stay visible.
    ...(variant === 'nero' && { contrast: 'more' as const }),
  })
}
