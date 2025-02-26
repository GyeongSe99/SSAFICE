import { ManageMembersTabContent, TeamSelectDropdown } from '@/features/ManageMemberTab'
import { useTeamSelectDropdown } from '@/features/ManageMemberTab/model/useTeamSelectDropdown'
import { RefreshMattermostConnection } from '@/shared/ui'

export const ManageMembersTab = () => {
  const {
    handleSelectedIndex,
    selectedIndex,
    channelList,
    saveSelectedChannels, // '적용' 버튼에 들어갈 onClick 로직
    handleSelectChannel, // 채널 선택 시
    selectedChannel, // 선택된 채널
    tabName, // 탭 이름('적용' 버튼 누르면 업데이트)
    mattermostTeams, // API 요청하여 받아온 사용자가 포함된 MM 팀 / 채널 정보
  } = useTeamSelectDropdown()

  return (
    <>
      <div
        className='
          flex gap-spacing-10
          w-full h-[66px]
        '
      >
        {/* 팀 선택 & MM refresh 영역 */}
        <TeamSelectDropdown
          handleSelectedIndex={handleSelectedIndex}
          selectedIndex={selectedIndex}
          channelList={channelList}
          saveSelectedChannels={saveSelectedChannels}
          handleSelectChannel={handleSelectChannel}
          selectedChannel={selectedChannel}
          tabName={tabName}
          mattermostTeams={mattermostTeams}
        />
        <RefreshMattermostConnection />
      </div>

      <div
        className={`
          
          flex flex-col justify-center items-center
          ${tabName ? '' : 'px-[405px] py-[478px]'}
          text-color-text-disabled body-lg-medium
          `}
      >
        {/* 
          이 영역은 나중에 screen에 맞추어서 반응형으로 잡고 
          center 정렬하면 좋을 것 같음 / h-65vh 잡으면 딱 예쁘게 나옵니다
        */}

        {/* 왜 렌더링 기점이 selectedChannel이 아니라 tabName이냐면, 
            tabName은 사용자가 '적용' 버튼을 누른 후에 반영되기 때문입니다. 
            selectedChannel을 기준으로 하면 '적용' 버튼 클릭 전에 업데이트되기 때문에, 
            API 요청 시점과 일치하지 않습니다.
        */}
        {tabName
          ? selectedChannel && <ManageMembersTabContent channel={selectedChannel} />
          : '팀과 채널을 먼저 선택해주세요.'}
      </div>
    </>
  )
}
