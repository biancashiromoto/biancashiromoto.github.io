import { useLanguage } from "@/app/context/LanguageProvider";
import ProgressBar from "../progress-bar/progress-bar";
import styles from "./header.module.scss";
import LanguageSwitch from "../language-switch/language-switch";
import { usePathname } from "next/navigation";

const Header = () => {
	const {
		information, toggleLanguage, isLanguagePortuguese
	} = useLanguage();
	const pathname = usePathname();

	return (
		<header className={styles.header}>
			<LanguageSwitch
				checked={!isLanguagePortuguese}
				onChange={toggleLanguage}
				label={information._translateButtonLabel}
			/>
			{pathname !== "/home" && <ProgressBar />}
		</header>
	);
};

export default Header;
