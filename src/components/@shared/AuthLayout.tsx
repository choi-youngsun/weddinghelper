// components/@shared/AuthLayout.tsx
import { useEffect } from 'react';
import { useAuth } from '@/components/@shared/AuthContext';
import { useModal } from '@/hooks/useModal';
import LoginCheckModal from '@/components/@shared/LoginCheckModal';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAuthenticated } = useAuth();
  const { isOpen, onOpen, onClose } = useModal();

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (!isAuthenticated) {
        onOpen();
      }
    }, 1000); // 1초 딜레이

    return () => clearTimeout(timeout); // cleanup 함수 추가
  }, [isAuthenticated, onOpen]);

  return (
    <>
      {children}
      <LoginCheckModal isOpen={isOpen} onClose={onClose} />
    </>
  );
}
