import { announcementDataEmojiSelectExpression } from './regularExpressions'

export const useCustomEmojiRemover = (message: string): string => {
  return message.replace(announcementDataEmojiSelectExpression, '')
}
