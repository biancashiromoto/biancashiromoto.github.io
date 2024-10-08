import { create } from 'zustand';
import Utils from '../helpers/classes/Utils';
import Information from '../helpers/classes/Information';

const utils = new Utils();
const ptInformation = new Information("pt");
const enInformation = new Information("en");

interface StoreState {
  enInformation: Information;
  fadeIn: boolean;
  isLanguagePortuguese: boolean;
  ptInformation: Information;
  toggleFadeIn: () => void;
  toggleLanguage: () => void;
  screenWidth: number;
  setScreenWidth: (width: number) => void;
}

export const useCounterStore = create<StoreState>((set) => ({
  enInformation,
  ptInformation,
  isLanguagePortuguese: utils.isLanguagePortuguese(),
  toggleLanguage: () => set((prevState) => ({ isLanguagePortuguese: !prevState.isLanguagePortuguese })),
  fadeIn: false,
  toggleFadeIn: () => set((prevState) => ({ fadeIn: !prevState.fadeIn })),
  screenWidth: window.innerWidth,
  setScreenWidth: (width) => set(() => ({ screenWidth: width })),
}));