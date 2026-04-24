import { create } from 'zustand';

interface UIState {
  activeService: string;
  sidebarOpen: boolean;
  commandPaletteOpen: boolean;
  currentModal: string | null;
  setActiveService: (service: string) => void;
  toggleSidebar: () => void;
  openModal: (modal: string) => void;
  closeModal: () => void;
  setCommandPaletteOpen: (open: boolean) => void;
}

export const useUIStore = create<UIState>((set) => ({
  activeService: 'translator',
  sidebarOpen: true,
  commandPaletteOpen: false,
  currentModal: null,
  setActiveService: (service) => set({ activeService: service }),
  toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
  openModal: (modal) => set({ currentModal: modal }),
  closeModal: () => set({ currentModal: null }),
  setCommandPaletteOpen: (open) => set({ commandPaletteOpen: open }),
}));
