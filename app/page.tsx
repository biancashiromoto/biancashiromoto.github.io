"use client";

import styles from "@/app/styles/pages/home.module.scss";
import AboutMe from "./components/about-me/about-me";
import Intro from "./components/intro/intro";
import ButtonScrollToTop from "./components/button-scroll-to-top/button-scroll-to-top";
import Timeline from "./components/timeline/timeline";
import { useWindowResize } from "./context/WindowResizeProvider";
import Hero from "./components/hero/hero";

function HomePage() {
	const { isDesktop } = useWindowResize();

	return (
		<div className={styles.home} id="home-start">
			<div className={styles.container}>
				<Intro />
				<AboutMe />
			</div>
			{isDesktop && <Hero />}
			<Timeline />
			<ButtonScrollToTop />
		</div>
	);
}

export default HomePage;
