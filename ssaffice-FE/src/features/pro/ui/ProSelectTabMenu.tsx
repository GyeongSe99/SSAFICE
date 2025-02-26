type ProSelectTabMenuProps = {
  selected: string
  handleSelect: (props: 'manageMembers' | 'manageEachTodos' | 'manageTeamTodos') => void
}
export const ProSelectTabMenu = ({ selected, handleSelect }: ProSelectTabMenuProps) => {
  return (
    <div
      className='
        flex gap-spacing-16
        w-full h-[100px] px-spacing-64 py-spacing-28
    '
    >
      <button
        className={`
          p-spacing-10
          ${
            selected === 'manageTeamTodos'
              ? 'text-color-text-info-bold border-b-2 border-color-border-info '
              : 'text-color-text-tertiary'
          }
          heading-desktop-md
          hover:text-color-text-info hover:bg-color-bg-interactive-selected-hover hover:rounded-radius-16 hover:border-none
          active:text-color-text-info-bold active:bg-color-bg-interactive-selected-press active:rounded-radius-16 active:border-none
          `}
        onClick={() => handleSelect('manageTeamTodos')}
      >
        팀별 할 일 관리
      </button>

      <button
        className={`
            p-spacing-10
            ${
              selected === 'manageEachTodos'
                ? 'text-color-text-info-bold border-b-2 border-color-border-info'
                : 'text-color-text-tertiary'
            }
            heading-desktop-md
            hover:text-color-text-info hover:bg-color-bg-interactive-selected-hover hover:rounded-radius-16 hover:border-none
            active:text-color-text-info-bold active:bg-color-bg-interactive-selected-press active:rounded-radius-16 active:border-none
            
            `}
        onClick={() => handleSelect('manageEachTodos')}
      >
        개인별 할 일 관리
      </button>

      <button
        className={`
            p-spacing-10
            ${
              selected === 'manageMembers'
                ? 'text-color-text-info-bold border-b-2 border-color-border-info'
                : 'text-color-text-tertiary'
            }
            heading-desktop-md
            hover:text-color-text-info hover:bg-color-bg-interactive-selected-hover hover:rounded-radius-16 hover:border-none
            active:text-color-text-info-bold active:bg-color-bg-interactive-selected-press active:rounded-radius-16 active:border-none
            `}
        onClick={() => handleSelect('manageMembers')}
      >
        멤버 관리
      </button>
    </div>
  )
}
