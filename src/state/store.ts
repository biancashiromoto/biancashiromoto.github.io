import { create } from 'zustand';
import Utils from '../helpers/classes/Utils';

const utils = new Utils();

interface StoreState {
  isLanguagePortuguese: boolean;
  toggleLanguage: () => void;
  fadeIn: boolean;
  toggleFadeIn: () => void;
  width: number;
  setWitdth: (width: number) => void;
}

export const useCounterStore = create<StoreState>((set) => ({
  isLanguagePortuguese: utils.isLanguagePortuguese(),
  toggleLanguage: () => set((prevState) => ({ isLanguagePortuguese: !prevState.isLanguagePortuguese })),
  fadeIn: false,
  toggleFadeIn: () => set((prevState) => ({ fadeIn: !prevState.fadeIn })),
  width: window.innerWidth,
  setWitdth: (width) => set(() => ({ width })),
}));