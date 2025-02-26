import { Children, isValidElement, cloneElement, Attributes, useState, ChangeEvent } from 'react'
import MarkdownEditor from '@uiw/react-markdown-editor'
import MarkdownPreview from '@uiw/react-markdown-preview'

import type {
  BaseResponse,
  ExitButtonResponse,
  TaskTitleResponse,
  TaskDescriptionResponse,
  TaskStatusResponse,
  AssigneeResponse,
  ManagerResponse,
  EndDateResponse,
  ReminderResponse,
  SaveEditButtonResponse,
  RequiredResponse,
} from './types'
import {
  SelectTodoState,
  RemindTimeModal,
  AddTraineeModal,
  AddTeamModal,
  Radio,
  RadioGroup,
} from '@/shared/ui'
import { BackArrowIcon, XIcon, RadioFocusOnIcon, RadioFocusOutIcon } from '@/assets/svg'

// 서브 컴포넌트
function ExitButton({ closeRequest }: ExitButtonResponse) {
  return (
    // 수정사항 여부 검사 후 있는데 수정 안하고 이거 누르면 alret
    <button onClick={closeRequest}>
      <BackArrowIcon className='w-6' />
    </button>
  )
}

function TaskTitle({ children, title, setTitle, modaltype }: TaskTitleResponse) {
  const onChangetitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value)
  }

  switch (modaltype) {
    case 'CREATE':
      return (
        <input
          type='text'
          onChange={onChangetitle}
          value={title}
          placeholder='할 일을 요약해주세요.'
          className='outline-none bg-color-bg-primary heading-desktop-md text-color-text-primary placeholder:text-color-text-disabled'
        />
      )
    case 'VIEW':
      return (
        <h2 className='heading-desktop-md bg-color-bg-primary text-color-text-primary'>
          {children}
        </h2>
      )
    case 'EDIT':
      return (
        <input
          type='text'
          onChange={onChangetitle}
          value={title}
          placeholder='할 일을 요약해주세요.'
          className='outline-none bg-color-bg-primary heading-desktop-md text-color-text-primary placeholder:text-color-text-disabled'
        />
      )
  }
}

// 스타일 커스텀 필요 -> 텍스트가 안바뀌어요
function TaskDescription({
  children,
  description,
  setDescription,
  modaltype,
}: TaskDescriptionResponse) {
  const onChangeDescription = (value: string) => {
    setDescription(value)
  }

  switch (modaltype) {
    case 'CREATE':
      return (
        <div className='flex flex-col gap-y-spacing-6 mt-spacing-12'>
          <h3 className='heading-desktop-sm text-color-text-tertiary bg-color-bg-primary'>설명</h3>
          <MarkdownEditor
            value={description}
            className='z-30 body-md-medium text-color-text-primary bg-color-bg-primary'
            height='300px'
            onChange={onChangeDescription}
          />
        </div>
      )

    case 'VIEW':
      return (
        <div className='flex flex-col gap-y-spacing-6 mt-spacing-12'>
          <h3 className='heading-desktop-sm text-color-text-tertiary bg-color-bg-primary'>설명</h3>
          <MarkdownPreview
            source={String(children)}
            className='max-h-[500px] min-h-[200px] overflow-y-auto body-md-medium'
          />
        </div>
      )

    case 'EDIT':
      return (
        <div className='flex flex-col gap-y-spacing-6 mt-spacing-12'>
          <h3 className='heading-desktop-sm text-color-text-tertiary bg-color-bg-primary'>설명</h3>
          <MarkdownEditor
            value={description}
            className='body-md-medium text-color-text-primary bg-color-bg-primary'
            height='300px'
            onChange={onChangeDescription}
          />
        </div>
      )
  }
}

// 추후 action type 상황에 맞게 변경 필요
function TaskStatus({ selectedState, setSelectedState, modaltype }: TaskStatusResponse) {
  switch (modaltype) {
    case 'CREATE':
      return (
        <SelectTodoState
          selectedState={selectedState}
          setSelectedState={setSelectedState}
          actionType='filter'
        />
      )
    case 'VIEW':
      return (
        <SelectTodoState
          selectedState={selectedState}
          setSelectedState={setSelectedState}
          actionType='filter'
        />
      )
    case 'EDIT':
      return (
        <SelectTodoState
          selectedState={selectedState}
          setSelectedState={setSelectedState}
          actionType='filter'
        />
      )
  }
}

function SaveEditButton({
  saveRequest,
  editRequest,
  saveEditRequest,
  modaltype,
}: SaveEditButtonResponse) {
  switch (modaltype) {
    case 'CREATE':
      return (
        <button
          type='button'
          onClick={saveRequest}
          className='w-fit h-fit px-spacing-16 py-spacing-4 bg-color-bg-interactive-primary rounded-radius-4 text-color-text-interactive-inverse body-md-medium hover:bg-color-bg-interactive-primary-hover focus:bg-color-bg-interactive-primary-press'
        >
          저장
        </button>
      )
    case 'VIEW':
      return editRequest ? (
        <button
          type='button'
          onClick={editRequest}
          className='w-fit h-fit px-spacing-16 py-spacing-4 bg-color-bg-interactive-primary rounded-radius-4 text-color-text-interactive-inverse body-md-medium hover:bg-color-bg-interactive-primary-hover focus:bg-color-bg-interactive-primary-press'
        >
          수정
        </button>
      ) : (
        <></>
      )
    case 'EDIT':
      return (
        <button
          type='button'
          onClick={saveEditRequest}
          className='w-fit h-fit px-spacing-16 py-spacing-4 bg-color-bg-interactive-primary rounded-radius-4 text-color-text-interactive-inverse body-md-medium hover:bg-color-bg-interactive-primary-hover focus:bg-color-bg-interactive-primary-press'
        >
          저장
        </button>
      )
  }
}

// 매니저용 로직 데이터 만든 후 추가하기
function Assignee({
  user,
  userIds,
  setUserIds,
  userType,
  manageType,
  modaltype,
}: AssigneeResponse) {
  const [isOpen, setIsOpen] = useState(false)
  const [userNameList, setUserNameList] = useState<string[]>([])

  const handleOnClick = () => {
    setIsOpen(!isOpen)
  }

  const handleOnclickX = (idx: number) => {
    const newNameList = userNameList.filter((_, index) => index !== idx)
    setUserNameList(newNameList)

    const newIdsList = userIds.filter((_, index) => index !== idx)
    setUserIds(newIdsList)
  }

  switch (modaltype) {
    case 'CREATE':
      switch (userType) {
        case 'trainee':
          return (
            <div className='flex items-center w-full h-fit p-spacing-10 gap-x-spacing-10'>
              <p className='heading-desktop-sm min-w-20 text-color-text-tertiary'>담당자</p>
              <div className='flex items-center gap-x-spacing-6'>
                {user.profileImgUrl ? (
                  <img
                    src={user.profileImgUrl}
                    alt='profile'
                    className='object-cover object-center w-5 aspect-square rounded-radius-circle'
                  />
                ) : (
                  <div className='flex items-center justify-center w-5 aspect-square bg-color-bg-interactive-selected-press rounded-radius-circle'>
                    <p className='body-xs-medium text-color-text-interactive-inverse'>
                      {user.name[0]}
                    </p>
                  </div>
                )}
                <p className='w-[193px] truncate body-sm-semibold text-color-text-primary'>
                  {user.name}
                </p>
              </div>
            </div>
          )
        case 'manager':
          return (
            <div className='relative flex items-start w-fit h-fit p-spacing-10 gap-x-spacing-10'>
              <p className='heading-desktop-sm min-w-20 text-color-text-tertiary'>담당자</p>
              <div className='flex flex-col gap-y-spacing-10'>
                <button
                  onClick={handleOnClick}
                  className='border w-fit h-fit p-spacing-4 bg-color-bg-interactive-secondary rounded-radius-4 border-color-border-disabled body-sm-semibold text-color-text-primary'
                >
                  {manageType === 'PERSONAL' ? '교육생 추가' : '팀 추가'}
                </button>
                <div className='flex flex-col w-full h-full gap-y-spacing-10'>
                  {userNameList.map((userName, index) => (
                    <div key={index} className='flex items-center gap-x-spacing-4'>
                      <button onClick={() => handleOnclickX(index)}>
                        <XIcon className='w-3' />
                      </button>
                      <p className='body-xs-semibold text-color-text-primary'>{userName}</p>
                    </div>
                  ))}
                </div>
              </div>

              {manageType === 'PERSONAL'
                ? isOpen && (
                    <AddTraineeModal
                      setIsOpen={setIsOpen}
                      userIds={userIds}
                      setUserIds={setUserIds}
                      userNameList={userNameList}
                      setUserNameList={setUserNameList}
                    />
                  )
                : // 나중에 팀 정보 state를 넣으면 됨
                  isOpen && (
                    <AddTeamModal
                      setIsOpen={setIsOpen}
                      userIds={userIds}
                      setUserIds={setUserIds}
                      userNameList={userNameList}
                      setUserNameList={setUserNameList}
                    />
                  )}
            </div>
          )
      }
      break

    case 'VIEW':
      return (
        <div className='flex items-center w-full h-fit p-spacing-10 gap-x-spacing-10'>
          <p className='heading-desktop-sm min-w-20 text-color-text-tertiary'>담당자</p>
          <div className='flex items-center gap-x-spacing-6'>
            {user.profileImgUrl ? (
              <img
                src={user.profileImgUrl}
                alt='profile'
                className='object-cover object-center w-5 aspect-square rounded-radius-circle'
              />
            ) : (
              <div className='flex items-center justify-center w-5 aspect-square bg-color-bg-interactive-selected-press rounded-radius-circle'>
                <p className='body-xs-medium text-color-text-interactive-inverse'>
                  {user.name && user.name[0]}
                </p>
              </div>
            )}
            <p className='w-[193px] truncate body-sm-semibold text-color-text-primary'>
              {user.name}
            </p>
          </div>
        </div>
      )

    case 'EDIT':
      return (
        <div className='flex items-center w-full h-fit p-spacing-10 gap-x-spacing-10'>
          <p className='heading-desktop-sm min-w-20 text-color-text-tertiary'>담당자</p>
          <div className='flex items-center gap-x-spacing-6'>
            {user.profileImgUrl ? (
              <img
                src={user.profileImgUrl}
                alt='profile'
                className='object-cover object-center w-5 aspect-square rounded-radius-circle'
              />
            ) : (
              <div className='flex items-center justify-center w-5 aspect-square bg-color-bg-interactive-selected-press rounded-radius-circle'>
                <p className='body-xs-medium text-color-text-interactive-inverse'>{user.name[0]}</p>
              </div>
            )}
            <p className='w-[193px] truncate body-sm-semibold text-color-text-primary'>
              {user.name}
            </p>
          </div>
        </div>
      )
  }
}

function Manager({ user, createUser, userType, modaltype }: ManagerResponse) {
  const isTrainee = createUser.name === user.name

  switch (modaltype) {
    case 'CREATE':
      switch (userType) {
        case 'trainee':
          return null
        case 'manager':
          return (
            <div className='flex items-center w-full h-fit p-spacing-10 gap-x-spacing-10'>
              <p className='heading-desktop-sm min-w-20 text-color-text-tertiary'>담당 프로</p>
              <div className='flex items-center gap-x-spacing-6'>
                <img
                  src={createUser.profileImgUrl}
                  alt='profile'
                  className='w-5 h-5 rounded-radius-circle'
                />
                <p className='w-[193px] truncate body-sm-semibold text-color-text-primary'>
                  {createUser.name}
                </p>
              </div>
            </div>
          )
      }
      break

    case 'VIEW':
      return (
        !isTrainee && (
          <div className='flex items-center w-full h-fit p-spacing-10 gap-x-spacing-10'>
            <p className='heading-desktop-sm min-w-20 text-color-text-tertiary'>담당 프로</p>
            <div className='flex items-center gap-x-spacing-6'>
              <img
                src={createUser.profileImgUrl}
                alt='profile'
                className='w-5 h-5 rounded-radius-circle'
              />
              <p className='w-[193px] truncate body-sm-semibold text-color-text-primary'>
                {createUser.name}
              </p>
            </div>
          </div>
        )
      )

    case 'EDIT':
      return (
        <div className='flex items-center w-full h-fit p-spacing-10 gap-x-spacing-10'>
          <p className='heading-desktop-sm min-w-20 text-color-text-tertiary'>담당 프로</p>
          <div className='flex items-center gap-x-spacing-6'>
            <img
              src={createUser.profileImgUrl}
              alt='profile'
              className='w-5 h-5 rounded-radius-circle'
            />
            <p className='w-[193px] truncate body-sm-semibold text-color-text-primary'>
              {createUser.name}
            </p>
          </div>
        </div>
      )
  }
}

function EndDate({ endDate, setEndDate, modaltype }: EndDateResponse) {
  const today = new Date()
  const formattedDate = today.toISOString().split('T')[0]

  const onChangeEndDate = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEndDate(e.target.value)
  }

  switch (modaltype) {
    case 'CREATE':
      return (
        <div className='flex items-center w-full h-fit p-spacing-10 gap-x-spacing-10'>
          <p className='heading-desktop-sm min-w-20 text-color-text-tertiary'>마감일</p>
          <input
            type='date'
            value={endDate}
            onChange={onChangeEndDate}
            min={formattedDate}
            className='border outline-none appearance-none body-sm-semibold text-color-text-disabled p-spacing-4 rounded-radius-4 border-color-border-primary'
          />
        </div>
      )

    case 'VIEW':
      return (
        <div className='flex items-center w-full h-fit p-spacing-10 gap-x-spacing-10'>
          <p className='heading-desktop-sm min-w-20 text-color-text-tertiary'>마감일</p>
          <p className='body-sm-semibold text-color-text-primary'>{endDate}</p>
        </div>
      )
    case 'EDIT':
      return (
        <div className='flex items-center w-full h-fit p-spacing-10 gap-x-spacing-10'>
          <p className='heading-desktop-sm min-w-20 text-color-text-tertiary'>마감일</p>
          <input
            type='date'
            value={endDate}
            onChange={onChangeEndDate}
            min={formattedDate}
            className='border outline-none appearance-none body-sm-semibold text-color-text-disabled p-spacing-4 rounded-radius-4 border-color-border-primary'
          />
        </div>
      )
  }
}

function ReminderTime({ reminder, setReminder, modaltype }: ReminderResponse) {
  const [isOpen, setIsOpen] = useState(false)

  const handleOnClick = () => {
    setIsOpen(!isOpen)
  }

  const handleOnClickX = (idx: number) => {
    const newReminder = reminder.filter((_, index) => index !== idx)
    setReminder(newReminder)
  }

  switch (modaltype) {
    case 'CREATE':
      return (
        <div className='relative flex items-start w-fit h-fit p-spacing-10 gap-x-spacing-10'>
          <p className='heading-desktop-sm min-w-20 text-color-text-tertiary'>리마인드</p>
          <div className='flex flex-col gap-y-spacing-10'>
            <button
              onClick={handleOnClick}
              className='border w-fit h-fit p-spacing-4 bg-color-bg-interactive-secondary rounded-radius-4 border-color-border-disabled body-sm-semibold text-color-text-primary'
            >
              시간 추가
            </button>
            <div className='flex flex-col w-full h-full gap-y-spacing-10'>
              {reminder.map((item, idx) => (
                <div key={idx} className='flex items-center gap-x-spacing-4'>
                  <button onClick={() => handleOnClickX(idx)}>
                    <XIcon className='w-3' />
                  </button>
                  <p className='body-xs-semibold text-color-text-tertiary'>
                    <span
                      className={`mr-spacing-2 ${item.remindTypeCd === 'DAILY' ? 'text-color-text-info' : 'text-color-text-danger'}`}
                    >
                      {item.remindTypeCd === 'DAILY' ? '매일' : '한번만'}
                    </span>
                    {item.remindTypeCd === 'ONCE' && item.remindDateTime.split('T')[0]}{' '}
                    {parseInt(item.remindDateTime.split('T')[1].split(':')[0]) === 12
                      ? '오후 12시'
                      : parseInt(item.remindDateTime.split('T')[1].split(':')[0]) > 12
                        ? `오후 ${parseInt(item.remindDateTime.split('T')[1].split(':')[0]) - 12}시`
                        : `오전 ${parseInt(item.remindDateTime.split('T')[1].split(':')[0])}시`}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {isOpen && (
            <RemindTimeModal setIsOpen={setIsOpen} reminder={reminder} setReminder={setReminder} />
          )}
        </div>
      )

    case 'VIEW':
      return (
        <div className='relative flex items-start w-fit h-fit p-spacing-10 gap-x-spacing-10'>
          <p className='heading-desktop-sm min-w-20 text-color-text-tertiary'>리마인드</p>
          <div className='flex flex-col gap-y-spacing-10'>
            <div className='flex flex-col w-full h-full gap-y-spacing-10'>
              {reminder.map((item, idx) => (
                <div key={idx} className='flex items-center gap-x-spacing-4'>
                  <p className='body-xs-semibold text-color-text-tertiary'>
                    <span
                      className={`mr-spacing-2 ${item.remindTypeCd === 'DAILY' ? 'text-color-text-info' : 'text-color-text-danger'}`}
                    >
                      {item.remindTypeCd === 'DAILY' ? '매일' : '한번만'}
                    </span>
                    {item.remindTypeCd === 'ONCE' && item.remindDateTime.split('T')[0]}{' '}
                    {parseInt(item.remindDateTime.split('T')[1].split(':')[0]) === 12
                      ? '오후 12시'
                      : parseInt(item.remindDateTime.split('T')[1].split(':')[0]) > 12
                        ? `오후 ${parseInt(item.remindDateTime.split('T')[1].split(':')[0]) - 12}시`
                        : `오전 ${parseInt(item.remindDateTime.split('T')[1].split(':')[0])}시`}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )
    case 'EDIT':
      return (
        <div className='relative flex items-start w-fit h-fit p-spacing-10 gap-x-spacing-10'>
          <p className='heading-desktop-sm min-w-20 text-color-text-tertiary'>리마인드</p>
          <div className='flex flex-col gap-y-spacing-10'>
            <button
              onClick={handleOnClick}
              className='border w-fit h-fit p-spacing-4 bg-color-bg-interactive-secondary rounded-radius-4 border-color-border-disabled body-sm-semibold text-color-text-primary'
            >
              시간 추가
            </button>
            <div className='flex flex-col w-full h-full gap-y-spacing-10'>
              {reminder.map((item, idx) => (
                <div key={idx} className='flex items-center gap-x-spacing-4'>
                  <button onClick={() => handleOnClickX(idx)}>
                    <XIcon className='w-3' />
                  </button>
                  <p className='body-xs-semibold text-color-text-tertiary'>
                    <span
                      className={`mr-spacing-2 ${item.remindTypeCd === 'DAILY' ? 'text-color-text-info' : 'text-color-text-danger'}`}
                    >
                      {item.remindTypeCd === 'DAILY' ? '매일' : '한번만'}
                    </span>
                    {parseInt(item.remindDateTime.split('T')[1].split(':')[0]) === 12
                      ? '오후 12시'
                      : parseInt(item.remindDateTime.split('T')[1].split(':')[0]) > 12
                        ? `오후 ${parseInt(item.remindDateTime.split('T')[1].split(':')[0]) - 12}시`
                        : `오전 ${parseInt(item.remindDateTime.split('T')[1].split(':')[0])}시`}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {isOpen && (
            <RemindTimeModal setIsOpen={setIsOpen} reminder={reminder} setReminder={setReminder} />
          )}
        </div>
      )
  }
}

function Required({ isRequired, setIsRequired, modaltype }: RequiredResponse) {
  const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    setIsRequired(event.target.value)
  }

  switch (modaltype) {
    case 'CREATE':
      return (
        <div className='relative flex items-center w-fit h-fit p-spacing-10 gap-x-spacing-10'>
          <p className='heading-desktop-sm min-w-20 text-color-text-tertiary'>필수 등록</p>
          <RadioGroup onChange={handleOnChange}>
            <Radio
              name='required'
              value='Y'
              className='body-sm-semibold text-color-text-primary mr-spacing-16'
              defaultChecked
            >
              <div className='flex items-center gap-x-spacing-4'>
                {isRequired === 'Y' ? (
                  <RadioFocusOnIcon className='w-4' />
                ) : (
                  <RadioFocusOutIcon className='w-4' />
                )}
                <p>필수</p>
              </div>
            </Radio>
            <Radio name='required' value='N' className='body-sm-semibold text-color-text-primary'>
              <div className='flex items-center gap-x-spacing-4'>
                {isRequired === 'N' ? (
                  <RadioFocusOnIcon className='w-4' />
                ) : (
                  <RadioFocusOutIcon className='w-4' />
                )}
                <p>선택</p>
              </div>
            </Radio>
          </RadioGroup>
        </div>
      )
    case 'VIEW':
      return (
        <div className='relative flex items-center w-fit h-fit p-spacing-10 gap-x-spacing-10'>
          <p className='heading-desktop-sm min-w-20 text-color-text-tertiary'>필수 여부</p>

          {isRequired === 'Y' ? (
            <p className='body-sm-semibold text-color-text-primary'>필수</p>
          ) : (
            <p className='body-sm-semibold text-color-text-primary'>선택</p>
          )}
        </div>
      )
  }
}

//레이아웃
function LeftSectionContainer({ children, modaltype }: BaseResponse) {
  return (
    <div className='flex flex-col w-[568px] h-full'>
      {Children.map(children, (child) => {
        if (isValidElement(child)) {
          return cloneElement(child, { modaltype } as Attributes)
        }
        return child
      })}
    </div>
  )
}

function RightSectionContainer({ children, modaltype }: BaseResponse) {
  return (
    <div className='flex flex-col w-[320px] h-full gap-y-spacing-20'>
      {Children.map(children, (child) => {
        if (isValidElement(child)) {
          return cloneElement(child, { modaltype } as Attributes)
        }
        return child
      })}
    </div>
  )
}

function DetailsContainer({ children, modaltype }: BaseResponse) {
  return (
    <div className='flex flex-col w-full border divide-y divide-color-border-secondary h-fit border-color-border-secondary rounded-radius-4'>
      <div className='w-full heading-desktop-sm text-color-text-tertiary h-fit px-spacing-20 py-spacing-12'>
        세부사항
      </div>
      <div className='flex flex-col w-full h-fit p-spacing-10 gap-y-spacing-10'>
        {Children.map(children, (child) => {
          if (isValidElement(child)) {
            return cloneElement(child, { modaltype } as Attributes)
          }
          return child
        })}
      </div>
    </div>
  )
}

function FlexContainer({ children, modaltype }: BaseResponse) {
  return (
    <div className='flex items-center justify-between w-full'>
      {Children.map(children, (child) => {
        if (isValidElement(child)) {
          return cloneElement(child, { modaltype } as Attributes)
        }
        return child
      })}
    </div>
  )
}

// 메인
function TodoModalMain({ children, modaltype }: BaseResponse) {
  return (
    <div className='flex w-full h-full gap-x-spacing-20 py-spacing-40 px-spacing-32'>
      {Children.map(children, (child) => {
        if (isValidElement(child)) {
          return cloneElement(child, { modaltype } as Attributes)
        }
        return child
      })}
    </div>
  )
}

export const TodoModal = Object.assign(TodoModalMain, {
  LeftSection: LeftSectionContainer,
  RightSection: RightSectionContainer,
  DetailsSection: DetailsContainer,
  Flex: FlexContainer,

  ExitButton: ExitButton,
  Title: TaskTitle,
  Description: TaskDescription,
  Status: TaskStatus,
  Button: SaveEditButton,
  Assignee: Assignee,
  Manager: Manager,
  EndDate: EndDate,
  Reminder: ReminderTime,
  Required: Required,
})
