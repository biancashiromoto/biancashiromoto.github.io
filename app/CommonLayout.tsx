"use client";

import Image from "next/image";
import QrCode from "@/public/assets/img/qr-code.png";
import Header from "./components/header/header";
import { useLanguage } from "./context/LanguageProvider";
import { useWindowResize } from "./context/WindowResizeProvider";

type CommonLayoutProps = {
  children: React.ReactNode;
};

const CommonLayout = ({ children }: CommonLayoutProps) => {
	const { isLoading } = useLanguage();
	const { isDesktop } = useWindowResize();

	return (
		<div className={!isLoading ? "loaded" : ""}>
			<Header />
			<main>{children}</main>
			{isDesktop && (
				<Image
					src={QrCode}
					alt="QR code"
					width={100}
					height={100}
					className="qr-code"
					style={{
						position: "fixed", bottom: "1rem", right: "1rem", zIndex: 10,
					}}
				/>
			)}
		</div>
	);
};

export default CommonLayout;
