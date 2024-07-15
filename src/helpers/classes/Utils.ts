import axios from 'axios';

export default class Utils {
  /**
   * Checks if browser language is Portuguese.
   * @returns true if it is and false if it is not.
   */
  public isLanguagePortuguese(): boolean {
    const browserLanguage = navigator.language;
    return browserLanguage.includes("pt-");
  }

  public async fetchData() {
    const { data } = await axios.get("https://api.github.com/users/biancashiromoto/repos");
    return data;    
  }
}