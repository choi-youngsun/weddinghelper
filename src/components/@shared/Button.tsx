import clsx from 'clsx';

type ButtonProps = {
  buttonStyle?: 'square' | 'round' | 'left-round';
  buttonWidth?: 'fitToChildren' | 'fitToParent';
  buttonColor?: 'yellow' | 'red' | 'pink' | 'blue' | 'green' | 'white';
  textColor?: 'white' | 'black' | 'gray';
  textSize?: '16' | '20' | '24' | '16_bold' | '20_bold';
  textWeight?: 'regular' | 'bold';
  borderColor?: 'yellow' | 'gray' | 'none' | 'shadow';
  type?: 'button' | 'submit' | 'reset';
  buttonHeight?: number;
  className?: string;
  children: React.ReactNode;
} & React.ComponentPropsWithoutRef<'button'>;

/**
 * 다양한 스타일링 옵션을 제공하는 커스터마이징 가능한 버튼 컴포넌트입니다.
 *
 * @param {Object} props - 버튼 컴포넌트의 속성입니다.
 * @param {'square' | 'round' | 'left-round'} [props.buttonStyle='square'] - 버튼의 모양을 정의합니다.
 *        - `square`: 기본 스타일로 약간의 둥근 모서리를 가진 사각형 버튼입니다.
 *        - `round`: 전체가 둥근 모양의 버튼입니다.
 *        - `left-round`: 좌측 모서리만 둥근 버튼입니다.
 * @param {'fitToChildren' | 'fitToParent'} [props.buttonWidth='fitToParent'] - 버튼의 너비를 정의합니다.
 *        - `fitToChildren`: 버튼 내용에 맞춰 너비가 조정됩니다.
 *        - `fitToParent`: 부모 요소의 너비를 채웁니다.
 * @param {'yellow' | 'red' | 'pink' | 'blue' | 'green' | 'white'} [props.buttonColor='yellow'] - 버튼의 배경색을 정의합니다.
 * @param {'white' | 'black'} [props.textColor='black'] - 버튼 텍스트의 색상을 정의합니다.
 * @param {'16' | '20' | '24' | '16_bold' | '20_bold'} [props.textSize='16'] - 텍스트의 크기를 정의합니다.
 *        - `16`: 작은 크기의 텍스트입니다.
 *        - `20`: 중간 크기의 텍스트입니다.
 *        - `24`: 큰 크기의 텍스트입니다.
 * @param {'regular' | 'bold'} [props.textWeight='regular'] - 텍스트의 굵기를 정의합니다.
 * @param {'yellow' | 'gray' | 'none' | 'shadow'} [props.borderColor='none'] - 버튼 테두리의 색상 또는 그림자 효과를 정의합니다.
 * @param {number} [props.buttonHeight=50] - 버튼의 높이를 정의합니다(단위: 픽셀).
 * @param {string} [props.className] - 추가적인 클래스명을 설정할 수 있습니다.
 * @param {React.ReactNode} props.children - 버튼 내부에 렌더링할 내용을 정의합니다.
 * @param {React.CSSProperties} [props.style] - 추가적인 인라인 스타일을 정의할 수 있습니다.
 * @param {boolean} [props.disabled=false] - 버튼의 비활성화 여부를 설정합니다.
 * @param {Object} [props.buttonAttributes] - 추가적으로 전달할 버튼의 속성입니다.
 *
 * @returns {JSX.Element} 커스터마이징된 버튼 요소를 반환합니다.
 */

export default function Button({
  buttonStyle = 'square',
  buttonWidth = 'fitToParent',
  buttonHeight = 50,
  buttonColor = 'yellow',
  textColor = 'black',
  textSize = '16',
  type = 'button',
  borderColor = 'none',
  className,
  style,
  children,
  disabled,
  ...buttonAttributes
}: ButtonProps) {
  const buttonClass = clsx(
    'base-class',
    {
      'bg-button-yellow hover:scale-105 active:bg-pressed-yellow':
        !disabled && buttonColor === 'yellow',
      'bg-button-pink hover:scale-105 active:bg-pressed-pink':
        !disabled && buttonColor === 'pink',
      'bg-button-blue hover:scale-105 active:bg-pressed-blue':
        !disabled && buttonColor === 'blue',
      'bg-button-red hover:scale-105 active:brightness-95':
        !disabled && buttonColor === 'red',
      'bg-button-green hover:scale-105 active:brightness-95':
        !disabled && buttonColor === 'green',
      'bg-text-white hover:scale-105 active:brightness-95':
        !disabled && buttonColor === 'white',
      'border-button-yellow': borderColor === 'yellow',
      'border-[1px] border-text-gray': borderColor === 'gray',
      'shadow-right-bottom': borderColor === 'shadow',
      'rounded-[12px]': buttonStyle === 'square',
      'rounded-[20px]': buttonStyle === 'round',
      'rounded-bl-[16px] rounded-tl-[16px]': buttonStyle === 'left-round',
      'text-text-black': textColor === 'black',
      'text-text-white': textColor === 'white',
      'text-text-gray': textColor === 'gray',
      'text-sm-regular': textSize === '16',
      'text-md-regular': textSize === '20',
      'text-lg-regular': textSize === '24',
      'text-sm-extraBold': textSize === '16_bold',
      'text-md-extraBold': textSize === '20_bold',
      'w-full': buttonWidth === 'fitToParent',
      'w-fit': buttonWidth === 'fitToChildren',
    },
    className
  );

  const customStyle = {
    height: buttonHeight ? `${buttonHeight}px` : '50px',
    backgroundColor: disabled ? '#b0afaf' : undefined,
    ...style,
  };

  return (
    <button
      type={type}
      className={buttonClass}
      style={customStyle}
      disabled={disabled}
      {...buttonAttributes}
    >
      {children}
    </button>
  );
}
