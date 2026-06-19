import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { usePathname } from "next/navigation";
import Header from "./header";

vi.mock("next/navigation", () => ({
  usePathname: vi.fn(),
}));

vi.mock("../language-switch/language-switch", () => ({
  default: () => <div data-testid="language-switch" />,
}));

vi.mock("../progress-bar/progress-bar", () => ({
  default: () => <div data-testid="progress-bar" />,
}));

const mockUsePathname = vi.mocked(usePathname);

describe("Header", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it("renders LanguageSwitch on any route", () => {
    mockUsePathname.mockReturnValue("/");
    render(<Header />);
    expect(screen.getByTestId("language-switch")).toBeInTheDocument();
  });

  it("renders ProgressBar when pathname is not /home", () => {
    mockUsePathname.mockReturnValue("/projects");
    render(<Header />);
    expect(screen.getByTestId("progress-bar")).toBeInTheDocument();
  });

  it("does not render ProgressBar when pathname is /home", () => {
    mockUsePathname.mockReturnValue("/home");
    render(<Header />);
    expect(screen.queryByTestId("progress-bar")).not.toBeInTheDocument();
  });

  it("renders LanguageSwitch even on /home", () => {
    mockUsePathname.mockReturnValue("/home");
    render(<Header />);
    expect(screen.getByTestId("language-switch")).toBeInTheDocument();
  });

  it("renders inside a header element", () => {
    mockUsePathname.mockReturnValue("/");
    render(<Header />);
    expect(screen.getByRole("banner")).toBeInTheDocument();
  });
});
