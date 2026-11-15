import type { On } from 'claude-code'

import { WORKING_MARK } from './mark'

// The row that shows while a turn runs, in the desktop app: the Lavder mark
// in place of the app's own, then the words the row would say.
export function registerSpinner(on: On): void {
  on('ui.render', { component: 'Spinner' }, ($, e, next) => {
    if (e.surface !== 'desktop') {
      return next(e)
    }
    const { Box, Text, Svg } = $.ui.resolve(e)

    return (
      <Box flexDirection="row" alignItems="center" gap={1}>
        <Svg source={WORKING_MARK} alt="Lavder" width={22} height={22} />
        <Text dimColor>{`${e.props.message ?? e.props.word}${e.props.suffix}`}</Text>
      </Box>
    )
  })
}
