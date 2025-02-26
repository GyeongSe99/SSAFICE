import { ProSelectTabMenu, useProSelectTabMenu } from '@/features/pro'
import { ManageEachTodosTab } from '@/widgets/manageEachTodosTab'
import { ManageMembersTab } from '@/widgets/manageMembersTab'
import { ManageTeamTodosTab } from '@/widgets/manageTeamTodosTab'

export const ProPage = () => {
  const { selected, handleSelect } = useProSelectTabMenu()

  return (
    <main className='flex flex-col w-full h-full '>
      <ProSelectTabMenu selected={selected} handleSelect={handleSelect} />

      <section
        className={`
          flex flex-col
          w-full h-full 
          ${selected === 'manageMembers' ? 'px-spacing-48' : 'px-spacing-64'}
          `}
      >
        {selected === 'manageMembers' ? (
          <ManageMembersTab />
        ) : selected === 'manageEachTodos' ? (
          <ManageEachTodosTab />
        ) : (
          <ManageTeamTodosTab />
        )}
      </section>
    </main>
  )
}
