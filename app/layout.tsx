import CommonLayout from "./CommonLayout";
import type { Metadata } from "next";
import "./globals.scss";
import { LanguageProvider } from "@/app/context/LanguageProvider";
import { WindowResizeProvider } from "@/app/context/WindowResizeProvider";
import { ScrollProvider } from "./context/ScrollProvider";

export const metadata: Metadata = {
	title: "Bianca Shiromoto",
	description: "Portfolio website for Bianca Shiromoto",
};

export default function RootLayout({ children, }: {
  children: React.ReactNode;
}) {
	return (
		<html lang="pt-br">
			<body>
				<WindowResizeProvider>
					<LanguageProvider>
						<ScrollProvider>
							<CommonLayout>
								{children}
							</CommonLayout>
						</ScrollProvider>
					</LanguageProvider>
				</WindowResizeProvider>
			</body>
		</html>
	);
}
