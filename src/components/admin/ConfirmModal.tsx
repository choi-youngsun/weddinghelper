import Button from '../@shared/Button';
import Modal from '../@shared/Modal';

type ConfirmModalProps = {
  guestId: string;
  guestName: string;
  isOpen: boolean;
  onClose: () => void;
  onDelete: (id: string) => void;
};

export default function ConfirmModal({
  guestId,
  guestName,
  isOpen,
  onClose,
  onDelete,
}: ConfirmModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="mx-[25px] my-[20px] flex flex-col text-center">
        <p className="mb-[30px] text-md-regular">정말 삭제하시겠습니까?</p>
        <p>[{guestName}] 하객의 정보가 삭제됩니다.</p>
        <p>삭제 후 되돌릴 수 없습니다.</p>
        <div className="mt-[30px] flex gap-1">
          <Button buttonColor="white" borderColor="gray" onClick={onClose}>
            취소
          </Button>
          <Button
            buttonColor="red"
            textColor="white"
            textSize="16_bold"
            onClick={() => {
              onDelete(guestId);
              onClose();
            }}
          >
            삭제
          </Button>
        </div>
      </div>
    </Modal>
  );
}
