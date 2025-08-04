import { useLanguage } from "@/app/context/LanguageProvider";
import useTypeWriter from "./hooks/useTypeWriter";
import styles from "./typewriter.module.scss";

export interface TypeWriterProps {
	text: string;
	delay: number;
	infinite: boolean;
}

const Typewriter = (props: TypeWriterProps) => {
	const { currentText, showCursor } = useTypeWriter(props);
	const { isLanguagePortuguese } = useLanguage();
	return (
		<span className={styles.typewriter}>
			{currentText}
			<span className={`${styles.cursor} ${showCursor ? "" : styles.hidden}  ${!isLanguagePortuguese ? styles.orange : styles.blue}`}>|</span>
		</span>
	);
};

export default Typewriter;
