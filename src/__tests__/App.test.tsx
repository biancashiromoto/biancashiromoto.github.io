import { render, screen } from "@testing-library/react";
import App from "../App";
import Information from "../helpers/classes/Information";
import { vi } from "vitest";

describe("Home page", () => {
  beforeEach(() => {
    render(<App />);
  });

  const enInformation = new Information("en");
  
  test("Should contain an 'img' tag with the correct alt text", async () => {
    const img = await screen.findByRole("img");
    expect(img.getAttribute("alt")).toBe(enInformation._profilePictureAltText);
  });

  test("Should contain a title with the text 'Bianca'", () => {
    const title = screen.getByRole("heading");
    expect(title.innerHTML).toContain("Bianca");
  });

  test("Should contain a button with data-testid 'button__toggle-language'", () => {
    const toggleLanguageButton = screen.getByTestId("button__toggle-language");
    expect(toggleLanguageButton).toBeInTheDocument();
  });

  test("Should contain an a tag that leads to LinkedIn", () => {
    const linkedinTag = screen.getByTestId("link__linkedin");
    expect(linkedinTag.getAttribute("href")).toBe(enInformation._linkedinLink);
  });

  test("Should contain an a tag that leads to GitHub", () => {
    const github = screen.getByTestId("link__github");
    expect(github.getAttribute("href")).toBe(enInformation._githubLink);
  });
});