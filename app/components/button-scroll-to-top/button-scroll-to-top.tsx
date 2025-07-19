import { useLanguage } from "@/app/context/LanguageProvider";
import styles from "./button-scroll-to-top.module.scss";
import { BsArrowUp } from "react-icons/bs";

const ButtonScrollToTop = () => {
	const { information } = useLanguage();

	const handleScrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

	return (
		<button
			type="button"
			className={styles["scroll-to-top"]}
			onClick={handleScrollToTop}
			aria-label={information._scrollToTopButtonLabel}
		>
			<BsArrowUp />
		</button>
	);
};

export default ButtonScrollToTop;
