import { create } from 'zustand';
import Utils from '../helpers/classes/Utils';

const utils = new Utils();

interface StoreState {
  isLanguagePortuguese: boolean;
  toggleLanguage: () => void;
  fadeIn: boolean;
  toggleFadeIn: () => void;
  screenWidth: number;
  setScreenWidth: (width: number) => void;
}

export const useCounterStore = create<StoreState>((set) => ({
  isLanguagePortuguese: utils.isLanguagePortuguese(),
  toggleLanguage: () => set((prevState) => ({ isLanguagePortuguese: !prevState.isLanguagePortuguese })),
  fadeIn: false,
  toggleFadeIn: () => set((prevState) => ({ fadeIn: !prevState.fadeIn })),
  screenWidth: window.innerWidth,
  setScreenWidth: (width) => set(() => ({ screenWidth: width })),
}));