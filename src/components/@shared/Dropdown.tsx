import { ReactNode, useEffect, useRef } from 'react';

/**
 * 드롭다운 옵션 타입
 *
 * @typedef {Object} DropdownOption
 * @property {string} label - 옵션의 표시 텍스트
 * @property {string} value - 옵션의 고유 값
 */
export type DropdownOption = {
  label: string;
  value: string;
};

type DropdownProps = {
  triggerIcon: ReactNode;
  options: DropdownOption[];
  width?: number;
  isOpen: boolean;
  onClose: () => void;
  onSwitch: () => void;
  onOptionClick: (option: DropdownOption) => void;
};

/**
 * Dropdown 컴포넌트
 *
 * 사용자에게 옵션 리스트를 표시하고, 옵션 선택 시 콜백을 호출합니다.
 * 외부 클릭 감지와 스크롤 가능한 드롭다운 메뉴를 지원합니다.
 *
 * @param {DropdownProps} props - Dropdown 컴포넌트의 속성
 * @param {ReactNode} props.triggerIcon - 드롭다운을 열고 닫는 트리거 요소
 * @param {DropdownOption[]} props.options - 드롭다운에서 선택 가능한 옵션 배열
 * @param {number} [props.width] - 드롭다운의 너비 (기본값: 100%)
 * @param {boolean} props.isOpen - 드롭다운 열림 상태
 * @param {() => void} props.onClose - 드롭다운을 닫는 콜백 함수
 * @param {() => void} props.onSwitch - 드롭다운 상태를 토글하는 콜백 함수
 * @param {(option: DropdownOption) => void} props.onOptionClick - 옵션 클릭 시 호출되는 콜백 함수
 *
 * @returns {JSX.Element} Dropdown 컴포넌트 JSX 요소
 */
export function Dropdown({
  options,
  triggerIcon,
  onOptionClick,
  isOpen,
  onClose,
  onSwitch,
  width,
}: DropdownProps) {
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  // 클릭 외부 감지
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    // 전역 클릭 이벤트 리스너 등록
    document.addEventListener('mousedown', handleClickOutside);

    // 컴포넌트 언마운트 시 리스너 제거
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

  return (
    <div className="relative" ref={dropdownRef} onClick={onSwitch}>
      <div>{triggerIcon}</div>
      {isOpen && (
        <div
          style={{ width: `${width || 100}%` }}
          className="border-border-gray absolute right-0 top-[45px] z-10 flex flex-col gap-[1px] rounded-[16px] border bg-[#ffffff] p-2"
        >
          <div className="max-h-[200px] overflow-y-auto">
            {options.map((option, index) => (
              <div className="w-full">
                <div
                  key={option.value}
                  className="text-sm-regular h-[40px] w-full cursor-pointer rounded-[12px] bg-[#ffffff] py-1 text-center hover:bg-[#e4e4e4]"
                  onClick={() => {
                    onOptionClick(option);
                    onClose(); // 드롭다운 닫기
                  }}
                >
                  {option.label}
                </div>
                {/* 마지막 요소가 아닐 때만 구분선 추가 */}
                {index !== options.length - 1 && (
                  <hr className="my-1 border-gray-300" />
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
