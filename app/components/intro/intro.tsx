import { useLanguage } from "@/app/context/LanguageContext";
import styles from "./intro.module.scss";
import { altText } from "@/app/helpers/acessibility";
import Image from "next/image";
import { LinksContainer } from "../links-container";
import Information from "@/app/helpers/classes/Information";
import Hero from "../hero/hero";
import { useWindowResize } from "@/app/context/WindowResizeProvider";

const GreetingMessage = (information: Information) => {
	return (
		<div className={styles["intro__greeting-message"]}>
			{information._greetingMessage.map((line, index) => (
				<p key={index}>{line}</p>
			))}
		</div>
	);
};

const Intro = () => {
	const { information, isLanguagePortuguese } = useLanguage();
	const { width } = useWindowResize();
	const isMobileOrTablet = width <= 1024;

	return (
		<div className={styles.intro}>
			<Image
				alt={altText(isLanguagePortuguese).home.profilePicture}
				src={information._profilePictureURL}
				width={200}
				height={200}
				className={styles["profile-picture"]}
			/>
			<GreetingMessage {...information} />
			<LinksContainer />
			{isMobileOrTablet && <Hero />}
		</div>
	);
};

export default Intro;
