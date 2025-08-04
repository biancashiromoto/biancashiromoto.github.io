"use client";

import styles from "./progress-bar.module.scss";
import { useScroll } from "@/app/context/ScrollProvider";

const ProgressBar: React.FC = () => {
	const { scrollProgress } = useScroll();

	const barStyle = { top: `${0 + 0}px`, } as React.CSSProperties;

	const fillStyle = { width: `${scrollProgress}%`, } as React.CSSProperties;

	return (
		<div className={styles.progressBar} style={barStyle}>
			<div className={styles.progressBarFill} style={fillStyle} />
		</div>
	);
};

export default ProgressBar;
