import clsx from 'clsx';

type InputProps = {
  border?: 'default' | 'none';
  textSize?: '16' | '20' | '24';
  height?: number;
  placeholder?: string;
  isError?: boolean;
  errorMessage?: string;
  className?: string;
} & React.ComponentPropsWithoutRef<'input'>;

export default function Input({
  border = 'default',
  textSize = '24',
  height = 55,
  placeholder = '',
  isError = false,
  errorMessage = '',
  style,
  className = '',
}: InputProps) {
  const inputClass = clsx(
    'rounded-[16px] px-3',
    {
      'border-border-gray border': border === 'default',
      'border-button-red border': isError === true,
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
    <div className="flex flex-col">
      <input
        className={inputClass}
        style={customStyle}
        placeholder={placeholder}
      />
      <p
        className="ml-2 mt-1"
        style={{ color: errorMessage ? 'red' : 'transparent' }}
      >
        {errorMessage}
      </p>
    </div>
  );
}
