import { useState } from "react";

export const useReadMore = (text: string, maxLength: number = 100) => {
	const [isExpanded, setIsExpanded] = useState(false);

	const shouldTruncate = text.length > maxLength;
	const displayText = isExpanded ? text : text.slice(0, maxLength);

	const toggleReadMore = () => {
		setIsExpanded(!isExpanded);
	};

	return {
		displayText,
		isExpanded,
		shouldTruncate,
		toggleReadMore
	};
};
