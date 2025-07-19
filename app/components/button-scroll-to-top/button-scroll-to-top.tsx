import { useLanguage } from "@/app/context/LanguageProvider";
import styles from "./button-scroll-to-top.module.scss";
import { BsArrowUp } from "react-icons/bs";
import { useEffect, useState } from "react";
import { useScroll } from "@/app/context/ScrollProvider";

const ButtonScrollToTop = () => {
	const { information } = useLanguage();
	const [shouldShowButtonScrollToTop, setShouldShowButtonScrollToTop] = useState(true);
	const { scrollProgress } = useScroll();

	useEffect(() => {
		setShouldShowButtonScrollToTop(scrollProgress > 80);
	}, [scrollProgress]);

	const handleScrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

	return shouldShowButtonScrollToTop && (
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
