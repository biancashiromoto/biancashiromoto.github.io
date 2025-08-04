import { useLanguage } from "@/app/context/LanguageProvider";
import ProgressBar from "../progress-bar/progress-bar";
import styles from "./header.module.scss";
import LanguageSwitch from "../language-switch/language-switch";

const Header = () => {
	const {
		information, toggleLanguage, isLanguagePortuguese
	} = useLanguage();

	return (
		<header className={styles.header}>
			<LanguageSwitch
				checked={!isLanguagePortuguese}
				onChange={toggleLanguage}
				label={information._translateButtonLabel}
			/>
			<ProgressBar />
		</header>
	);
};

export default Header;
