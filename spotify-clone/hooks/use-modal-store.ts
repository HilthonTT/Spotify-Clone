import { ProductWithPrice } from "@/types";
import { create } from "zustand";

export type ModalType = "auth" | "upload" | "subscribe";

interface ModalData {
  productWithPrices?: ProductWithPrice[];
}

interface ModalStore {
  isOpen: boolean;
  data: ModalData;
  type: ModalType | null;
  onClose: () => void;
  onOpen: (type: ModalType, data?: ModalData) => void;
}

export const useModal = create<ModalStore>((set) => ({
  isOpen: false,
  type: null,
  data: {},
  onOpen: (type, data = {}) => set({ isOpen: true, type, data }),
  onClose: () => set({ isOpen: false, data: {}, type: null }),
}));
