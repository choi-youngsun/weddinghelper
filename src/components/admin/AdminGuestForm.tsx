import { useState } from 'react';
import Button from '../@shared/Button';
import Input from '../@shared/Input';

export type GuestInfo = {
  id: number;
  userId: number;
  orderNumber: number;
  side: string;
  guestName: string;
  group: string;
  giftAmount: number | string;
  ticketCount: number | string;
  note: string;
};

type BrideAdminFormProps = {
  guest: GuestInfo;
  side?: 'bride' | 'broom';
  isEditMode: boolean;
  onChange: (id: number, name: string, value: string | number) => void;
  onEditClick: (id: number) => void;
  onDeleteClick: (id: number) => void;
};

export default function AdminGuestForm({
  guest,
  side = 'bride',
  isEditMode,
  onChange,
  onEditClick,
  onDeleteClick,
}: BrideAdminFormProps) {
  return (
    <tr key={guest.orderNumber} className="text-center">
      <td className="border-r border-black px-2 py-1">{guest.orderNumber}</td>
      <td className="border-x border-black px-2 py-1">{guest.side}</td>
      <td className="border-x border-black px-2 py-1">
        {isEditMode ? (
          <Input
            name="group"
            value={guest.group}
            onChange={(e) => onChange(guest.id, e.target.name, e.target.value)}
            placeholder="소속 입력"
            height={30}
            className="text-sm"
          />
        ) : (
          guest.group
        )}
      </td>
      <td className="border-x border-black px-2 py-1">
        {isEditMode ? (
          <Input
            name="guestName"
            value={guest.guestName}
            onChange={(e) => onChange(guest.id, e.target.name, e.target.value)}
            placeholder="이름 입력"
            height={30}
            className="text-sm"
          />
        ) : (
          guest.guestName
        )}
      </td>
      <td className="border-x border-black px-2 py-1">
        {isEditMode ? (
          <Input
            name="giftAmount"
            value={guest.giftAmount}
            onChange={(e) => onChange(guest.id, e.target.name, e.target.value)}
            placeholder="입력"
            height={30}
            className="text-sm"
          />
        ) : (
          guest.giftAmount
        )}
      </td>
      <td className="border-x border-black px-2 py-1">
        {isEditMode ? (
          <Input
            name="ticketCount"
            value={guest.ticketCount}
            onChange={(e) => onChange(guest.id, e.target.name, e.target.value)}
            placeholder="입력"
            height={30}
            className="text-sm"
          />
        ) : (
          guest.ticketCount
        )}
      </td>
      <td className="border-x border-black px-2 py-1">
        {isEditMode ? (
          <Input
            name="note"
            value={guest.note}
            onChange={(e) => onChange(guest.id, e.target.name, e.target.value)}
            placeholder="입력"
            height={30}
            className="text-sm"
          />
        ) : (
          guest.note
        )}
      </td>
      <td className="flex gap-1 px-2 py-1">
        <Button
          buttonColor={side === 'bride' ? 'pink' : 'blue'}
          className="text-xs"
          buttonHeight={35}
          onClick={() => onEditClick(guest.id)}
        >
          {isEditMode ? '저장' : '수정'}
        </Button>
        <Button
          buttonColor={side === 'bride' ? 'pink' : 'blue'}
          className="text-xs"
          buttonHeight={35}
          onClick={() => onDeleteClick(guest.id)}
        >
          삭제
        </Button>
      </td>
    </tr>
  );
}
