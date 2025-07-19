import { useLanguage } from "@/app/context/LanguageProvider";
import styles from "./about-me.module.scss";

const AboutMe = () => {
	const { information } = useLanguage();

	return (
		<div className={styles["about-me"]} id="about-me">
			{information._aboutMeText.map((_paragraph, index) => (
				<p key={index}>{information._aboutMeText[index]}</p>
			))}
		</div>
	);
};

export default AboutMe;
