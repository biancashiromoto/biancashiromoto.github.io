import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { useLanguage } from "@/app/context/LanguageProvider";
import useTypeWriter from "./hooks/useTypeWriter";
import Typewriter from "./typewriter";

vi.mock("@/app/context/LanguageProvider", () => ({
  useLanguage: vi.fn(),
}));

vi.mock("./hooks/useTypeWriter", () => ({
  default: vi.fn(),
}));

const mockUseLanguage = vi.mocked(useLanguage);
const mockUseTypeWriter = vi.mocked(useTypeWriter);

const defaultLanguageContext = {
  isLanguagePortuguese: false,
  toggleLanguage: vi.fn(),
  information: {} as any,
  isLoading: false,
};

const defaultTypeWriterResult = {
  currentText: "Hello",
  currentIndex: 5,
  showCursor: true,
  isDeleting: false,
};

const defaultProps = { text: "Hello", delay: 100, infinite: false };

describe("Typewriter", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
    mockUseLanguage.mockReturnValue(defaultLanguageContext);
    mockUseTypeWriter.mockReturnValue(defaultTypeWriterResult);
  });

  it("renders the current text", () => {
    render(<Typewriter {...defaultProps} />);
    expect(screen.getByText(/Hello/)).toBeInTheDocument();
  });

  it("renders the cursor character", () => {
    render(<Typewriter {...defaultProps} />);
    expect(screen.getByText("|")).toBeInTheDocument();
  });

  it("renders the cursor visible when showCursor is true", () => {
    mockUseTypeWriter.mockReturnValue({ ...defaultTypeWriterResult, showCursor: true });
    const { container } = render(<Typewriter {...defaultProps} />);
    const cursor = container.querySelector("[class*='cursor']");
    expect(cursor).not.toHaveClass(/hidden/);
  });

  it("renders the cursor hidden when showCursor is false", () => {
    mockUseTypeWriter.mockReturnValue({ ...defaultTypeWriterResult, showCursor: false });
    const { container } = render(<Typewriter {...defaultProps} />);
    const cursor = container.querySelector("[class*='cursor']");
    expect(cursor?.className).toMatch(/hidden/);
  });

  it("applies orange cursor class when language is English", () => {
    mockUseLanguage.mockReturnValue({ ...defaultLanguageContext, isLanguagePortuguese: false });
    const { container } = render(<Typewriter {...defaultProps} />);
    const cursor = container.querySelector("[class*='cursor']");
    expect(cursor?.className).toMatch(/orange/);
  });

  it("applies blue cursor class when language is Portuguese", () => {
    mockUseLanguage.mockReturnValue({ ...defaultLanguageContext, isLanguagePortuguese: true });
    const { container } = render(<Typewriter {...defaultProps} />);
    const cursor = container.querySelector("[class*='cursor']");
    expect(cursor?.className).toMatch(/blue/);
  });
});
