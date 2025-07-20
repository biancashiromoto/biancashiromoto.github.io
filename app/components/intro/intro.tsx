import { useLanguage } from "@/app/context/LanguageProvider";
import styles from "./intro.module.scss";
import { altText } from "@/app/helpers/acessibility";
import Image from "next/image";
import { LinksContainer } from "../links-container";
import Hero from "../hero/hero";
import GreetingMessage from "./greeting-message/greeting-message";

const Intro = () => {
	const { information, isLanguagePortuguese } = useLanguage();

	const imageProps = {
		alt: altText(isLanguagePortuguese).home.profilePicture,
		src: information._profilePictureURL,
		width: 200,
		height: 200,
		className: styles["profile-picture"],
	};

	return (
		<div className={styles.intro}>
			<Image {...imageProps} />
			<GreetingMessage {...information} />
			<LinksContainer />
			<Hero />
		</div>
	);
};

export default Intro;
