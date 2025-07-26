"use client";

import Link from "next/link";
import { useLanguage } from "@/app/context/LanguageProvider";
import styles from "@/app/styles/pages/not-found.module.scss";

export default function NotFound() {
	const { isLanguagePortuguese } = useLanguage();

	const content = {
		pt: {
			title: "404",
			subtitle: "Página não encontrada",
			description: "Ops! A página que você está procurando não existe ou foi movida.",
			buttonText: "Voltar para o início",
		},
		en: {
			title: "404",
			subtitle: "Page not found",
			description: "Oops! The page you're looking for doesn't exist or has been moved.",
			buttonText: "Back to home",
		},
	};

	const currentContent = isLanguagePortuguese ? content.pt : content.en;

	return (
		<div className={styles.notFound}>
			<div className={styles.container}>
				<div className={styles.content}>
					<h1>{currentContent.title}</h1>
					<h2>{currentContent.subtitle}</h2>
					<p>{currentContent.description}</p>
					<Link href="/" className={styles.homeLink}>
						{currentContent.buttonText}
					</Link>
				</div>
				<div className={styles.animation}>
					<div className={styles.glitch}>404</div>
				</div>
			</div>
		</div>
	);
}
