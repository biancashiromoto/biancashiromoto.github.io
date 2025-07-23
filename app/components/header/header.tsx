import { useLanguage } from "@/app/context/LanguageProvider";
import ProgressBar from "../progress-bar/progress-bar";
import styles from "./header.module.scss";
import Switch from "../switch/switch";

const Header = () => {
	const {
		information, toggleLanguage, isLanguagePortuguese
	} = useLanguage();

	return (
		<header className={styles.header}>
			<Switch
				checked={!isLanguagePortuguese}
				onChange={toggleLanguage}
				label={information._translateButtonLabel}
			/>
			<ProgressBar />
		</header>
	);
};

export default Header;
