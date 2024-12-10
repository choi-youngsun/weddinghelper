import { useEffect, useState } from 'react';
import Modal from '../@shared/Modal';

type SubmitResultModalProps = {
  isOpen: boolean;
  onClose: () => void;
  duration?: number; // 모달 표시 시간 (초)
};

export default function SubmitResultModal({
  isOpen,
  onClose,
  duration = 3,
}: SubmitResultModalProps) {
  const [timeLeft, setTimeLeft] = useState(duration);

  useEffect(() => {
    if (!isOpen) return;

    setTimeLeft(duration); // 모달이 열릴 때 초기화

    const intervalId = setInterval(() => {
      setTimeLeft((prev = 0) => Math.max(prev - 1, 0)); // prev가 undefined일 경우 기본값 0
    }, 1000);

    return () => clearInterval(intervalId);
  }, [isOpen, duration]);

  return (
    <Modal isOpen={isOpen} onClose={onClose} opacity={0.8}>
      <div className="mx-[25px] my-[20px] flex flex-col px-[50px] py-[50px] text-center">
        <p className="mb-[30px] text-lg-regular">제출이 완료되었습니다.</p>
        <p className="mb-[35px] text-lg-regular">방문해주셔서 감사합니다.</p>
        <p className="text-md-regular">{timeLeft}초 뒤 닫힘</p>
      </div>
    </Modal>
  );
}
