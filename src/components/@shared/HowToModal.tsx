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
      img: '/images/excel.gif',
      text: '하객 데이터를 엑셀 파일로 저장할 수도 있습니다.',
    },
    {
      img: '/images/numbering.gif',
      text: '넘버링된 번호는 축의금 봉투에 적어 정보 취합에 활용하세요!',
    },
  ];

  const handleNextClick = () => {
    setCurrentPage((prev) => prev + 1);
  };

  const handlePrevClick = () => {
    setCurrentPage((prev) => prev - 1);
  };

  const handleClose = () => {
    setCurrentPage(0);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose}>
      <div className="flex h-[530px] w-[760px] flex-col justify-between">
        <p className="mt-[20px] text-center text-md-extraBold">
          어떻게 사용하나요?
        </p>
        <Image
          src={pages[currentPage].img}
          width={750}
          height={600}
          alt="설명 gif"
          unoptimized
          className="mx-auto"
          quality={100}
        />
        <div className="flex items-center justify-between ">
          <Button
            onClick={handlePrevClick}
            disabled={currentPage === 0}
            buttonWidth="fitToChildren"
            buttonHeight={40}
            className="px-[10px]"
          >
            이전
          </Button>
          <p className="text-center text-md-regular">
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
      </div>
    </Modal>
  );
}
