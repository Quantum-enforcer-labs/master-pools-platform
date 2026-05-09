import { create } from "zustand";

interface Notification {
  id: string;
  type: "success" | "error" | "info" | "warning";
  title: string;
  message?: string;
  createdAt: Date;
}

interface UIState {
  // UI state (no theme)

  // Chat
  chatOpen: boolean;
  activeConversationId: string | null;
  setChatOpen: (open: boolean) => void;
  setActiveConversation: (id: string | null) => void;

  // Mobile menu
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;

  // Sidebar (admin)
  sidebarCollapsed: boolean;
  toggleSidebar: () => void;

  // Command palette
  commandPaletteOpen: boolean;
  setCommandPaletteOpen: (open: boolean) => void;

  // Global search
  globalSearch: string;
  setGlobalSearch: (q: string) => void;

  // Notifications
  notifications: Notification[];
  addNotification: (n: Omit<Notification, "id" | "createdAt">) => void;
  removeNotification: (id: string) => void;
  clearNotifications: () => void;
}

export const useUIStore = create<UIState>((set, get) => {
  return {
    // theme removed

    chatOpen: false,
    activeConversationId: null,
    setChatOpen: (chatOpen) => set({ chatOpen }),
    setActiveConversation: (activeConversationId) =>
      set({ activeConversationId }),

    mobileMenuOpen: false,
    setMobileMenuOpen: (mobileMenuOpen) => set({ mobileMenuOpen }),

    sidebarCollapsed: false,
    toggleSidebar: () =>
      set((s) => ({ sidebarCollapsed: !s.sidebarCollapsed })),

    commandPaletteOpen: false,
    setCommandPaletteOpen: (commandPaletteOpen) => set({ commandPaletteOpen }),

    globalSearch: "",
    setGlobalSearch: (globalSearch) => set({ globalSearch }),

    notifications: [],
    addNotification: (n) => {
      const id = Math.random().toString(36).slice(2);
      set((s) => ({
        notifications: [
          { ...n, id, createdAt: new Date() },
          ...s.notifications,
        ].slice(0, 10),
      }));
      setTimeout(() => get().removeNotification(id), 5000);
    },
    removeNotification: (id) =>
      set((s) => ({
        notifications: s.notifications.filter((n) => n.id !== id),
      })),
    clearNotifications: () => set({ notifications: [] }),
  };
});
