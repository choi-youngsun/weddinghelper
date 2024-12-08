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
