import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { useLanguage } from "@/app/context/LanguageProvider";
import { useProximityTextColor } from "./hooks/useProximityTextColor";
import AboutMe from "./about-me";

vi.mock("@/app/context/LanguageProvider", () => ({
  useLanguage: vi.fn(),
}));

vi.mock("./hooks/useProximityTextColor", () => ({
  useProximityTextColor: vi.fn(),
}));

const mockUseLanguage = vi.mocked(useLanguage);
const mockUseProximityTextColor = vi.mocked(useProximityTextColor);

const defaultLanguageContext = {
  isLanguagePortuguese: false,
  toggleLanguage: vi.fn(),
  information: {
    _aboutMeText: ["First paragraph about me.", "Second paragraph about me."],
  } as any,
  isLoading: false,
};

describe("AboutMe", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
    mockUseLanguage.mockReturnValue(defaultLanguageContext);
    mockUseProximityTextColor.mockReturnValue({ current: null } as any);
  });

  it("renders one paragraph per entry in _aboutMeText", () => {
    render(<AboutMe />);
    const paragraphs = screen.getAllByRole("paragraph");
    expect(paragraphs).toHaveLength(2);
  });

  it("renders the text content of each paragraph", () => {
    render(<AboutMe />);
    const paragraphs = screen.getAllByRole("paragraph");
    expect(paragraphs[0]).toHaveTextContent("First paragraph about me.");
    expect(paragraphs[1]).toHaveTextContent("Second paragraph about me.");
  });

  it("wraps each character in a span with data-char attribute", () => {
    render(<AboutMe />);
    const spans = document.querySelectorAll("span[data-char]");
    const totalChars = defaultLanguageContext.information._aboutMeText.join("").length;
    expect(spans.length).toBe(totalChars);
  });

  it("renders Portuguese text when language is Portuguese", () => {
    mockUseLanguage.mockReturnValue({
      ...defaultLanguageContext,
      isLanguagePortuguese: true,
      information: {
        _aboutMeText: ["Primeiro parágrafo.", "Segundo parágrafo."],
      } as any,
    });
    render(<AboutMe />);
    const paragraphs = screen.getAllByRole("paragraph");
    expect(paragraphs[0]).toHaveTextContent("Primeiro parágrafo.");
  });
});
