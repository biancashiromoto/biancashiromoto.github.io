import { useScroll } from "@/app/context/ScrollProvider";
import { useEffect, useState } from "react";

const useButtonScrollToTop = () => {
	const [shouldShowButtonScrollToTop, setShouldShowButtonScrollToTop] = useState(true);
	const { scrollProgress } = useScroll();

	useEffect(() => {
		setShouldShowButtonScrollToTop(scrollProgress > 80);
	}, [scrollProgress]);

	const handleScrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

	return {
		shouldShowButtonScrollToTop,
		handleScrollToTop
	};
};

export default useButtonScrollToTop;
