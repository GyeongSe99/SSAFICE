import { ReactNode } from 'react'

export type CreatedBySummary = {
  userId: number
  email: string
  name: string
  profileImgUrl: string
}

export type NoticeSummary = {
  noticeId: number
  title: string
  content: string
  createdAt: string
  startDateTime: string
  endDateTime: string
  isEssentialYn: string
  noticeTypeCd: string
  createUser: CreatedBySummary
}

export type TaskResponse = {
  scheduleId: number
  title: string
  createdAt: string
  startDateTime?: string
  endDateTime: string
  scheduleSourceTypeCd: string
  scheduleStatusTypeCd: string
  isEssentialYn: string
  isEnrollYn: string
  chargeUser: {
    userId: number
    email: string
    name: string
    profileImgUrl: string
  }
  createUser: {
    userId: string
    email: string
    name: string
    profileImgUrl: string
  }
  noticeSummary: NoticeSummary | null
}

export type CardColumnResponse = {
  children: ReactNode
  id: string
  label: string
  columnLength: number
}
