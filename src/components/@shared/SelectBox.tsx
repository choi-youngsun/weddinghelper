import { Dropdown, DropdownOption } from './Dropdown';
import { useDropdown } from '@/hooks/useDropdown';
import Image from 'next/image';

type SelectBoxProps = {
  options: DropdownOption[];
  width?: number;
  height?: number;
  selectedOption: DropdownOption | null;
  handleSelect: (selectedValue: DropdownOption) => void; // 부모로 값을 전달하기 위한 콜백
} & React.HTMLAttributes<HTMLDivElement>;

/**
 * SelectBox 컴포넌트
 *
 * 드롭다운 형태로 선택 가능한 옵션을 표시하며, 선택된 옵션을 표시합니다.
 *
 * @param {SelectBoxProps} props - SelectBox 컴포넌트의 속성
 * @param {DropdownOption[]} props.options - 선택 가능한 옵션 배열
 * @param {number} [props.width] - SelectBox의 너비 (기본값: 100%)
 *
 * @returns {JSX.Element} SelectBox 컴포넌트 JSX 요소
 */
export default function SelectBox({
  options,
  width,
  height = 55,
  handleSelect,
  selectedOption,
  className,
  ...rest
}: SelectBoxProps) {
  const { isOpen, onClose, onSwitch } = useDropdown();

  const SelectBoxTrigger = (
    <div
      className="flex cursor-pointer items-center justify-between rounded-[16px] border border-border-gray bg-white px-3 py-[5px]"
      style={{ width: `${width}px` || '100%', height: `${height}px` }}
    >
      <p>{selectedOption?.label || '선택하기'}</p>
      <div className="w-[18px]">
        <Image
          src={isOpen ? '/icons/triangle_up.png' : '/icons/triangle_down.png'}
          alt="삼각형 아이콘"
          width={30}
          height={10}
        />
      </div>
    </div>
  );

  return (
    <Dropdown
      onOptionClick={handleSelect}
      options={options}
      triggerIcon={SelectBoxTrigger}
      width={width}
      isOpen={isOpen}
      onClose={onClose}
      onSwitch={onSwitch}
      className={className}
      {...rest}
    />
  );
}
