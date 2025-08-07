"use client";

import styles from "@/app/styles/pages/home.module.scss";
import AboutMe from "./components/about-me/about-me";
import Intro from "./components/intro/intro";
import ButtonScrollToTop from "./components/button-scroll-to-top/button-scroll-to-top";
import Timeline from "./components/timeline/timeline";
import { useWindowResize } from "./context/WindowResizeProvider";
import Hero from "./components/hero/hero";
import { usePathname } from "next/navigation";

function HomePage() {
	const { isDesktop } = useWindowResize();
	const pathname = usePathname();

	return (
		<div className={styles.home} id="home-start">
			<div className={styles.container}>
				<Intro />
				<AboutMe />
			</div>
			{isDesktop && <Hero />}
			{pathname === "/home" && <Timeline />}
			<ButtonScrollToTop />
		</div>
	);
}

export default HomePage;
