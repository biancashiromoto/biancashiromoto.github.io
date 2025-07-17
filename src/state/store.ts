import { create } from "zustand";

interface StoreState {
  fadeIn: boolean;
  toggleFadeIn: () => void;
}

export const useCounterStore = create<StoreState>((set) => ({
  fadeIn: false,
  toggleFadeIn: () => set((prevState) => ({ fadeIn: !prevState.fadeIn })),
}));
