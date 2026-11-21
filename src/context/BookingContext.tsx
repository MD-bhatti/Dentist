import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';

type BookingState = {
  open: boolean;
  initialService?: string;
  openModal: (service?: string) => void;
  closeModal: () => void;
};

const BookingContext = createContext<BookingState | null>(null);

export function BookingProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [initialService, setInitialService] = useState<string | undefined>(undefined);

  const openModal = useCallback((service?: string) => {
    setInitialService(service);
    setOpen(true);
  }, []);

  const closeModal = useCallback(() => setOpen(false), []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeModal();
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open, closeModal]);

  const value = useMemo(
    () => ({ open, initialService, openModal, closeModal }),
    [open, initialService, openModal, closeModal],
  );

  return <BookingContext.Provider value={value}>{children}</BookingContext.Provider>;
}

export function useBooking() {
  const ctx = useContext(BookingContext);
  if (!ctx) throw new Error('useBooking must be used within BookingProvider');
  return ctx;
}
