import Button from '../@shared/Button';
import { DropdownOption } from '../@shared/Dropdown';
import Input from '../@shared/Input';
import RadioButton from '../@shared/RadioButton';
import SelectBox from '../@shared/SelectBox';
import SubmitResultModal from './SubmitResultModal';

type GuestFormProps = {
  side: string;
  nameValue: string;
  onNameChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  groupOptions: DropdownOption[];
  selectedGroupOption: DropdownOption | null;
  selectedTicketOption: string | null;
  handleGroupSelect: (value: DropdownOption) => void;
  handleTicketSelect: (value: string) => void;
  onSubmit: () => void;
  isOpen: boolean;
  onClose: () => void;
};

export default function GuestForm({
  side = 'bride',
  nameValue,
  onNameChange,
  groupOptions,
  selectedGroupOption,
  selectedTicketOption,
  handleGroupSelect,
  handleTicketSelect,
  onSubmit,
  isOpen,
  onClose,
}: GuestFormProps) {
  const radioOption = [
    { label: '0', value: '0' },
    { label: '1', value: '1' },
    { label: '2', value: '2' },
    { label: '3', value: '3' },
    { label: '4', value: '4' },
    { label: '그이상', value: '' },
  ];

  const isAllInputFilled = () => {
    return (
      nameValue !== '' &&
      selectedGroupOption !== null &&
      selectedTicketOption !== null
    );
  };

  return (
    <div className="mx-auto pb-[100px] md:w-[500px]">
      <form className="flex w-full flex-col gap-[30px] px-[30px]">
        <p className="mt-[150px] text-center text-xl-regular">
          {side === 'bride' ? '신부측' : '신랑측'}
        </p>
        <div>
          <p className="mb-[20px] text-md-regular">이름</p>
          <Input
            placeholder="이름을 입력하세요."
            name="name"
            value={nameValue}
            onChange={onNameChange}
          />
        </div>
        <div>
          <p className="mb-[20px] text-md-regular">소속</p>
          <SelectBox
            options={groupOptions}
            className="text-md-regular"
            selectedOption={selectedGroupOption}
            handleSelect={handleGroupSelect}
          />
        </div>
        <div>
          <p className="mb-[20px] text-md-regular">식권</p>
          <RadioButton
            options={radioOption}
            selectedOption={selectedTicketOption}
            handleSelect={handleTicketSelect}
            className="grid grid-cols-2 gap-10 text-xl"
          />
        </div>
        <Button
          onClick={onSubmit}
          buttonColor={side === 'bride' ? 'pink' : 'blue'}
          textSize="20"
          buttonHeight={60}
          disabled={!isAllInputFilled()}
          className="mt-[30px]"
        >
          제출
        </Button>
        <SubmitResultModal isOpen={isOpen} onClose={onClose} />
      </form>
    </div>
  );
}
