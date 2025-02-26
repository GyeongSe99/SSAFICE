import { ManageEachTodoDateGroup } from './ManageEachTodoDateGroup'
import { useSortingEachTodo } from '@/features/manageEachTodoTab/model/useSortingEachTodo'
import { instance } from '@/shared/api'
import { useDateFormatter } from '@/shared/model'
import { useQuery } from '@tanstack/react-query'

type ManageEachTodoProps = {
  startDate: Date
  endDate: Date
  selectedSort: string
  selectedState: string
}

export const ManageEachTodoList = ({
  startDate,
  endDate,
  selectedSort,
  selectedState,
}: ManageEachTodoProps) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['eachTodos_manager', startDate, endDate, selectedSort],
    queryFn: async () => {
      const { data } = await instance.get(
        `/api/schedules/admin/assigned?filterType=${selectedSort}&sort=${selectedSort},asc&start=${useDateFormatter('API REQUEST: start', startDate) as string}&end=${useDateFormatter('API REQUEST: end', endDate) as string}`,
      )
      return data.scheduleSummaries
    },
  })

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>Error loading data</div>
  }

  const sortedTodos = useSortingEachTodo(data)

  return (
    <div className='relative w-full h-full '>
      <div className='relative flex flex-col w-full h-full '>
        {Object.entries(sortedTodos).map(([date, dailySchedules], index) => (
          <ManageEachTodoDateGroup
            key={date}
            date={date}
            dailySchedules={dailySchedules}
            isLast={index === Object.entries(sortedTodos).length - 1}
            selectedState={selectedState}
          />
        ))}
      </div>
    </div>
  )
}
