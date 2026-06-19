import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { useLanguage } from "@/app/context/LanguageProvider";
import { useWindowResize } from "@/app/context/WindowResizeProvider";
import Intro from "./intro";

vi.mock("@/app/context/LanguageProvider", () => ({
  useLanguage: vi.fn(),
}));

vi.mock("@/app/context/WindowResizeProvider", () => ({
  useWindowResize: vi.fn(),
}));

vi.mock("next/image", () => ({
  default: ({ src, alt }: any) => <img src={src} alt={alt} />,
}));

vi.mock("../links-container/links-container", () => ({
  LinksContainer: () => <div data-testid="links-container" />,
}));

vi.mock("./greeting-message/greeting-message", () => ({
  default: () => <div data-testid="greeting-message" />,
}));

vi.mock("../hero/hero", () => ({
  default: () => <div data-testid="hero" />,
}));

const mockUseLanguage = vi.mocked(useLanguage);
const mockUseWindowResize = vi.mocked(useWindowResize);

const defaultLanguageContext = {
  isLanguagePortuguese: false,
  toggleLanguage: vi.fn(),
  isLoading: false,
  information: {
    _profilePictureURL: "https://example.com/pic.jpg",
  } as any,
};

describe("Intro", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
    mockUseLanguage.mockReturnValue(defaultLanguageContext);
  });

  it("renders the profile picture", () => {
    mockUseWindowResize.mockReturnValue({ width: 1024, isDesktop: true });
    render(<Intro />);
    expect(screen.getByRole("img")).toBeInTheDocument();
  });

  it("renders the profile picture with the correct src", () => {
    mockUseWindowResize.mockReturnValue({ width: 1024, isDesktop: true });
    render(<Intro />);
    const img = screen.getByRole("img") as HTMLImageElement;
    expect(img.src).toBe("https://example.com/pic.jpg");
  });

  it("renders GreetingMessage", () => {
    mockUseWindowResize.mockReturnValue({ width: 1024, isDesktop: true });
    render(<Intro />);
    expect(screen.getByTestId("greeting-message")).toBeInTheDocument();
  });

  it("renders LinksContainer", () => {
    mockUseWindowResize.mockReturnValue({ width: 1024, isDesktop: true });
    render(<Intro />);
    expect(screen.getByTestId("links-container")).toBeInTheDocument();
  });

  it("does not render Hero when width is greater than 1023", () => {
    mockUseWindowResize.mockReturnValue({ width: 1024, isDesktop: true });
    render(<Intro />);
    expect(screen.queryByTestId("hero")).not.toBeInTheDocument();
  });

  it("renders Hero when width is 1023 or less", () => {
    mockUseWindowResize.mockReturnValue({ width: 1023, isDesktop: false });
    render(<Intro />);
    expect(screen.getByTestId("hero")).toBeInTheDocument();
  });
});
