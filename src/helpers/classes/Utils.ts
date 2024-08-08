export default class Utils {
  /**
   * Checks if browser language is Portuguese.
   * @returns true if it is and false if it is not.
   */
  public isLanguagePortuguese(): boolean {
    const browserLanguage = navigator.language;
    return browserLanguage.includes("pt-");
  }

  public scrollTo(href: string) {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }

  /**
   * Sets the parameter key and value to localStorage.
   * @param key The key to be set to localStorage.
   * @param value The value to be set to localStorage.
   */
  public setLocalStorage(key: string, value: any) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  /**
   * Gets the parameter key and value from localStorage.
   * @param key The key to be gotten from localStorage.
   * @returns The value with the key set as parameter or null if the key does not exist.
   */
  public getLocalStorage(key: string) {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  }

  /**
   * Formats the project title.
   * @param title The title to be formatted.
   */
  public formatProjectTitle(title: string): string {
    return title
    .replace(/-/g, ' ')
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
  }
}