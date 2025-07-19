export default class Utils {
	/**
   * Checks if browser language is Portuguese.
   * @returns true if it is and false if it is not.
   */
	public isLanguagePortuguese(): boolean {
		if (typeof navigator === "undefined") {
			return false; // Default to English during SSR
		}
		const browserLanguage = navigator.language;
		return browserLanguage.includes("pt-");
	}

	/**
   * Scrolls to the provided element in the page.
   * @param href String containing the id of the target element.
   */
	public scrollTo(href: string): void {
		const element = document.querySelector(href);
		if (element) {
			element.scrollIntoView({ behavior: "smooth" });
		}
	}

	/**
   * Scrolls to the top of the page.
   */
	public scrollToTop(): void {
		window.scrollTo({ top: 0, behavior: "smooth" });
	}

	/**
   * Sets the parameter key and value to localStorage.
   * @param key The key to be set to localStorage.
   * @param value The value to be set to localStorage.
   */
	public setLocalStorage(key: string, value: unknown) {
		if (typeof localStorage !== "undefined") {
			localStorage.setItem(key, JSON.stringify(value));
		}
	}

	/**
   * Gets the parameter key and value from localStorage.
   * @param key The key to be gotten from localStorage.
   * @returns The value with the key set as parameter or null if the key does not exist.
   */
	public getLocalStorage(key: string) {
		if (typeof localStorage === "undefined") {
			return null;
		}
		const item = localStorage.getItem(key);
		return item ? JSON.parse(item) : null;
	}

	/**
   * Formats the project title.
   * @param title The title to be formatted.
   */
	public formatProjectTitle(title: string): string {
		return title
			.replace(/-/g, " ")
			.split(" ")
			.map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
			.join(" ");
	}
}
