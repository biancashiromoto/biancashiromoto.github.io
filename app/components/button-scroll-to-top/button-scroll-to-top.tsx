import { useLanguage } from "@/app/context/LanguageProvider";
import { BsArrowUp } from "react-icons/bs";
import styles from "./button-scroll-to-top.module.scss";
import useButtonScrollToTop from "./hooks/useButtonScrollToTop";

const ButtonScrollToTop = () => {
	const { information } = useLanguage();
	const { shouldShowButtonScrollToTop, handleScrollToTop } = useButtonScrollToTop();

	return shouldShowButtonScrollToTop && (
		<button
			type="button"
			className={styles["scroll-to-top"]}
			onClick={handleScrollToTop}
			aria-label={information._scrollToTopButtonLabel}
		>
			<BsArrowUp title={information._scrollToTopButtonLabel} />
		</button>
	);
};

export default ButtonScrollToTop;
