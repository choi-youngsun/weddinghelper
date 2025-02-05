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
    <section className="w-full overflow-auto rounded-[16px] p-3 pb-[20px]">
      <table className="w-full min-w-[700px] table-fixed border-collapse text-[18px]">
        <thead>
          <tr className="border-b border-[#686868]">
            <th className="w-[50px] px-2 py-1"></th>
            <th className="min-w-[80px] px-2 py-1">소속</th>
            <th className="min-w-[100px]px-2 py-1">이름</th>
            <th className="min-w-[130px] px-2 py-1">금액</th>
            <th className="w-[80px] px-2 py-1">식권</th>
            <th className="min-w-[200px] px-2 py-1">비고</th>
            <th className="w-[100px] px-2 py-1"></th>
          </tr>
        </thead>
        <tbody>
          {guestList?.map((guest, index) => (
            <AdminGuestForm
              guest={guest}
              key={guest.orderNumber}
              side={side}
              isEditMode={editModeId === guest._id}
              onChange={onChange}
              onEditClick={onEditClick}
              onDeleteClick={onDeleteClick}
              className={index % 2 === 0 ? 'bg-[#ffffff8e]' : ''}
            />
          ))}
          {guestList.length === 0 && (
            <tr>
              <td colSpan={8} className=" px-2 py-1 text-center">
                <br />
                <br />
                <br />
                <br />
                <br />
                아직 등록된 하객이 없어요!
                <br />
                <br />
                <br />
                <br />
                <br />
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </section>
  );
}
