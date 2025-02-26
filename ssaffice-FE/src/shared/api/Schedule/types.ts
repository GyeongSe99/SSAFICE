type RemindRequest = {
  remindTypeCd: string
  remindDateTime: string
}

export type postScheduleResponse = {
  title: string
  memo: string
  scheduleStatusTypeCd: string
  startDateTime: string
  endDateTime: string
  remindRequests: RemindRequest[] | []
}

type postManagerScheduleProps = {
  createData: {
    title: string
    memo: string
    scheduleStatusTypeCd: string
    startDateTime: string
    endDateTime: string
    remindRequests: RemindRequest[] | []
  }
}
export type postManagerScheduleResponse = {
  createData: postManagerScheduleProps
  userIds: number[]
}

export type putTraineeScheduleResponse = {
  title?: string
  memo?: string
  scheduleStatusTypeCd?: string
  startDateTime?: string
  endDateTime?: string
  enrollYn?: string
}
