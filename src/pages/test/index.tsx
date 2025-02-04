import Button from '@/components/@shared/Button';
import Input from '@/components/@shared/Input';
import Modal from '@/components/@shared/Modal';
import RadioButton from '@/components/@shared/RadioButton';
import { useModal } from '@/hooks/useModal';
import { useRadioButton } from '@/hooks/useRadioButton';

export default function Test() {
  const { isOpen, onClose, onOpen } = useModal();
  const { selectedOption, handleSelect } = useRadioButton();

  const radioOptions = [
    { label: '1', value: '1' },
    { label: '2', value: '2' },
    { label: '3', value: '3' },
    { label: '4', value: '4' },
    { label: '5', value: '5' },
    { label: '그이상', value: '' },
  ];

  return (
    <main className="grid grid-cols-3 items-center gap-4 p-5">
      <Button className="mt-[60px]">버튼!!!!</Button>
      <Button className="mt-[60px]" buttonColor="blue">
        버튼!!!!
      </Button>
      <Button className="mt-[60px]" buttonColor="pink">
        버튼!!!!
      </Button>
      <Button buttonColor="green">버튼!!!!</Button>
      <Button buttonColor="red" textColor="white" textWeight="bold" disabled>
        버튼!!!!
      </Button>
      <Button buttonColor="white" borderColor="shadow">
        버튼!!!!
      </Button>
      <Button
        buttonStyle="round"
        buttonWidth="fitToChildren"
        buttonHeight={40}
        buttonColor="pink"
        className="px-2"
      >
        수정
      </Button>
      <Button
        buttonStyle="left-round"
        buttonWidth="fitToChildren"
        buttonHeight={40}
        textColor="white"
        textSize="16_bold"
        className="px-4"
      >
        신부측
      </Button>
      <Button
        buttonStyle="left-round"
        buttonColor="white"
        buttonWidth="fitToChildren"
        buttonHeight={40}
        className="px-4"
      >
        신랑측
      </Button>
      <Button buttonColor="white" borderColor="gray">
        취소
      </Button>
      <Button buttonColor="red" textColor="white" textWeight="bold">
        삭제
      </Button>
      <Input border="none" height={40} />
      <Input placeholder="이름을 입력해주세요" />
      <Input
        placeholder="이름을 입력해주세요"
        errorMessage="이름은 필수 항목입니다!"
      />
      <button onClick={onOpen}>모달열기!</button>
      <Modal isOpen={isOpen} onClose={onClose}>
        모달 내부
      </Modal>
      <RadioButton
        options={radioOptions}
        selectedOption={selectedOption}
        handleSelect={handleSelect}
        className="grid grid-cols-2 gap-10 text-2xl"
        buttonSize={50}
        gap={20}
      />
    </main>
  );
}
