import { ManageTeamTodoDateGroup } from './ManageTeamTodoDateGroup'
import { useSortingTeamTodo } from '@/features/manageTeamTodoTab/model/useSortingTeamTodo'
import { instance } from '@/shared/api'
import { useDateFormatter } from '@/shared/model'
import { useQuery } from '@tanstack/react-query'

type ManageTeamTodoListProps = {
  startDate: Date
  endDate: Date
  selectedSort: string
  selectedState: string
}

export const ManageTeamTodoList = ({
  startDate,
  endDate,
  selectedSort,
  selectedState,
}: ManageTeamTodoListProps) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['teamTodos', startDate, endDate, selectedSort],
    queryFn: async () => {
      const { data } = await instance.get(
        `/api/notice/admin/my?filterType=${selectedSort}&sort=${selectedSort},asc&start=${useDateFormatter('API REQUEST: start', startDate) as string}&end=${useDateFormatter('API REQUEST: end', endDate) as string}`,
      )
      return data
    },
  })

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>Error loading data</div>
  }

  const sortedTodos = useSortingTeamTodo(data)

  return (
    <div className='relative w-full h-full'>
      <div className='relative flex flex-col w-full h-full'>
        {Object.entries(sortedTodos).map(([date, dailySchedules], index) => (
          <ManageTeamTodoDateGroup
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
