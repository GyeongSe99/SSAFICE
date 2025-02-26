import { useMemo, useState } from 'react'
import { ManagerTodoFirstElements } from '../model/ManagerTodoFirstElements'
import { TodoModal } from '@/shared/ui'
import { postManagerSchedule, postManagerTeamSchedule } from '@/shared/api/Schedule'

type RemindRequest = {
  remindTypeCd: string
  remindDateTime: string
}

type ManagerTodoModalProps = {
  closeRequest: () => void
  modaltype: 'CREATE' | 'VIEW' | 'EDIT'
  manageType: 'TEAM' | 'PERSONAL' | undefined
}

export const ManagerTodoModal = ({
  closeRequest,
  modaltype,
  manageType,
}: ManagerTodoModalProps) => {
  const elements = ManagerTodoFirstElements(modaltype)

  const [title, setTitle] = useState(elements.title)
  const [description, setDescription] = useState(elements.description)
  // const [selectedState, setSelectedState] = useState(elements.selectedState)
  const [endDate, setEndDate] = useState(elements.endDate)
  const [reminder, setReminder] = useState(elements.remindRequests)
  const [userIds, setUserIds] = useState<number[]>([])
  const [isRequired, setIsRequired] = useState(elements.isEssentialYn)

  const headTitle = useMemo(() => {
    switch (modaltype) {
      case 'CREATE':
        return '할 일 등록'
      case 'VIEW':
        return null
    }
  }, [modaltype])

  const handleOnClickSave = () => {
    if (!title || userIds.length === 0) {
      return
    }

    const startDateTime = `${new Date().toISOString().split('T')[0]}T00:00:00`
    const endDateTime = `${endDate}T23:59:59`

    if (manageType === 'PERSONAL') {
      const createData = {
        title: title,
        memo: description,
        startDateTime: startDateTime,
        endDateTime: endDateTime,
        scheduleStatusTypeCd: 'TODO',
        remindRequests: reminder as RemindRequest[],
      }
      postManagerSchedule({ createData, userIds })
    } else {
      const createData = {
        title: title,
        content: description,
        startDateTime: startDateTime,
        endDateTime: endDateTime,
        noticeTypeCd: 'TEAM',
        isEssentialYn: isRequired,
        channelId: '4c96tn5s63bbmnjxuqress7j4r',
      }
      postManagerTeamSchedule(createData)
    }

    closeRequest()
  }

  return (
    <TodoModal modaltype={modaltype}>
      <TodoModal.LeftSection>
        <div className='flex items-center gap-x-spacing-10 mb-spacing-16'>
          <TodoModal.ExitButton closeRequest={closeRequest} />
          <h1 className='heading-desktop-lg text-color-text-primary'>{headTitle}</h1>
        </div>
        <TodoModal.Title title={title} setTitle={setTitle}>
          {title}
        </TodoModal.Title>
        <TodoModal.Description description={description} setDescription={setDescription}>
          {description}
        </TodoModal.Description>
      </TodoModal.LeftSection>

      <TodoModal.RightSection>
        <TodoModal.Flex>
          {/* <TodoModal.Status selectedState={selectedState} setSelectedState={setSelectedState} /> */}
          <TodoModal.Button saveRequest={handleOnClickSave} />
        </TodoModal.Flex>

        <TodoModal.DetailsSection>
          <TodoModal.Assignee
            manageType={manageType}
            user={elements.user}
            userType='manager'
            userIds={userIds}
            setUserIds={setUserIds}
          />
          <TodoModal.Manager
            user={elements.user}
            createUser={elements.createUser}
            userType='manager'
          />
          <TodoModal.EndDate endDate={endDate} setEndDate={setEndDate} />

          {manageType === 'PERSONAL' ? null : (
            <TodoModal.Required isRequired={isRequired} setIsRequired={setIsRequired} />
          )}

          {manageType === 'PERSONAL' ? (
            <TodoModal.Reminder reminder={reminder} setReminder={setReminder} />
          ) : null}
        </TodoModal.DetailsSection>
      </TodoModal.RightSection>
    </TodoModal>
  )
}
