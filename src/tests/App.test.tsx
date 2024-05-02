import { render, screen } from "@testing-library/react";
import App from "../App";
import Information from "../helpers/classes/Information";

describe("Home page", () => {
  beforeEach(() => {
    render(<App />);
  });

  
  test("Should contain an 'img' tag with the correct alt text", async () => {
    const enInformation = new Information("en");
    const img = await screen.findByRole("img");
    expect(img.getAttribute("alt")).toBe(enInformation._profilePictureAltText);
  });

  test("Should contain a title with the text 'Bianca'", () => {
    const title = screen.getByRole("heading");
    expect(title.innerHTML).toContain("Bianca");
  });

  test("Should contain a button with data-testid 'toggle-language-button'", () => {
    const toggleLanguageButton = screen.getByTestId("toggle-language-button");
    expect(toggleLanguageButton).toBeInTheDocument();
  });
});