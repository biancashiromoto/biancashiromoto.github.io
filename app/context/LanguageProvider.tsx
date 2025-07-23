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
		const savedLanguage = typeof localStorage !== "undefined"
			? localStorage.getItem("preferredLanguage")
			: null;

		if (savedLanguage && (savedLanguage === "pt" || savedLanguage === "en")) {
			setLanguage(savedLanguage as Language);
		} else {
			setLanguage(utils.isLanguagePortuguese() ? "pt" : "en");
		}
	}, [utils]);

	const toggleLanguage = useCallback(() => {
		setLanguage((prev) => {
			const newLanguage = prev === "pt" ? "en" : "pt";
			if (typeof localStorage !== "undefined") {
				localStorage.setItem("preferredLanguage", newLanguage);
			}
			return newLanguage;
		});
	}, []);

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
