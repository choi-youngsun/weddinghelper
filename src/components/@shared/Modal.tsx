import { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  opacity?: number;
};

/**
 * `Modal` 컴포넌트는 오버레이와 함께 표시되는 모달 창을 렌더링합니다.
 *
 * @param {ModalProps} props - 모달에 전달되는 속성
 * @param {boolean} props.isOpen - 모달의 열림 상태를 나타냅니다.
 * @param {() => void} props.onClose - 모달을 닫는 함수입니다.
 * @param {React.ReactNode} props.children - 모달 내용으로 렌더링할 자식 컴포넌트입니다.
 *
 * @returns {JSX.Element | null} - 열려 있을 경우 모달 요소를 반환하고, 그렇지 않으면 `null`을 반환합니다.
 */
export default function Modal({
  children,
  isOpen,
  onClose,
  opacity = 1,
}: ModalProps) {
  const [isDragging, setIsDragging] = useState(false);

  // 모달 외부 스크롤 막기 + 스크롤바 너비만큼 여백 추가
  useEffect(() => {
    if (isOpen) {
      const scrollbarWidth =
        window.innerWidth - document.documentElement.clientWidth;
      document.body.style.overflow = 'hidden';
      document.body.style.paddingRight = `${scrollbarWidth}px`; // 스크롤바 너비만큼 패딩 추가
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

  return ReactDOM.createPortal(
    <div
      className="fixed inset-0 z-20 flex items-center justify-center bg-black bg-opacity-50"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      role="dialog"
      aria-modal="true"
    >
      <div
        role="document"
        className="relative h-fit min-h-[200px] w-fit min-w-[200px] rounded-[16px] bg-white px-[10px] py-[15px]"
        style={{ opacity: `${opacity}` }}
      >
        <button
          aria-label="Close"
          className="absolute right-3 top-1"
          onClick={onClose}
        >
          X
        </button>
        {children}
      </div>
    </div>,
    document.body
  );
}
