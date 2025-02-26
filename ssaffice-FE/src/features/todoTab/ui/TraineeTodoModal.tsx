import { useEffect, useMemo, useState } from 'react'
import { TraineeTodoFirstElements } from '../model/TraineeTodoFirstElements'
import { postTraineeSchedule } from '@/shared/api/Schedule'
import { TodoModal } from '@/shared/ui'

type TraineeTodoModalProps = {
  closeRequest: () => void
  modaltype: 'CREATE' | 'VIEW' | 'EDIT'
  scheduleId: number
}

export const TraineeTodoModal = ({
  closeRequest,
  modaltype,
  scheduleId,
}: TraineeTodoModalProps) => {
  const elements = TraineeTodoFirstElements({ modaltype, scheduleId })

  const [modalType, setModalType] = useState(modaltype)
  const [title, setTitle] = useState(elements.title)
  const [description, setDescription] = useState(elements.description)
  const [selectedState, setSelectedState] = useState(elements.selectedState)
  const [endDate, setEndDate] = useState(elements.endDate)
  const [reminder, setReminder] = useState(elements.remindRequests)

  useEffect(() => {
    if (modalType === 'CREATE') return
    if (title) return

    setTitle(elements.title)
    setDescription(elements.description)
    setSelectedState(elements.selectedState)
    setEndDate(elements.endDate)
    setReminder(elements.remindRequests)
  }, [elements])

  const headTitle = useMemo(() => {
    switch (modalType) {
      case 'CREATE':
        return '할 일 등록'
      case 'VIEW':
        return null
      case 'EDIT':
        return '할 일 수정'
    }
  }, [modalType])

  const handleOnClickSave = () => {
    if (!title) {
      return
    }

    const startDateTime = `${new Date().toISOString().split('T')[0]}T00:00:00`
    const endDateTime = endDate ? `${endDate}T23:59:59` : ''

    const createData = {
      title: title,
      memo: description,
      startDateTime: startDateTime,
      endDateTime: endDateTime,
      remindRequests: reminder,
      scheduleStatusTypeCd: selectedState,
    }
    postTraineeSchedule(createData)
    closeRequest()
    window.location.reload()
  }

  const handleOnClickEdit = () => {
    setModalType('EDIT')
  }

  const handleOnClickEditSave = () => {
    // 일정 수정 사항 검사 후 있으면 api 보내기
    // console.log(scheduleId, title, description, selectedState, endDate, reminder)
    setModalType('VIEW')
    // 수정사항 없으면 그냥 view로 변경
  }

  return (
    <TodoModal modaltype={modalType}>
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
          <TodoModal.Status selectedState={selectedState} setSelectedState={setSelectedState} />
          <TodoModal.Button
            saveRequest={handleOnClickSave}
            editRequest={handleOnClickEdit}
            saveEditRequest={handleOnClickEditSave}
          />
        </TodoModal.Flex>

        <TodoModal.DetailsSection>
          <TodoModal.Assignee
            user={elements.user}
            userType='trainee'
            userIds={[]} // type error 방지를 위해 빈 배열 전달
            setUserIds={() => []}
          />
          <TodoModal.Manager
            user={elements.user}
            createUser={elements.createUser}
            userType='trainee'
          />
          <TodoModal.EndDate endDate={endDate} setEndDate={setEndDate} />
          <TodoModal.Reminder reminder={reminder} setReminder={setReminder} />
        </TodoModal.DetailsSection>
      </TodoModal.RightSection>
    </TodoModal>
  )
}
