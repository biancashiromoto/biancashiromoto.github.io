import { useState, useEffect } from "react";
import styles from "./typewriter.module.scss";

const Typewriter = ({
	text, delay, infinite
}: { text: string; delay: number; infinite: boolean }) => {
	const [currentText, setCurrentText] = useState("");
	const [currentIndex, setCurrentIndex] = useState(0);
	const [showCursor, setShowCursor] = useState(true);
	const [isDeleting, setIsDeleting] = useState(false);

	useEffect(() => {
		setCurrentText("");
		setCurrentIndex(0);
		setIsDeleting(false);
	}, [text]);

	useEffect(() => {
		if (!text) return;

		let timeout: NodeJS.Timeout;

		if (!isDeleting) {
			// Fase de digitação
			if (currentIndex < text.length) {
				timeout = setTimeout(() => {
					setCurrentText(prevText => prevText + text[currentIndex]);
					setCurrentIndex(prevIndex => prevIndex + 1);
				}, delay);
			} else if (infinite) {
				// Aguarda 2 segundos e depois começa a deletar
				timeout = setTimeout(() => {
					setIsDeleting(true);
				}, 2000);
			}
		} else {
			// Fase de deletar
			if (currentText.length > 0) {
				timeout = setTimeout(() => {
					setCurrentText(prevText => prevText.slice(0, -1));
				}, delay / 2); // Deleta mais rápido que digita
			} else {
				// Terminou de deletar, reinicia a digitação
				setCurrentIndex(0);
				setIsDeleting(false);
			}
		}

		return () => clearTimeout(timeout);
	}, [currentIndex, currentText, delay, infinite, text, isDeleting]);

	useEffect(() => {
		const cursorInterval = setInterval(() => {
			setShowCursor(prev => !prev);
		}, 500);

		return () => clearInterval(cursorInterval);
	}, []);

	return (
		<span className={styles.typewriter}>
			{currentText}
			<span className={`${styles.cursor} ${showCursor ? "" : styles.hidden}`}>|</span>
		</span>
	);
};

export default Typewriter;
