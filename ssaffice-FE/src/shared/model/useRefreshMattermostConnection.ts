import { useState } from 'react'
import { useDateFormatter } from './useDateFormatter'

export const useRefreshMattermostConnection = () => {
  const [latestRefreshTime, setLatestRefreshTime] = useState<string>(
    useDateFormatter('MM월 DD일 HH:MM') as string,
  )

  const refreshMattermostConnect = async () => {
    setLatestRefreshTime('MM 연동 중...')

    await tempAPI().then((result) =>
      result === 200
        ? setLatestRefreshTime(useDateFormatter('MM월 DD일 HH:MM') as string)
        : setLatestRefreshTime('연동 오류. 다시 시도해 주세요'),
    )
  }

  const tempAPI = () => {
    // 1.5초 기다리는 비동기 로직
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(200)
      }, 1500)
    })
  }

  return { latestRefreshTime, refreshMattermostConnect }
}
