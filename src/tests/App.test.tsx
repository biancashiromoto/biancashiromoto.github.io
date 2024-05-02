import { render, screen } from "@testing-library/react";
import App from "../App";
import Information from "../helpers/classes/Information";

describe("Home page | English", () => {
  beforeEach(() => {
    render(<App />);
  });

  test("Should contain an 'img' tag with the correct alt text", async () => {
    const information = new Information();
    const img = await screen.findByRole("img");
    expect(img.getAttribute("alt")).toBe(information._profilePictureAltText);
  });
});