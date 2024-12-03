import clsx from 'clsx';

type ButtonProps = {
  buttonStyle?: 'square' | 'round' | 'left-round';
  buttonWidth?: 'fitToChildren' | 'fitToParent';
  buttonColor?: 'yellow' | 'red' | 'pink' | 'blue' | 'green' | 'white';
  textColor?: 'white' | 'black';
  textSize?: '16' | '20' | '24';
  textWeight?: 'regular' | 'bold';
  borderColor?: 'yellow' | 'gray' | 'none' | 'shadow';
  buttonHeight?: number;
  className?: string;
  children: React.ReactNode;
} & React.ComponentPropsWithoutRef<'button'>;

export default function Button({
  buttonStyle = 'square',
  buttonWidth = 'fitToParent',
  buttonHeight = 50,
  buttonColor = 'yellow',
  textColor = 'black',
  textSize = '16',
  textWeight = 'regular',
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
      'bg-button-yellow active:bg-pressed-yellow hover:scale-105':
        !disabled && buttonColor === 'yellow',
      'bg-button-pink active:bg-pressed-pink hover:scale-105':
        !disabled && buttonColor === 'pink',
      'bg-button-blue active:bg-pressed-blue hover:scale-105':
        !disabled && buttonColor === 'blue',
      'bg-button-red hover:scale-105 active:brightness-95':
        !disabled && buttonColor === 'red',
      'bg-button-green hover:scale-105 active:brightness-95':
        !disabled && buttonColor === 'green',
      'bg-text-white hover:scale-105 active:brightness-95':
        !disabled && buttonColor === 'white',
      'border-button-yellow': borderColor === 'yellow',
      'border-text-gray border-[1px]': borderColor === 'gray',
      'shadow-right-bottom': borderColor === 'shadow',
      'rounded-[12px]': buttonStyle === 'square',
      'rounded-[16px]': buttonStyle === 'round',
      'rounded-bl-[16px] rounded-tl-[16px]': buttonStyle === 'left-round',
      'text-text-black': textColor === 'black',
      'text-text-white': textColor === 'white',
      'text-sm-regular': textSize === '16',
      'text-md-regular': textSize === '20',
      'text-lg-regular': textSize === '24',
      'text-sm-extraBold': textSize === '16' && textWeight === 'bold',
      'text-md-extraBold': textSize === '20' && textWeight === 'bold',
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
      type="button"
      className={buttonClass}
      style={customStyle}
      disabled={disabled}
      {...buttonAttributes}
    >
      {children}
    </button>
  );
}
