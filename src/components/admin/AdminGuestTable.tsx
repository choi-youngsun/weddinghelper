import AdminGuestForm, { GuestInfo } from './AdminGuestForm';

type AdminGuestTableForm = {
  guestList: GuestInfo[];
  side: 'bride' | 'broom';
  onChange: (id: number, name: string, value: string | number) => void;
  editModeId: string | null;
  onEditClick: (id: string) => void;
  onDeleteClick: (id: string) => void;
};

export default function AdminGuestTable({
  guestList,
  side = 'bride',
  onChange,
  editModeId,
  onEditClick,
  onDeleteClick,
}: AdminGuestTableForm) {
  return (
    <section className="w-full overflow-auto rounded-[16px] bg-[#ffffff40] p-3 pb-[100px]">
      <table className="w-full min-w-[860px] table-fixed border-collapse text-[18px]">
        <thead>
          <tr>
            <th className="w-[50px] border-b border-r border-black px-2 py-1"></th>
            <th className="w-[80px] border-x border-b border-black px-2 py-1">
              구분
            </th>
            <th className="min-w-[150px] border-x border-b border-black px-2 py-1">
              소속
            </th>
            <th className="min-w-[100px] border-x border-b border-black px-2 py-1">
              이름
            </th>
            <th className="min-w-[130px] border-x border-b border-black px-2 py-1">
              금액
            </th>
            <th className="w-[80px] border-x border-b border-black px-2 py-1">
              식권
            </th>
            <th className="min-w-[200px] border-x border-b border-black px-2 py-1">
              비고
            </th>
            <th className="w-[100px] border-b border-black px-2 py-1"></th>
          </tr>
        </thead>
        <tbody>
          {guestList?.map((guest) => (
            <AdminGuestForm
              guest={guest}
              key={guest.orderNumber}
              side={side}
              isEditMode={editModeId === guest._id}
              onChange={onChange}
              onEditClick={onEditClick}
              onDeleteClick={onDeleteClick}
            />
          ))}
        </tbody>
      </table>
    </section>
  );
}
