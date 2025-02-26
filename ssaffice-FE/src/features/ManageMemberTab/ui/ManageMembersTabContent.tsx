import {
  AddIcon,
  CheckedRoundedSquare,
  PageMoveArrow,
  PageMoveEndArrow,
  PencilIcon,
  RemoveBinIcon,
  SendMessageIcon,
} from '@/assets/svg'
import { codeToWord, type MattermostChannel } from '@/features/ManageMemberTab'
import { useManageMembersTabContent } from '../model/useManageMembersTabContent'

type ManageMembersTabContentProps = {
  channel: MattermostChannel
}
export const ManageMembersTabContent = ({ channel }: ManageMembersTabContentProps) => {
  // 컴포넌트 로드 시 교육생 리스트를 API로 가져올 수 있도록 해주세요.
  // channelId 보내면 교육생 리스트가 와야 합니다.
  const {
    userInChannelList,
    selectedUserInChannelList,
    handleSelectedUserInChannelList,
    handleSelectedAllUserInChannelList,
    selectedAll,
    pageInfo,
    fetchUserInChannelList,
  } = useManageMembersTabContent(channel)

  type TableHeaderProps = {
    width: string
    name: string
  }

  const headerSize: TableHeaderProps[] = [
    {
      width: 'w-[80px]',
      name: '기수',
    },
    {
      width: 'w-[100px]',
      name: '지역',
    },
    {
      width: 'w-[130px]',
      name: '트랙',
    },
    {
      width: 'w-[59px]',
      name: '반',
    },
    {
      width: 'w-[90px]',
      name: '역할',
    },
    {
      width: 'w-[325px]',
      name: '이메일',
    },
    {
      width: 'w-[180px]',
      name: '',
    },
  ]
  return (
    <div className='flex flex-col w-full h-full '>
      {/* 상단 버튼 영역 */}
      <div className='flex justify-end  py-spacing-20 px-spacing-24'>
        <button className='flex items-center  gap-spacing-2 py-spacing-8 px-spacing-16 bg-color-bg-interactive-primary rounded-radius-4 hover:bg-color-bg-interactive-primary-hover active:bg-color-bg-interactive-primary-press'>
          <div className='w-spacing-12 h-spacing-12'>
            <AddIcon color='#FFFFFF' />
          </div>
          <div className=' text-color-text-interactive-inverse body-md-medium'>관리자 추가</div>
        </button>
      </div>
      {selectedUserInChannelList.length > 0 && (
        <div className='flex items-center justify-end  gap-spacing-16 pb-spacing-12 px-spacing-24'>
          <div className='body-md-medium text-color-text-info'>
            {selectedUserInChannelList.length}명 선택
          </div>

          {/* 버튼 영역 */}
          <div className='flex h-full gap-spacing-10'>
            <button className='flex items-center justify-center  gap-spacing-2 w-fit h-spacing-36 px-spacing-8 py-spacing-16 bg-color-bg-success rounded-radius-4 hover:bg-color-bg-interactive-success-hover active:bg-color-bg-interactive-success-press'>
              <div className='w-[17px] h-[17px]'>
                <SendMessageIcon />
              </div>
              <div className='text-color-text-interactive-inverse body-md-medium'>MM 보내기</div>
            </button>

            <button className='flex items-center justify-center  gap-spacing-2 w-fit h-spacing-36 px-spacing-8 py-spacing-16 bg-color-bg-interactive-destructive rounded-radius-4 hover:bg-color-bg-interactive-destructive-hover active:bg-color-bg-interactive-destructive-press'>
              <div className='w-[15px] h-[17px]'>
                <RemoveBinIcon />
              </div>
              <div className='text-color-text-interactive-inverse body-md-medium'>멤버 삭제</div>
            </button>
          </div>
        </div>
      )}

      {/* 채널 참여자 리스트 */}
      <div className='flex flex-col w-full '>
        {/* th 영역 */}
        <div
          className='
          flex items-center
          h-[44px] 
          bg-color-bg-tertiary
          border-b border-spacing-1 border-color-border-tertiary
        '
        >
          <div
            className='
            flex items-center gap-spacing-12 
            w-[400px] py-spacing-12 px-spacing-24
            '
          >
            <label htmlFor='checked-selectedAll' className='flex'>
              {selectedAll ? (
                <div className='w-spacing-20 h-spacing-20'>
                  <CheckedRoundedSquare />
                </div>
              ) : (
                <div className='border  w-spacing-20 h-spacing-20 bg-color-bg-primary border-spacing-1 border-color-border-disabled rounded-radius-6' />
              )}

              <input
                id='checked-selectedAll'
                className='w-0 h-0 opacity-0'
                type='checkbox'
                checked={selectedAll}
                onChange={(e) => handleSelectedAllUserInChannelList(e.target.checked)}
              />
              {/* 여기를 눌렀을 때 전체가 다 선택되도록 해 주세요 */}
            </label>
            <div className=' text-color-text-disabled body-xs-medium'>이름</div>
          </div>

          {headerSize.map((each) => (
            <div
              className={`
                flex items-center
                ${each.width} py-spacing-12 px-spacing-24
                text-color-text-disabled body-xs-medium
              `}
              key={each.width}
            >
              {each.name}
            </div>
          ))}
        </div>

        {/* 교육생 출력 영역*/}
        <div className='flex flex-col border  border-spacing-1 border-color-border-tertiary'>
          {userInChannelList.map((each) => (
            <label
              key={each.userId}
              className={`
              flex items-center
              w-full h-[72px]
              ${selectedUserInChannelList.includes(each) ? 'bg-color-bg-info-subtle' : ''}
              border-b border-spacing-1 border-color-border-tertiary
              hover:bg-color-bg-info-subtle
              `}
              htmlFor={`user-${each.userId}`}
            >
              <input
                className='w-0 h-0 opacity-0'
                id={`user-${each.userId}`}
                type='checkbox'
                value={each.userId}
                checked={selectedUserInChannelList.includes(each)}
                onChange={(e) => handleSelectedUserInChannelList(each, e.target.checked)}
              />

              <div
                className='
                    flex items-center gap-spacing-12
                    w-[400px] py-spacing-16 px-spacing-24
                  '
              >
                {selectedUserInChannelList.includes(each) ? (
                  <div className='w-spacing-20 h-spacing-20'>
                    <CheckedRoundedSquare />
                  </div>
                ) : (
                  <div className='border  w-spacing-20 h-spacing-20 bg-color-bg-primary border-spacing-1 border-color-border-disabled rounded-radius-6' />
                )}

                {each.profileImage ? (
                  <img
                    src={each.profileImage}
                    alt='프로필 이미지'
                    className='rounded-full w-spacing-40 h-spacing-40 aspect-square'
                  />
                ) : (
                  <div className='rounded-full  w-spacing-40 h-spacing-40 bg-color-bg-disabled aspect-square' />
                )}
                <div className='text-color-text-primary body-sm-medium'>{each.name}</div>
              </div>
              {headerSize.map((sizes) => (
                <div
                  className={`
                    flex items-center ${sizes.name === '' ? 'gap-spacing-4' : ''}
                    ${sizes.width} py-spacing-16 ${sizes.name !== '' ? 'px-spacing-24' : 'px-spacing-16'}
                    text-color-text-disabled body-xs-medium
                  `}
                  key={sizes.width}
                >
                  {sizes.name === '기수' && each.cohortNum}
                  {sizes.name === '지역' &&
                    codeToWord({ field: { fieldName: 'regionCd', fieldValue: each.regionCd } })}
                  {each.trackCd &&
                    sizes.name === '트랙' &&
                    codeToWord({ field: { fieldName: 'trackCd', fieldValue: each.trackCd } })}
                  {sizes.name === '반' && each.classNum}
                  {sizes.name === '역할' && each.roles.description}
                  {sizes.name === '이메일' && each.email}
                  {sizes.name === '' && (
                    <>
                      <button className='flex items-center justify-center  w-spacing-40 h-spacing-40'>
                        <div className='w-[17px] h-[17px]'>
                          <SendMessageIcon color='#6B7280' />
                        </div>
                      </button>
                      <button className='flex items-center justify-center w-spacing-40 h-spacing-40'>
                        <div className='w-[15px] h-[17px]'>
                          <RemoveBinIcon color='#6B7280' />
                        </div>
                      </button>
                      <button className='flex items-center justify-center w-spacing-40 h-spacing-40'>
                        <div className='w-[17px] h-[17px]'>
                          {/* 추후 pencil icon으로 바꾸어 주세요! */}
                          <PencilIcon />
                        </div>
                      </button>
                    </>
                  )}
                </div>
              ))}
            </label>
          ))}
        </div>
        {/* 페이지네이션 영역 */}
        <div
          className='
          flex justify-center items-center gap-spacing-16
          h-[68px] pt-spacing-12 pb-spacing-16 px-spacing-24
        '
        >
          <div className='flex gap-spacing-8'>
            <div className='flex items-center justify-center  h-spacing-40 w-spacing-40'>
              <button
                className='w-[13px] h-[12px]'
                onClick={() => fetchUserInChannelList(0)}
                disabled={pageInfo?.pageNumber === 0}
              >
                <PageMoveEndArrow />
              </button>
            </div>
            <div className='flex items-center justify-center  h-spacing-40 w-spacing-40'>
              <button
                className='w-[7px] h-[13px]'
                onClick={() => pageInfo && fetchUserInChannelList(pageInfo?.pageNumber - 1)}
                disabled={pageInfo?.pageNumber === 0}
              >
                <PageMoveArrow />
              </button>
            </div>
          </div>

          <div className='flex'>
            {pageInfo &&
              Array.from({ length: pageInfo?.totalPages }, (_, index) => (
                <button
                  key={index}
                  className={`
                    flex justify-center items-center
                    w-spacing-40 h-spacing-40
                    ${pageInfo?.pageNumber !== undefined && pageInfo?.pageNumber === index ? 'text-color-text-info' : 'text-color-text-disabled'} body-sm-medium
                  `}
                  onClick={() => fetchUserInChannelList(index)}
                >
                  {index + 1}
                </button>
              ))}
          </div>

          {/* '이전 페이지' 관련 버튼 좌우반전하여 배치 */}
          <div className='flex gap-spacing-8 transform scale-x-[-1]'>
            <div className='flex items-center justify-center  h-spacing-40 w-spacing-40'>
              <button
                className='w-[13px] h-[12px]'
                onClick={() => pageInfo && fetchUserInChannelList(pageInfo.totalPages - 1)}
                disabled={
                  pageInfo?.pageNumber ===
                  (pageInfo?.totalPages ? pageInfo.totalPages - 1 : undefined)
                }
              >
                <PageMoveEndArrow />
              </button>
            </div>
            <div className='flex items-center justify-center  h-spacing-40 w-spacing-40'>
              <button
                className='w-[7px] h-[13px]'
                onClick={() => pageInfo && fetchUserInChannelList(pageInfo.pageNumber + 1)}
                disabled={
                  pageInfo?.pageNumber ===
                  (pageInfo?.totalPages ? pageInfo.totalPages - 1 : undefined)
                }
              >
                <PageMoveArrow />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
