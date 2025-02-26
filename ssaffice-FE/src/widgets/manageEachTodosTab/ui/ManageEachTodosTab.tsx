import { CalendarIcon, EditIcon } from '@/assets/svg'
import { SelectTodoSortCondition } from '@/features/todoTab/ui/SelectTodoSortCondition'
import { CommonModal, HoverButton, RefreshMattermostConnection, SelectDateRange } from '@/shared/ui'
import { AnnouncementList } from '@/widgets/announcementTab'
import { SelectTodoState } from '@/shared/ui'
import { useEffect, useRef, useState } from 'react'
import { ManageEachTodoList } from './ManageEachTodoList'
import { useSelectDateRange } from '@/shared/model/useSelectDateRange'
import { useApiParamFormatter } from '@/shared/model'

export const ManageEachTodosTab = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const close = () => setIsModalOpen(false)
  const [page, setPage] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      if (containerRef.current) {
        const { scrollTop, scrollHeight, clientHeight } = containerRef.current
        // console.log(scrollTop, scrollHeight, clientHeight)
        if (scrollTop + clientHeight >= scrollHeight) {
          setPage && setPage((prevPage: number) => prevPage + 1)
        }
      }
    }

    const container = containerRef.current
    container?.addEventListener('scroll', handleScroll)

    return () => {
      container?.removeEventListener('scroll', handleScroll)
    }
  }, [setPage])

  // event
  const handleOnClickCalendar = () => {
    // console.log('나중엔 캘린더가 열림')
  }

  const handleOnClickCreateTodo = () => {
    setIsModalOpen(true)
  }

  // states
  const [selectedState, setSelectedState] = useState('default')
  const [selectedSort, setSelectedSort] = useState('by deadline')
  const { selectedDate, handleSelectedDate, fixedDate, handleFixedDate } = useSelectDateRange()

  return (
    <>
      <div className='flex w-full h-full gap-spacing-32 px-spacing-64'>
        {/* 왼쪽 영역 */}
        <div
          className='
        flex flex-col gap-spacing-24 
        p-spacing-32 w-[640px] h-full 
        bg-color-bg-secondary
        '
        >
          <div className='text-color-text-primary heading-desktop-xl'>전체 공지</div>
          <RefreshMattermostConnection />
          <div className='h-[800px] px-spacing-16 bg-color-bg-tertiary overflow-y-scroll'>
            <AnnouncementList page={page} searchValue='' />
          </div>
        </div>

        {/* 오른쪽 영역 */}
        <div
          className='
        flex flex-col gap-spacing-24 
        p-spacing-32 w-[640px] h-full 
        bg-color-bg-secondary
        '
        >
          <div className='flex justify-between text-color-text-primary heading-desktop-xl'>
            <div>개인별 할 일 관리</div>

            <div className='flex gap-spacing-16'>
              <HoverButton
                icon={<CalendarIcon className='w-6' />}
                tooltip='캘린더'
                onClickEvent={handleOnClickCalendar}
              />
              <HoverButton
                icon={<EditIcon className='w-6' />}
                tooltip='할 일 등록'
                onClickEvent={handleOnClickCreateTodo}
              />
            </div>
          </div>
          <div className='flex flex-col gap-spacing-16'>
            <div className='flex gap-spacing-16'>
              <SelectTodoState
                actionType='managerList'
                selectedState={selectedState}
                setSelectedState={setSelectedState}
              />
              <SelectTodoSortCondition
                selectedSort={selectedSort}
                setSelectedSort={setSelectedSort}
              />

              <SelectDateRange
                selectedDate={selectedDate}
                handleSelectedDate={handleSelectedDate}
                handleFixedDate={handleFixedDate}
              />
            </div>
            <div className='h-[800px] px-spacing-16 bg-color-bg-tertiary overflow-y-scroll'>
              {fixedDate.from && fixedDate.to && (
                <ManageEachTodoList
                  startDate={fixedDate.from}
                  endDate={fixedDate.to}
                  selectedSort={useApiParamFormatter('SelectTodoSortCondition', selectedSort)}
                  selectedState={selectedState}
                />
              )}
            </div>
          </div>
        </div>
      </div>
      <CommonModal
        name='ManagerTodo'
        modaltype='CREATE'
        manageType='PERSONAL'
        opened={isModalOpen}
        closeRequest={close}
        isBackdropCloseRequest={false}
      />
    </>
  )
}
