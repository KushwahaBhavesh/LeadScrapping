import { create } from 'zustand';

interface Toast {
    id: string;
    title: string;
    description?: string;
    variant?: 'default' | 'success' | 'error' | 'warning';
    duration?: number;
}

interface Modal {
    id: string;
    isOpen: boolean;
}

interface UIState {
    // Toast notifications
    toasts: Toast[];
    addToast: (toast: Omit<Toast, 'id'>) => void;
    removeToast: (id: string) => void;

    // Modals
    modals: Record<string, boolean>;
    openModal: (id: string) => void;
    closeModal: (id: string) => void;
    toggleModal: (id: string) => void;

    // Global loading states
    globalLoading: boolean;
    setGlobalLoading: (loading: boolean) => void;

    // Sidebar
    sidebarOpen: boolean;
    setSidebarOpen: (open: boolean) => void;
    toggleSidebar: () => void;
}

export const useUIStore = create<UIState>((set) => ({
    // Toasts
    toasts: [],

    addToast: (toast) => {
        const id = Math.random().toString(36).substring(7);
        set((state) => ({
            toasts: [...state.toasts, { ...toast, id }],
        }));

        // Auto-remove after duration
        const duration = toast.duration || 5000;
        setTimeout(() => {
            set((state) => ({
                toasts: state.toasts.filter((t) => t.id !== id),
            }));
        }, duration);
    },

    removeToast: (id) =>
        set((state) => ({
            toasts: state.toasts.filter((t) => t.id !== id),
        })),

    // Modals
    modals: {},

    openModal: (id) =>
        set((state) => ({
            modals: { ...state.modals, [id]: true },
        })),

    closeModal: (id) =>
        set((state) => ({
            modals: { ...state.modals, [id]: false },
        })),

    toggleModal: (id) =>
        set((state) => ({
            modals: { ...state.modals, [id]: !state.modals[id] },
        })),

    // Global loading
    globalLoading: false,
    setGlobalLoading: (loading) => set({ globalLoading: loading }),

    // Sidebar
    sidebarOpen: true,
    setSidebarOpen: (open) => set({ sidebarOpen: open }),
    toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
}));
