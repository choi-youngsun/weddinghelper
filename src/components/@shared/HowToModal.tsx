import Image from 'next/image';
import Modal from './Modal';
import { useState } from 'react';
import Button from './Button';

type HowToModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function HowToModal({ isOpen, onClose }: HowToModalProps) {
  const [currentPage, setCurrentPage] = useState(0);

  const pages = [
    {
      img: '/images/setting.gif',
      text: '[정보 수정]에서 소속 정보를 설정할 수 있습니다.',
    },
    {
      img: '/images/guest.gif',
      text: '신랑, 신부측 하객을 각각 등록할 수 있습니다.',
    },
    {
      img: '/images/admin.gif',
      text: '[관리자]에서 신랑, 신부측 하객을 각각 관리할 수 있습니다.',
    },
    {
      img: '/images/numbering.gif',
      text: '넘버링된 번호는 변하지 않습니다.\n축의금 봉투 등에 적어 정보 취합에 활용하세요!',
    },
  ];

  const handleNextClick = () => {
    setCurrentPage((prev) => prev + 1);
  };

  const handlePrevClick = () => {
    setCurrentPage((prev) => prev - 1);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <p className="my-[20px] text-center text-md-extraBold">
        어떻게 사용하나요?
      </p>
      <Image
        src={pages[currentPage].img}
        width={700}
        height={600}
        alt="소속 설정 gif"
        unoptimized
      />
      <div className="mt-[10px] flex items-center justify-between ">
        <Button
          onClick={handlePrevClick}
          disabled={currentPage === 0}
          buttonWidth="fitToChildren"
          buttonHeight={40}
          className="px-[10px]"
        >
          이전
        </Button>
        <p
          className="text-center text-md-regular"
          style={{ whiteSpace: 'pre-line' }}
        >
          {pages[currentPage].text}
        </p>
        <Button
          onClick={handleNextClick}
          disabled={currentPage === pages.length - 1}
          buttonWidth="fitToChildren"
          buttonHeight={40}
          className="px-[10px]"
        >
          다음
        </Button>
      </div>
    </Modal>
  );
}
