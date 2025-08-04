import React from "react";
import styles from "./loader.module.scss";

const Loader: React.FC = () => {
	return (
		<div className={styles.loaderContainer}>
			<div className={styles.loader}>
				<div className={styles.dot}></div>
				<div className={styles.dot}></div>
				<div className={styles.dot}></div>
			</div>
		</div>
	);
};

export default Loader;
