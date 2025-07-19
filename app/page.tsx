"use client";

import styles from "@/app/styles/pages/home.module.scss";
import AboutMe from "./components/about-me/about-me";
import Intro from "./components/intro/intro";
import ButtonScrollToTop from "./components/button-scroll-to-top/button-scroll-to-top";

function HomePage() {
	return (
		<div className={styles.home} id="home-start">
			<Intro />
			<AboutMe />
			<ButtonScrollToTop />
		</div>
	);
}

export default HomePage;
