import { useEffect, useState } from 'react'
import { DndContext, DragEndEvent, PointerSensor, useSensor, useSensors } from '@dnd-kit/core'
import { restrictToFirstScrollableAncestor } from '@dnd-kit/modifiers'

import { useLockScrollX } from '@/features/todoTab/model/hooks'
import { Card, CardColumn } from '@/features/todoTab'
import { useTraineeScheduleList, CardColumnData } from '@/entities/todoTab'
import type { TaskResponse } from '@/entities/todoTab'
import { putTraineeSchedule } from '@/shared/api/Schedule'

type ColumnLengthProps = {
  TODO: number
  IN_PROGRESS: number
  DONE: number
}

export const TodoBoard = () => {
  // hook
  useLockScrollX('.grid')

  const pointerSensor = useSensor(PointerSensor, {
    activationConstraint: {
      distance: 5,
    },
  })
  const sensors = useSensors(pointerSensor)

  // state
  const { data, isLoading } = useTraineeScheduleList(
    'updatedAt',
    '2024-01-01T00:00:00',
    '2100-01-01T00:00:00',
  )

  const [tasks, setTasks] = useState<TaskResponse[]>(data?.scheduleSummaries)
  const [columnLength, setColumnLength] = useState<ColumnLengthProps>({
    TODO: data?.scheduleStatusCount.todoCount,
    IN_PROGRESS: data?.scheduleStatusCount.inProgressCount,
    DONE: data?.scheduleStatusCount.doneCount,
  })

  useEffect(() => {
    setTasks(data?.scheduleSummaries)
    setColumnLength({
      TODO: data?.scheduleStatusCount.todoCount,
      IN_PROGRESS: data?.scheduleStatusCount.inProgressCount,
      DONE: data?.scheduleStatusCount.doneCount,
    })
  }, [data, isLoading])

  // event
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event

    if (!over) return

    const taskId = active.id as number
    const oldStatus = active.data.current?.status
    const newStatus = over.id as TaskResponse['scheduleStatusTypeCd']

    if (oldStatus === newStatus) return

    setTasks(() => {
      const updatedTasks = tasks.filter((task) => task.scheduleId !== taskId)
      const updatedTask = tasks.find((task) => task.scheduleId === taskId)

      if (updatedTask) {
        return [{ ...updatedTask, scheduleStatusTypeCd: newStatus }, ...updatedTasks]
      }

      return tasks
    })

    setColumnLength((prev) => {
      const prevLength = prev[oldStatus as keyof ColumnLengthProps]
      const newLength = prev[newStatus as keyof ColumnLengthProps]

      return {
        ...prev,
        [oldStatus]: prevLength - 1,
        [newStatus]: newLength + 1,
      }
    })

    putTraineeSchedule(taskId, { scheduleStatusTypeCd: newStatus })
  }

  return (
    <div className='grid w-full h-full grid-cols-3 overflow-x-hidden overflow-y-auto overscroll-contain mt-spacing-24 gap-x-spacing-10'>
      <DndContext
        onDragEnd={handleDragEnd}
        sensors={sensors}
        modifiers={[restrictToFirstScrollableAncestor]}
      >
        {CardColumnData?.map((column) => (
          <CardColumn
            key={column.id}
            id={column.id}
            label={column.label}
            columnLength={columnLength[column.id as keyof ColumnLengthProps]}
          >
            {tasks
              ?.filter((data) => data?.scheduleStatusTypeCd === column.id)
              .map((todo) => (
                <Card
                  key={todo.scheduleId}
                  scheduleId={todo.scheduleId}
                  title={todo.title}
                  endDateTime={todo.endDateTime}
                  scheduleStatusTypeCd={todo.scheduleStatusTypeCd}
                  scheduleSourceTypeCd={todo.scheduleSourceTypeCd}
                  createUser={todo.createUser}
                />
              ))}
          </CardColumn>
        ))}
      </DndContext>
    </div>
  )
}
