import { create } from "zustand";

export type ModalType = "auth";

interface ModalStore {
  isOpen: boolean;
  type: ModalType | null;
  onClose: () => void;
  onOpen: (type: ModalType) => void;
}

export const useModal = create<ModalStore>((set) => ({
  isOpen: false,
  type: null,
  onOpen: (type: ModalType) => set({ isOpen: true, type }),
  onClose: () => set({ isOpen: false }),
}));
