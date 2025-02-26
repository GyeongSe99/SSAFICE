export type ModalName = 'EmailValidFalse' | 'LoginFail' | 'TraineeTodo' | 'ManagerTodo'

export type ModalElement = {
  modal: JSX.Element
  width: string // string type => px, rem 단위를 붙인 형태로 작성해 주세요.
  height: string
  hasRounded?: string
  hasCloseButton?: boolean
  hasShadow?: boolean
}
