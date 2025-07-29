"use client";

import {
	createContext,
	FC,
	ReactNode,
	useContext,
	useEffect,
	useState,
} from "react";

interface ScrollContextType {
	scrollProgress: number;
}

const ScrollContext = createContext<ScrollContextType>(
	{} as ScrollContextType
);

export const ScrollProvider: FC<{ children: ReactNode }> = ({ children }) => {
	const [scrollProgress, setScrollProgress] = useState(0);

	useEffect(() => {
		const updateScrollProgress = () => {
			const scrollTop = window.scrollY;
			const docHeight = document.documentElement.scrollHeight - window.innerHeight;
			const progress = (scrollTop / docHeight) * 100;
			setScrollProgress(progress);
		};

		window.addEventListener("scroll", updateScrollProgress);
		return () => window.removeEventListener("scroll", updateScrollProgress);
	}, []);

	return (
		<ScrollContext.Provider value={{ scrollProgress }}>
			{children}
		</ScrollContext.Provider>
	);
};

export const useScroll = () => {
	const context = useContext(ScrollContext);
	return context;
};
