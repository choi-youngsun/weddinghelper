import { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

export default function Modal({ children, isOpen, onClose }: ModalProps) {
  const [isDragging, setIsDragging] = useState(false);

  // 모달 외부 스크롤 막기 + 스크롤바 너비만큼 여백 추가
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      document.body.style.paddingRight = '-10px'; // 스크롤바 너비만큼 패딩 추가
    } else {
      document.body.style.overflow = '';
      document.body.style.paddingRight = ''; // 패딩 초기화
    }

    return () => {
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  // 드래그 시작과 종료를 추적하여 클릭 여부 결정
  const handleMouseDown = () => setIsDragging(false);
  const handleMouseMove = () => setIsDragging(true);
  const handleMouseUp = (event: React.MouseEvent) => {
    if (!isDragging && event.target === event.currentTarget) {
      onClose?.();
    }
    setIsDragging(false);
  };

  return (
    isOpen &&
    ReactDOM.createPortal(
      <div
        className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
      >
        <div className="relative h-fit min-h-[200px] w-fit min-w-[200px] rounded-[16px] bg-white px-[10px] py-[15px]">
          <button className="absolute right-3 top-1" onClick={onClose}>
            X
          </button>
          {children}
        </div>
      </div>,
      document.body
    )
  );
}
