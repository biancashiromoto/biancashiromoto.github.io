"use client";

import Header from "./components/header/header";

type CommonLayoutProps = {
  children: React.ReactNode;
};

const CommonLayout = ({ children }: CommonLayoutProps) => {
	return (
		<>
			<Header />
			<main>{children}</main>
		</>
	);
};

export default CommonLayout;
