"use client";

import styles from "@/app/styles/pages/home.module.scss";
import AboutMe from "./components/about-me/about-me";
import Intro from "./components/intro/intro";

function HomePage() {
	return (
		<div className={styles.home} id="home-start">
			<Intro />
			<AboutMe />
		</div>
	);
}

export default HomePage;
