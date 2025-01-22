import AdminGuestForm, { GuestInfo } from './AdminGuestForm';

type AdminGuestTableForm = {
  guestList: GuestInfo[];
  side: 'bride' | 'groom';
  onChange: (id: string, name: string, value: string | number) => void;
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
    <section className="w-full overflow-auto rounded-[16px] p-3 pb-[100px]">
      <table className="w-full min-w-[860px] table-fixed border-collapse text-[18px]">
        <thead>
          <tr>
            <th className="w-[50px]  border-[#686868] px-2 py-1"></th>
            <th className="w-[80px] border-[#686868] px-2 py-1">구분</th>
            <th className="min-w-[150px]  border-[#686868] px-2 py-1">소속</th>
            <th className="min-w-[100px] border-[#686868] px-2 py-1">이름</th>
            <th className="min-w-[130px]  border-[#686868] px-2 py-1">금액</th>
            <th className="w-[80px]  border-[#686868] px-2 py-1">식권</th>
            <th className="min-w-[200px]  border-[#686868] px-2 py-1">비고</th>
            <th className="w-[100px]  border-[#686868] px-2 py-1"></th>
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
          {guestList.length === 0 && (
            <tr>
              <td colSpan={8} className=" px-2 py-1 text-center">
                <br />
                <br />
                <br />
                아직 등록된 하객이 없어요!
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </section>
  );
}
