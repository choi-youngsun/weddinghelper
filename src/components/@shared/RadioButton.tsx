export type RadioOption = {
  label: string;
  value: string;
};

type RadioButtonProps = {
  options: RadioOption[];
  buttonSize?: number;
  gap?: number;
  handleSelect: (value: string) => void;
  selectedOption: string | null;
} & React.HTMLAttributes<HTMLDivElement>;

/**
 * RadioButton 컴포넌트
 *
 * 주어진 옵션 목록에서 하나를 선택할 수 있는 라디오 버튼 그룹을 렌더링합니다.
 * 각 버튼은 원 형태로, 선택된 옵션은 내부에 작은 원으로 표시됩니다.
 *
 * @param {RadioButtonProps} props - RadioButton 컴포넌트의 속성
 * @param {RadioOption[]} props.options - 라디오 버튼에 표시할 옵션 목록
 * @param {number} [props.buttonSize=30] - 라디오 버튼의 크기 (기본값: 30px)
 * @param {number} [props.gap=10] - 라디오 버튼 사이의 간격 (기본값: 10px)
 * @param {string | null} props.selectedOption - 현재 선택된 옵션의 값
 * @param {(value: string) => void} props.handleSelect - 선택된 옵션의 값을 부모 컴포넌트로 전달하는 콜백 함수
 * @param {string} [props.className] - 추가적인 CSS 클래스 이름
 * @param {React.HTMLAttributes<HTMLDivElement>} [props.rest] - 다른 HTML 속성들
 *
 * @returns {JSX.Element} 라디오 버튼 그룹 JSX 요소
 */
export default function RadioButton({
  options,
  buttonSize = 30,
  gap = 10,
  selectedOption,
  handleSelect,
  className,
  ...rest
}: RadioButtonProps) {
  return (
    <div className={className} {...rest}>
      {options.map((option) => (
        <div
          key={option.value}
          className="flex items-center "
          style={{ gap: `${gap}px` }}
        >
          <button
            onClick={() => handleSelect(option.value)}
            className="relative shrink-0 rounded-full bg-white"
            style={{
              height: `${buttonSize}px`,
              width: `${buttonSize}px`,
            }}
            type="button"
          >
            {selectedOption === option.value && (
              <span
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform rounded-full bg-black"
                style={{
                  height: `${buttonSize / 2}px`,
                  width: `${buttonSize / 2}px`,
                }}
              ></span>
            )}
          </button>
          <p className="shrink-0">{option.label}</p>
        </div>
      ))}
    </div>
  );
}
