"use client";

import React, {
	createContext,
	FC,
	ReactNode,
	useContext,
	useEffect,
	useState,
} from "react";

const WindowResizeContext = createContext<{ width: number }>({ width: 0, });

export const WindowResizeProvider: FC<{ children: ReactNode }> = ({ children, }) => {
	const [width, setWidth] = useState(0);

	useEffect(() => {
		const handleResize = () => setWidth(window.innerWidth);
		setWidth(window.innerWidth);

		window.addEventListener("resize", handleResize);
		return () => {
			window.removeEventListener("resize", handleResize);
		};
	}, []);

	return (
		<WindowResizeContext.Provider value={{ width }}>
			{children}
		</WindowResizeContext.Provider>
	);
};

export const useWindowResize = () => {
	const context = useContext(WindowResizeContext);
	return context;
};
