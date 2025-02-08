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
    if (isAuthenticated === undefined) return; // 로딩 중에는 실행하지 않음

    const timeout = setTimeout(() => {
      if (isAuthenticated === false) {
        onOpen();
      }
    }, 1000);

    return () => clearTimeout(timeout); // cleanup 함수 추가
  }, [isAuthenticated, onOpen]);

  return (
    <>
      {children}
      <LoginCheckModal isOpen={isOpen} onClose={onClose} />
    </>
  );
}
