import { useModal } from '@/hooks/useModal';
import Button from '../@shared/Button';
import Input from '../@shared/Input';
import ConfirmModal from './ConfirmModal';

export type GuestInfo = {
  _id: string;
  userId: string;
  orderNumber: number;
  side: string;
  guestName: string;
  affiliation: string;
  giftAmount: number | null;
  ticketCount: string | null;
  note: string;
};

type BrideAdminFormProps = {
  guest: GuestInfo;
  side?: 'bride' | 'groom';
  isEditMode: boolean;
  onChange: (id: string, name: string, value: string | number) => void;
  onEditClick: (id: string) => void;
  onDeleteClick: (id: string) => void;
};

export default function AdminGuestForm({
  guest,
  side = 'bride',
  isEditMode,
  onChange,
  onEditClick,
  onDeleteClick,
}: BrideAdminFormProps) {
  const { isOpen, onClose, onOpen } = useModal();

  return (
    <tr
      key={guest.orderNumber}
      className="border-b border-[#45454511] text-center"
    >
      <td className="break-words bg-[#ffffff74] px-2 py-1">
        {guest.orderNumber}
      </td>
      <td className="break-words px-2 py-1">
        {guest.side === 'bride' ? '신부측' : '신랑측'}
      </td>
      <td className="break-words bg-[#ffffff74] px-2 py-1">
        {isEditMode ? (
          <Input
            name="affiliation"
            value={guest.affiliation}
            onChange={(e) => onChange(guest._id, e.target.name, e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                onEditClick(guest._id);
              }
            }}
            placeholder="소속 입력"
            height={30}
            className="text-sm"
          />
        ) : (
          guest.affiliation
        )}
      </td>
      <td className="break-words px-2 py-1 ">
        {isEditMode ? (
          <Input
            name="guestName"
            value={guest.guestName}
            onChange={(e) => onChange(guest._id, e.target.name, e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                onEditClick(guest._id);
              }
            }}
            placeholder="이름 입력"
            height={30}
            className="text-sm"
          />
        ) : (
          guest.guestName
        )}
      </td>
      <td className="break-words bg-[#ffffff74] px-2 py-1">
        {isEditMode ? (
          <Input
            name="giftAmount"
            value={guest.giftAmount ?? ''}
            type="number"
            onChange={(e) => onChange(guest._id, e.target.name, e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                onEditClick(guest._id);
              }
            }}
            placeholder="입력"
            height={30}
            className="text-sm"
          />
        ) : (
          guest.giftAmount
        )}
      </td>
      <td className="break-words px-2 py-1">
        {isEditMode ? (
          <Input
            name="ticketCount"
            value={guest.ticketCount ?? ''}
            type="number"
            onChange={(e) => onChange(guest._id, e.target.name, e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                onEditClick(guest._id);
              }
            }}
            placeholder="입력"
            height={30}
            className="text-sm"
          />
        ) : (
          guest.ticketCount
        )}
      </td>
      <td className="break-words  bg-[#ffffff74] px-2 py-1">
        {isEditMode ? (
          <Input
            name="note"
            value={guest.note}
            onChange={(e) => onChange(guest._id, e.target.name, e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                onEditClick(guest._id);
              }
            }}
            placeholder="입력"
            height={30}
            className="text-sm"
          />
        ) : (
          guest.note
        )}
      </td>
      <td className="px-2 py-1 align-middle">
        <div className="flex justify-center gap-1">
          <Button
            buttonColor={side === 'bride' ? 'pink' : 'blue'}
            className="text-xs"
            buttonHeight={35}
            onClick={() => onEditClick(guest._id)}
          >
            {isEditMode ? '저장' : '수정'}
          </Button>
          <Button
            buttonColor={side === 'bride' ? 'pink' : 'blue'}
            className="text-xs"
            buttonHeight={35}
            onClick={onOpen}
          >
            삭제
          </Button>
          <ConfirmModal
            guestId={guest._id}
            guestName={guest.guestName}
            isOpen={isOpen}
            onClose={onClose}
            onDelete={onDeleteClick}
          />
        </div>
      </td>
    </tr>
  );
}
