import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ProjectDescription from "./project-description";

const shortDescription = "A short description.";
const longDescription = "A".repeat(76);

describe("ProjectDescription", () => {
  describe("when description is short (≤ 75 chars)", () => {
    it("renders the full text", () => {
      render(<ProjectDescription description={shortDescription} />);
      expect(screen.getByText(shortDescription)).toBeInTheDocument();
    });

    it("does not render the read more button", () => {
      render(<ProjectDescription description={shortDescription} />);
      expect(screen.queryByRole("button")).not.toBeInTheDocument();
    });

    it("does not append ellipsis", () => {
      render(<ProjectDescription description={shortDescription} />);
      expect(screen.queryByText(/\.\.\./)).not.toBeInTheDocument();
    });
  });

  describe("when description is long (> 75 chars)", () => {
    it("truncates the text initially", () => {
      render(<ProjectDescription description={longDescription} />);
      expect(screen.getByText(/A+\.\.\./).textContent).toContain("...");
    });

    it("renders the read more button initially", () => {
      render(<ProjectDescription description={longDescription} />);
      expect(screen.getByRole("button", { name: "Read more" })).toBeInTheDocument();
    });

    it("expands the full text when read more is clicked", async () => {
      const user = userEvent.setup();
      render(<ProjectDescription description={longDescription} />);
      await user.click(screen.getByRole("button", { name: "Read more" }));
      expect(screen.getByText(longDescription)).toBeInTheDocument();
    });

    it("changes button label to read less after expanding", async () => {
      const user = userEvent.setup();
      render(<ProjectDescription description={longDescription} />);
      await user.click(screen.getByRole("button", { name: "Read more" }));
      expect(screen.getByRole("button", { name: "Read less" })).toBeInTheDocument();
    });

    it("collapses text again when read less is clicked", async () => {
      const user = userEvent.setup();
      render(<ProjectDescription description={longDescription} />);
      await user.click(screen.getByRole("button", { name: "Read more" }));
      await user.click(screen.getByRole("button", { name: "Read less" }));
      expect(screen.getByRole("button", { name: "Read more" })).toBeInTheDocument();
      expect(screen.queryByText(longDescription)).not.toBeInTheDocument();
    });
  });

  describe("when description is null", () => {
    it("renders without crashing", () => {
      render(<ProjectDescription />);
    });

    it("does not render the read more button", () => {
      render(<ProjectDescription />);
      expect(screen.queryByRole("button")).not.toBeInTheDocument();
    });
  });
});
