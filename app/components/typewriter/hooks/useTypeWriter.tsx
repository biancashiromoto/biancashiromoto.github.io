import {
	useEffect,
	useState,
	useMemo,
	useRef
} from "react";
import { TypeWriterProps } from "../typewriter";

const useTypeWriter = ({
	text, delay, infinite
}: TypeWriterProps) => {
	const [currentText, setCurrentText] = useState("");
	const [showCursor, setShowCursor] = useState(true);
	const [isDeleting, setIsDeleting] = useState(false);

	const timeoutRef = useRef<NodeJS.Timeout | null>(null);
	const cursorIntervalRef = useRef<NodeJS.Timeout | null>(null);

	const currentIndex = useMemo(() => currentText.length, [currentText.length]);

	// Reset state when text changes
	useEffect(() => {
		setCurrentText("");
		setIsDeleting(false);
	}, [text]);

	// Main typing effect - optimized dependencies
	useEffect(() => {
		if (!text) return;

		// Clear previous timeout to prevent conflicts
		if (timeoutRef.current) {
			clearTimeout(timeoutRef.current);
		}

		if (!isDeleting) {
			// Typing phase
			if (currentIndex < text.length) {
				timeoutRef.current = setTimeout(() => {
					setCurrentText(text.slice(0, currentIndex + 1));
				}, delay);
			} else if (infinite) {
				// Wait 2 seconds then start deleting
				timeoutRef.current = setTimeout(() => {
					setIsDeleting(true);
				}, 2000);
			}
		} else {
			// Deleting phase
			if (currentText.length > 0) {
				timeoutRef.current = setTimeout(() => {
					setCurrentText(prevText => prevText.slice(0, -1));
				}, delay / 2); // Delete faster than typing
			} else {
				// Finished deleting, restart typing
				setIsDeleting(false);
			}
		}

		return () => {
			if (timeoutRef.current) {
				clearTimeout(timeoutRef.current);
			}
		};
	}, [currentIndex, currentText.length, delay, infinite, text, isDeleting]);

	// Cursor blinking effect - separated and optimized
	useEffect(() => {
		if (cursorIntervalRef.current) {
			clearInterval(cursorIntervalRef.current);
		}

		cursorIntervalRef.current = setInterval(() => {
			setShowCursor(prev => !prev);
		}, 500);

		return () => {
			if (cursorIntervalRef.current) {
				clearInterval(cursorIntervalRef.current);
			}
		};
	}, []); // Empty dependency array - cursor blinks consistently

	// Cleanup on unmount
	useEffect(() => {
		return () => {
			if (timeoutRef.current) {
				clearTimeout(timeoutRef.current);
			}
			if (cursorIntervalRef.current) {
				clearInterval(cursorIntervalRef.current);
			}
		};
	}, []);

	// Memoize return value to prevent unnecessary re-renders in consuming components
	return useMemo(() => ({
		currentText,
		currentIndex,
		showCursor,
		isDeleting
	}), [currentText, currentIndex, showCursor, isDeleting]);
};

export default useTypeWriter;
