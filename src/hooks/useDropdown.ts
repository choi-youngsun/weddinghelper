import { useState } from 'react';

export const useDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);

  const onOpen = () => setIsOpen(true);
  const onClose = () => setIsOpen(false);
  const onSwitch = () => setIsOpen(!isOpen);

  return { isOpen, onOpen, onClose, onSwitch };
};
