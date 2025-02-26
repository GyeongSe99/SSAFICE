import { AlertLogo, ExitButton } from '@/assets/svg'

type LoginErrorModalProps = {
  errorType: 'EmailValidFalse' | 'LoginFail'
  closeRequest: () => void
}
export const LoginErrorModal = ({ errorType, closeRequest }: LoginErrorModalProps) => {
  return (
    <div
      className='
      flex flex-col gap-spacing-10
      w-full h-full pt-spacing-32 px-[39px] pb-spacing-64
    '
    >
      <div className='flex w-full justify-end'>
        <div
          className='flex w-spacing-12 h-spacing-20 hover:cursor-pointer'
          onClick={closeRequest}
          role='presentation'
        >
          <ExitButton />
        </div>
      </div>

      <div className='flex w-full h-full justify-center gap-[51px]'>
        <div className='flex w-[130px] h-full items-center'>
          <div className='flex w-[130px] h-full items-center'>
            <AlertLogo />
          </div>
        </div>

        <div className='flex w-full h-full items-center whitespace-pre-line'>
          <div className='flex body-lg-semibold text-color-text-primary text-center'>
            {errorType === 'EmailValidFalse' && '유효하지 않은 이메일입니다.'}
            {errorType === 'LoginFail' && `이메일 또는\n비밀번호가 틀렸습니다.`}
          </div>
        </div>
      </div>
    </div>
  )
}
