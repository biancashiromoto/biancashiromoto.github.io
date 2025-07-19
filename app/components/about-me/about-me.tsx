import { useLanguage } from "@/app/context/LanguageProvider";
import styles from "./about-me.module.scss";
import { useProximityTextColor } from "./hooks/useProximityTextColor";

const AboutMe = () => {
	const { information } = useLanguage();
	const proximityRef = useProximityTextColor("gray", 25);

	const wrapText = (text: string) =>
		text.split("").map((char, i) => (
			<span data-char key={i}>{char}</span>
		));

	return (
		<div className={styles["about-me"]} id="about-me" ref={proximityRef}>
			{information._aboutMeText.map((_paragraph, index) => (
				<p key={index}>{wrapText(information._aboutMeText[index])}</p>
			))}
		</div>
	);
};

export default AboutMe;
