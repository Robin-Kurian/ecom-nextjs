import { create } from 'zustand';

export type SidebarMode = 'cart' | 'wishlist' | 'login' | 'signup' | null;

interface SidebarState {
  open: boolean;
  mode: SidebarMode;
  openSidebar: (mode: SidebarMode) => void;
  closeSidebar: () => void;
  switchSidebar: (mode: SidebarMode) => void;
}

export const useSidebarStore = create<SidebarState>((set) => ({
  open: false,
  mode: null,
  openSidebar: (mode) => set({ open: true, mode }),
  closeSidebar: () => set({ open: false, mode: null }),
  switchSidebar: (mode) => set((state) => ({ ...state, mode })),
})); 