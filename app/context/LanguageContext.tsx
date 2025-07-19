"use client";

import {
	createContext,
	FC,
	ReactNode,
	useCallback,
	useContext,
	useLayoutEffect,
	useMemo,
	useState,
} from "react";
import Information from "../helpers/classes/Information";
import Utils from "../helpers/classes/Utils";

type Language = "pt" | "en";

interface LanguageContextProps {
  isLanguagePortuguese: boolean;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  information: Information;
}

const LanguageContext = createContext<LanguageContextProps>(
  {} as LanguageContextProps
);

export const LanguageProvider: FC<{ children: ReactNode }> = ({ children }) => {
	const utils = new Utils();
	const [language, setLanguage] = useState<Language>("en");

	useLayoutEffect(() => {
		setLanguage(utils.isLanguagePortuguese() ? "pt" : "en");
	}, []);

	const toggleLanguage = useCallback(() => {
		setLanguage((prev) => (prev === "pt" ? "en" : "pt"));
	}, [setLanguage]);

	const information = useMemo(() => {
		return language === "pt" ? new Information("pt") : new Information("en");
	}, [language]);

	return (
		<LanguageContext.Provider
			value={{
				isLanguagePortuguese: language === "pt",
				setLanguage,
				toggleLanguage,
				information,
			}}
		>
			{children}
		</LanguageContext.Provider>
	);
};

export const useLanguage = () => {
	const context = useContext(LanguageContext);
	return context;
};
