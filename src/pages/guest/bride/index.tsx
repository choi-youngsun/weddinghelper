import { postBrideGuestInfo } from '@/api/guest/guestAPI';
import GuestPage from '@/components/guest/GuestPage';

export default function GuestBridePage() {
  return <GuestPage side="bride" postGuestInfo={postBrideGuestInfo} />;
}
