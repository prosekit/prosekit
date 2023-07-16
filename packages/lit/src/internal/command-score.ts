// @ts-expect-error: no types
import commandScoreModule from '@superhuman/command-score'

type CommandScore = (item: string, query: string) => number

export const commandScore: CommandScore = commandScoreModule as CommandScore
