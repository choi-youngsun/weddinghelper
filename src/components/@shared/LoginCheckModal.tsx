import { useRouter } from 'next/router';
import Button from './Button';
import Modal from './Modal';

type LoginCheckModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function LoginCheckModal({
  isOpen,
  onClose,
}: LoginCheckModalProps) {
  const router = useRouter();

  const handleLoginClick = () => {
    router.push('/login');
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="flex w-[300px] flex-col gap-[50px] pt-[50px]">
        <p className="text-center">로그인이 필요한 페이지입니다!</p>
        <Button onClick={handleLoginClick}>로그인하러 가기</Button>
      </div>
    </Modal>
  );
}
