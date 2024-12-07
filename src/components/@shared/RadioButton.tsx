import { useState } from 'react';

type RadioOption = {
  label: string;
  value: string | null;
};

type RadioButtonProps = {
  options: RadioOption[];
  buttonSize?: number;
  gap?: number;
} & React.HTMLAttributes<HTMLDivElement>;

export default function RadioButton({
  options,
  buttonSize = 20,
  gap = 10,
  className,
  ...rest
}: RadioButtonProps) {
  const [selectedOption, setSelectedOption] = useState<RadioOption | null>(
    null
  );

  const handleSelect = (option: RadioOption) => {
    setSelectedOption(option);
  };

  return (
    <div className={className} {...rest}>
      {options.map((option) => (
        <div
          key={option.value}
          className="flex items-center "
          style={{ gap: `${gap}px` }}
        >
          <button
            onClick={() => handleSelect(option)}
            className="relative shrink-0 rounded-full bg-white"
            style={{
              height: `${buttonSize}px`,
              width: `${buttonSize}px`,
            }}
          >
            {selectedOption === option && (
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
