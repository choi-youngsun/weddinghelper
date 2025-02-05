import { postGroomGuestInfo } from '@/api/guest/guestAPI';
import GuestPage from '@/components/guest/GuestPage';

export default function GuestGroomPage() {
  return <GuestPage side="groom" postGuestInfo={postGroomGuestInfo} />;
}
