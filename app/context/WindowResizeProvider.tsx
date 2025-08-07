"use client";

import React, {
	createContext,
	FC,
	ReactNode,
	useContext,
	useEffect,
	useMemo,
	useState,
} from "react";

const WindowResizeContext = createContext<{ width: number, isDesktop: boolean }>({ width: 0, isDesktop: false });

export const WindowResizeProvider: FC<{ children: ReactNode }> = ({ children, }) => {
	const [width, setWidth] = useState(0);

	const isDesktop = useMemo(() => width >= 1024, [width]);

	useEffect(() => {
		const handleResize = () => setWidth(window.innerWidth);
		setWidth(window.innerWidth);

		window.addEventListener("resize", handleResize);
		return () => {
			window.removeEventListener("resize", handleResize);
		};
	}, []);

	return (
		<WindowResizeContext.Provider value={{ width, isDesktop }}>
			{children}
		</WindowResizeContext.Provider>
	);
};

export const useWindowResize = () => {
	const context = useContext(WindowResizeContext);
	return context;
};
