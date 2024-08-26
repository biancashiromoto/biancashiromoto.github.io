import { act, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { describe } from "vitest";
import { BrowserRouter as Router } from "react-router-dom";
import { Header } from "..";
import Information from "../../../helpers/classes/Information";

describe("Header component", () => {
  const ptInformation = new Information("pt");
  const enInformation = new Information("en");
  beforeEach(() => {
    return render(
      <Router>
        <Header />
      </Router>
    );
  });
  
  it("should be correctly rendered", () => {
    const header = screen.getByTestId("header");
    expect(header).toBeInTheDocument();
    expect(header).toHaveTextContent(enInformation._translateButtonLabel.toUpperCase());
  });

  it("should change label text after button is clicked", async () => {
    const header = screen.getByTestId("header");
    expect(header).toHaveTextContent(enInformation._translateButtonLabel.toUpperCase());
    act(() => fireEvent.click(screen.getByRole("button")));
    await waitFor(() => expect(header).toHaveTextContent(ptInformation._translateButtonLabel.toUpperCase()));
  });
});