// @ts-expect-error: no types
import commandScoreModule from '@superhuman/command-score'

type CommandScore = (string: string, abbreviation: string) => number

export const commandScore: CommandScore = commandScoreModule as CommandScore
