"use client";

import Header from "./components/header/header";
import { useLanguage } from "./context/LanguageProvider";

type CommonLayoutProps = {
  children: React.ReactNode;
};

const CommonLayout = ({ children }: CommonLayoutProps) => {
	const { isLoading } = useLanguage();

	return (
		<div className={!isLoading ? "loaded" : ""}>
			<Header />
			<main>{children}</main>
		</div>
	);
};

export default CommonLayout;
