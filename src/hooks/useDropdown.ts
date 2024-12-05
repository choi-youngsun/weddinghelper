import { useState } from 'react';

/**
 * Dropdown 열림 상태를 관리하기 위한 커스텀 훅
 *
 * 열림/닫힘 상태를 관리하고 상태를 토글할 수 있는 메서드를 제공합니다.
 *
 * @returns {Object} 드롭다운 상태와 상태를 변경하는 함수들
 * @property {boolean} isOpen - 드롭다운 열림 상태
 * @property {() => void} onOpen - 드롭다운을 여는 함수
 * @property {() => void} onClose - 드롭다운을 닫는 함수
 * @property {() => void} onSwitch - 드롭다운 상태를 토글하는 함수
 */
export const useDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);

  const onOpen = () => setIsOpen(true);
  const onClose = () => setIsOpen(false);
  const onSwitch = () => setIsOpen(!isOpen);

  return { isOpen, onOpen, onClose, onSwitch };
};
