import { ReactNode, useEffect, useRef, useState } from 'react';

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
