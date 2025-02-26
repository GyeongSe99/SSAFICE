import { useRef, useState } from 'react'
import { TodoList } from './TodoList'
import { TodoBoard } from './TodoBoard'

import { HoverTitle } from '@/features/todoTab'
import { useApiParamFormatter, useIsTabOpenStore } from '@/shared/model'
import {
  TabLayout,
  HoverButton,
  SelectTodoState,
  SelectDateRange,
  useElementOverflow,
} from '@/shared/ui'
import { CommonModal } from '@/shared/ui'
import { HamburgerMenuIcon, FastLeftArrowIcon, EditIcon } from '@/assets/svg'
import { SelectTodoSortCondition } from '@/features/todoTab/ui/SelectTodoSortCondition'
import { useSelectDateRange } from '@/shared/model/useSelectDateRange'

export const TodoTab = () => {
  // store
  const isTabOpen = useIsTabOpenStore()

  // hook
  const overflowRef = useRef<HTMLDivElement>(null)
  const { isOverflow, overflowCalcTrigger } = useElementOverflow({
    ref: overflowRef,
    isHeight: true,
  })

  // state
  const [isModalOpen, setIsModalOpen] = useState(false)
  const close = () => setIsModalOpen(false)
  const [selectedState, setSelectedState] = useState('default')
  const [selectedSort, setSelectedSort] = useState('by deadline')

  const handleOnClickCreateTodo = () => {
    setIsModalOpen(true)
  }

  const { selectedDate, handleSelectedDate, fixedDate, handleFixedDate } = useSelectDateRange()

  return (
    <>
      <TabLayout>
        <TabLayout.Header>
          <div className='flex justify-between w-full'>
            <HoverTitle
              mouseOverIcon={<FastLeftArrowIcon className='w-6 rotate-180' />}
              mouseOutIcon={<HamburgerMenuIcon className='w-6' />}
              title='할 일'
            />
            <div className='flex items-center gap-x-spacing-16'>
              {/* <HoverButton
                icon={<CalendarIcon className='w-6' />}
                tooltip='캘린더'
                onClickEvent={handleOnClickCalendar}
              /> */}
              <HoverButton
                icon={<EditIcon className='w-6' />}
                tooltip='할 일 등록'
                onClickEvent={handleOnClickCreateTodo}
              />
            </div>
          </div>
        </TabLayout.Header>
        {isTabOpen ? (
          <TabLayout.Add>
            <div className='flex gap-spacing-16'>
              <SelectTodoState
                selectedState={selectedState}
                setSelectedState={setSelectedState}
                actionType='list'
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
          </TabLayout.Add>
        ) : null}

        <TabLayout.Content>
          {isTabOpen ? (
            <div
              ref={overflowRef}
              className={`
              flex
              ${isOverflow ? 'mb-[99px]' : 'h-full'} px-spacing-16 pb-spacing-16 
              bg-color-bg-tertiary
              rounded-radius-8
              overflow-y-auto
            `}
            >
              {fixedDate.from && fixedDate.to && (
                <TodoList
                  startDate={fixedDate.from}
                  endDate={fixedDate.to}
                  selectedSort={useApiParamFormatter('SelectTodoSortCondition', selectedSort)}
                  selectedState={selectedState}
                  overflowHandler={overflowCalcTrigger}
                />
              )}
            </div>
          ) : (
            <TodoBoard />
          )}
        </TabLayout.Content>
      </TabLayout>
      <CommonModal
        name='TraineeTodo'
        modaltype='CREATE'
        scheduleId={null}
        opened={isModalOpen}
        closeRequest={close}
        isBackdropCloseRequest={false}
      />
    </>
  )
}
