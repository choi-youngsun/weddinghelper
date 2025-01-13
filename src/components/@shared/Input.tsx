import clsx from 'clsx';

type InputProps = {
  border?: 'default' | 'none';
  textSize?: '16' | '20' | '24';
  height?: number;
  placeholder?: string;
  errorMessage?: string | null;
  className?: string;
} & React.ComponentPropsWithoutRef<'input'>;

/**
 * 재사용 가능한 Input 컴포넌트입니다.
 * 다양한 스타일과 에러 메시지 렌더링을 지원합니다.
 *
 * @param {Object} props - 컴포넌트 속성
 * @param {'default' | 'none'} [props.border='default'] - Input의 테두리 스타일. 'default'는 기본 테두리를, 'none'은 테두리를 제거합니다.
 * @param {'16' | '20' | '24'} [props.textSize='24'] - Input의 텍스트 크기. 픽셀 단위로 지정됩니다.
 * @param {number} [props.height=55] - Input의 높이. 기본값은 55px입니다.
 * @param {string} [props.placeholder=''] - Input에 표시할 placeholder 텍스트.
 * @param {string} [props.errorMessage] - 에러가 발생했을 때 표시할 메시지. 에러가 없을 경우 표시되지 않습니다.
 * @param {string} [props.className] - Tailwind CSS 클래스 또는 추가 커스텀 클래스를 정의합니다.
 * @param {React.CSSProperties} [props.style] - 인라인 스타일을 적용합니다.
 * @param {React.ComponentPropsWithoutRef<'input'>} inputAttributes - 기본 HTML input 속성을 포함합니다.
 * @returns {JSX.Element} 스타일링된 Input 컴포넌트를 반환합니다.
 */
export default function Input({
  border = 'default',
  textSize = '24',
  height = 55,
  placeholder = '',
  errorMessage = '',
  style,
  className = '',
  ...inputAttributes
}: InputProps) {
  const inputClass = clsx(
    'w-full rounded-[16px] px-3',
    {
      'border border-border-gray': border === 'default',
      'border border-button-red': !!errorMessage,
      'text-[16px]': textSize === '16',
      'text-[20px]': textSize === '20',
      'text-[24px]': textSize === '24',
    },
    className
  );

  const customStyle = {
    height: height ? `${height}px` : '55px',
    ...style,
  };

  return (
    <div className="flex w-full flex-col">
      <input
        className={inputClass}
        style={customStyle}
        placeholder={placeholder}
        {...inputAttributes}
      />
      {errorMessage && (
        <p className="ml-2 mt-1 text-button-red">{errorMessage}</p>
      )}
    </div>
  );
}
