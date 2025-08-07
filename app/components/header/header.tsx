import ProgressBar from "../progress-bar/progress-bar";
import styles from "./header.module.scss";
import LanguageSwitch from "../language-switch/language-switch";
import { usePathname } from "next/navigation";

const Header = () => {
	const pathname = usePathname();

	return (
		<header className={styles.header}>
			<LanguageSwitch />
			{pathname !== "/home" && <ProgressBar />}
		</header>
	);
};

export default Header;
