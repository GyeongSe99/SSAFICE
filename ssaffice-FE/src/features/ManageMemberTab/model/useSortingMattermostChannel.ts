import { ChannelSummary } from '@/features/todoTab'
import { MattermostTeam } from './types'

export const useSortingMattermostChannel = (channel: ChannelSummary[]): MattermostTeam[] => {
  const sorted: Record<string, MattermostTeam> = {}

  channel.forEach((each) => {
    if (!sorted[each.mmTeamId])
      sorted[each.mmTeamId] = {
        teamId: each.mmTeamId,
        name: each.mmTeamName,
        channels: [
          {
            channelId: each.channelId,
            name: each.channelName,
          },
        ],
      }
    else
      sorted[each.mmTeamId].channels.push({
        channelId: each.channelId,
        name: each.channelName,
      })
  })

  const result: MattermostTeam[] = []
  Object.keys(sorted).forEach((each) => {
    result.push(sorted[each])
  })

  return result
}
