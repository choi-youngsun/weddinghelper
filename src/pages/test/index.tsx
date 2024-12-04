import Button from '@/components/@shared/Button';
import Input from '@/components/@shared/Input';
import Modal from '@/components/@shared/Modal';
import { useModal } from '@/hooks/useModal';

export default function Test() {
  const { isOpen, onClose, onOpen } = useModal();

  return (
    <main className="grid grid-cols-3 items-center gap-4 bg-[#ededed] p-5">
      <Button>버튼!!!!</Button>
      <Button buttonColor="blue">버튼!!!!</Button>
      <Button buttonColor="pink">버튼!!!!</Button>
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
        textWeight="bold"
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
    </main>
  );
}
