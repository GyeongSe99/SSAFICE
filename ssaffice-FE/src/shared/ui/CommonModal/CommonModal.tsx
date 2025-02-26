import ReactModal from 'react-modal'
import { findModalByName, ModalName } from '@/shared/model'

type CommonModalProps = {
  name: ModalName
  opened: boolean // 모달의 열림 상태
  closeRequest: () => void // 모달을 닫을 수 있는 함수
  isBackdropCloseRequest?: boolean // 배경 클릭으로 모달 열지 닫을지
  [key: string]: any
}

export const CommonModal = ({
  name,
  opened,
  closeRequest,
  isBackdropCloseRequest = true,
  ...props
}: CommonModalProps) => {
  const modal = findModalByName(name, closeRequest, props) // 모달을 이름으로 찾아 매치합니다.
  if (!modal) {
    throw new Error(`Modal with name '${name}' not found.`) // name이 유효하지 않으면 에러를 던짐
  }

  const commonModalStyle: ReactModal.Styles = {
    overlay: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(209, 213, 219, 0.5)', // color-bg-disabled 50%
      zIndex: 1000,
      overflow: 'auto',
      padding: '16px',
    },
    content: {
      // position setting
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',

      // size setting
      width: modal?.width,
      height: modal?.height,
      padding: 'none',

      // appearance setting
      background: '#fff', // color-bg-primary
      borderRadius: modal?.hasRounded ? modal?.hasRounded : '0px',
      border: 'none',
      boxShadow: modal?.hasShadow ? '4px 4px 4px rgba(0, 0, 0, 0.25)' : 'none', // 그림자 적용

      // content setting
      overflow: 'visible',
    },
  }

  return (
    <ReactModal
      isOpen={opened}
      onRequestClose={closeRequest}
      shouldCloseOnOverlayClick={isBackdropCloseRequest}
      style={commonModalStyle}
      ariaHideApp={false}
    >
      <div className='flex w-full h-full'>{modal?.modal}</div>
    </ReactModal>
  )
}
