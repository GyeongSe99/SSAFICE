import { useMemo } from 'react'

type SelectedStateElementsProps = {
  selectedState: string
  isOpen: boolean

  actionType?: 'narrow plain' | 'with label' | 'with all' | 'manager'
  // 차례대로 좁은 상태 편집 드롭다운(개별 할일 상태), 할일 간편 등록, 교육생 할일 필터('전체' 옵션 포함)
}

export const SelectedStateElements = ({
  selectedState,
  isOpen,
  actionType,
}: SelectedStateElementsProps) =>
  useMemo(() => {
    // 드롭다운 눌렀을 때 나타나는 옵션들 =======================
    const withAllSelectOption = (isDefaultHover: boolean) => {
      return {
        // actionType === 'with all'일 때만 추가되는 옵션
        label: '전체',
        type: 'ALL',
        isDefaultHover,
        classname:
          'body-xs-medium text-color-text-primary bg-color-bg-interactive-secondary px-spacing-4 py-spacing-2 rounded-radius-4',
      }
    }

    const todoSelectOption = (isDefaultHover: boolean) => {
      return {
        label: '해야 할 일',
        type: 'TODO',
        isDefaultHover,
        classname:
          'min-w-fit body-xs-medium text-color-text-primary bg-color-bg-disabled px-spacing-4 py-spacing-2 rounded-radius-4',
      }
    }

    const inProgressSelectOption = (isDefaultHover: boolean) => {
      return {
        label: '진행 중',
        type: 'IN_PROGRESS',
        isDefaultHover,
        classname:
          'min-w-fit body-xs-medium text-color-text-interactive-inverse bg-color-bg-interactive-primary-hover px-spacing-4 py-spacing-2 rounded-radius-4',
      }
    }

    const managerInProgressSelectOption = (isDefaultHover: boolean) => {
      return {
        label: '처리 중',
        type: 'MANAGER_IN_PROGRESS',
        isDefaultHover,
        classname:
          'min-w-fit body-xs-medium text-color-text-interactive-inverse bg-color-bg-interactive-primary-hover px-spacing-4 py-spacing-2 rounded-radius-4',
      }
    }

    const doneSelectOption = (isDefaultHover: boolean) => {
      return {
        label: '완료',
        type: 'DONE',
        isDefaultHover,
        classname:
          'min-w-fit body-xs-medium text-color-text-disabled-soft bg-color-bg-interactive-success-hover px-spacing-4 py-spacing-2 rounded-radius-4',
      }
    }

    const managerDoneSelectOption = (isDefaultHover: boolean) => {
      return {
        label: '처리 완료',
        type: 'MANAGER_DONE',
        isDefaultHover,
        classname:
          'min-w-fit body-xs-medium text-color-text-disabled-soft bg-color-bg-interactive-success-hover px-spacing-4 py-spacing-2 rounded-radius-4',
      }
    }

    // 드롭다운 라벨 ===========================
    const defaultOption = {
      label: '상태',
      bgClass: `w-fit px-spacing-8 py-spacing-4 rounded-radius-8 ${isOpen ? 'bg-color-bg-interactive-secondary-press' : 'bg-color-bg-interactive-secondary hover:bg-color-bg-interactive-secondary-hover'}`,
      labelClass: 'body-sm-medium text-color-text-primary min-w-fit',
      contents: [
        ...(actionType === 'manager'
          ? [managerInProgressSelectOption(true), managerDoneSelectOption(false)]
          : [todoSelectOption(true), inProgressSelectOption(false), doneSelectOption(false)]),
      ],
    }

    const todoOption = {
      label: '해야 할 일',
      bgClass: `w-fit  ${actionType === 'narrow plain' ? 'px-spacing-6 py-spacing-2 h-[20px]' : 'px-spacing-8 py-spacing-4'}  rounded-radius-8 ${isOpen ? 'bg-color-bg-interactive-disabled-press' : 'bg-color-bg-interactive-disabled hover:bg-color-bg-interactive-disabled-hover'}`,
      labelClass: `${actionType === 'narrow plain' ? 'body-xs-medium' : 'body-sm-medium'} text-color-text-interactive-inverse min-w-fit`,
      contents: [inProgressSelectOption(true), doneSelectOption(false)],
    }

    const inProgressOption = {
      label: '진행 중',
      bgClass: `w-fit  ${actionType === 'narrow plain' ? 'px-spacing-6 py-spacing-2 h-[20px]' : 'px-spacing-8 py-spacing-4'}  rounded-radius-8 min-w-fit ${isOpen ? 'bg-color-bg-interactive-primary-press' : 'bg-color-bg-interactive-primary hover:bg-color-bg-interactive-primary-hover'}`,
      labelClass: `${actionType === 'narrow plain' ? 'body-xs-medium' : 'body-sm-medium'} text-color-text-interactive-inverse min-w-fit`,
      contents: [todoSelectOption(true), doneSelectOption(false)],
    }

    const managerInProgressOption = {
      label: '처리 중',
      bgClass: `w-fit  ${actionType === 'narrow plain' ? 'px-spacing-6 py-spacing-2 h-[20px]' : 'px-spacing-8 py-spacing-4'}  rounded-radius-8 min-w-fit ${isOpen ? 'bg-color-bg-interactive-primary-press' : 'bg-color-bg-interactive-primary hover:bg-color-bg-interactive-primary-hover'}`,
      labelClass: `${actionType === 'narrow plain' ? 'body-xs-medium' : 'body-sm-medium'} text-color-text-interactive-inverse min-w-fit`,
      contents: [managerDoneSelectOption(true)],
    }

    const doneOption = {
      label: '완료',
      bgClass: `w-fit  ${actionType === 'narrow plain' ? 'px-spacing-6 py-spacing-2 h-[20px]' : 'px-spacing-8 py-spacing-4'}  rounded-radius-8 ${isOpen ? 'bg-color-bg-interactive-success-press' : 'bg-color-bg-interactive-success hover:bg-color-bg-interactive-success-hover'}`,
      labelClass: `${actionType === 'narrow plain' ? 'body-xs-medium' : 'body-sm-medium'} text-color-text-interactive-inverse min-w-fit`,
      contents: [todoSelectOption(true), inProgressSelectOption(false)],
    }

    const managerDoneOption = {
      label: '처리 완료',
      bgClass: `w-fit  ${actionType === 'narrow plain' ? 'px-spacing-6 py-spacing-2 h-[20px]' : 'px-spacing-8 py-spacing-4'}  rounded-radius-8 ${isOpen ? 'bg-color-bg-interactive-success-press' : 'bg-color-bg-interactive-success hover:bg-color-bg-interactive-success-hover'}`,
      labelClass: `${actionType === 'narrow plain' ? 'body-xs-medium' : 'body-sm-medium'} text-color-text-interactive-inverse min-w-fit`,
      contents: [managerInProgressSelectOption(true)],
    }

    const allOption = {
      label: '전체',
      bgClass: `w-fit px-spacing-8 py-spacing-4 rounded-radius-8 ${isOpen ? 'bg-color-bg-interactive-secondary-press' : 'bg-color-bg-interactive-secondary hover:bg-color-bg-interactive-secondary-hover'}`,
      labelClass: 'body-sm-medium text-color-text-primary min-w-fit',
      contents: [
        ...(actionType === 'manager'
          ? [managerInProgressSelectOption(true), managerDoneSelectOption(false)]
          : [todoSelectOption(true), inProgressSelectOption(false), doneSelectOption(false)]),
      ],
    }

    switch (selectedState) {
      case 'default':
        return defaultOption

      case 'TODO':
        if (actionType === 'with all') todoOption.contents.push(withAllSelectOption(false))
        return todoOption

      case 'IN_PROGRESS':
        if (actionType === 'with all') inProgressOption.contents.push(withAllSelectOption(false))
        return inProgressOption

      case 'DONE':
        if (actionType === 'with all') doneOption.contents.push(withAllSelectOption(false))
        return doneOption

      // 매니저 화면에서만 노출되는 드롭다운
      case 'MANAGER_IN_PROGRESS':
        managerInProgressOption.contents.push(withAllSelectOption(false))
        return managerInProgressOption

      case 'MANAGER_DONE':
        managerDoneOption.contents.push(withAllSelectOption(false))
        return managerDoneOption

      case 'ALL':
        return allOption
    }
  }, [selectedState, isOpen])
