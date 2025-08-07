import React from "react";
import styles from "./language-switch.module.scss";
import { useLanguage } from "@/app/context/LanguageProvider";

const LanguageSwitch = () => {
	const {
		information, toggleLanguage, isLanguagePortuguese
	} = useLanguage();

	return (
		<label className={styles.switch}>
			<input
				type="checkbox"
				checked={isLanguagePortuguese}
				onChange={toggleLanguage}
				role="switch"
				aria-checked={isLanguagePortuguese}
				aria-label={information._translateButtonLabel}
				tabIndex={0}
			/>
			<span className={styles.slider}></span>
			<span className={styles.text}>
				{information._translateButtonLabel.toUpperCase()}
			</span>
		</label>
	);
};

export default LanguageSwitch;
