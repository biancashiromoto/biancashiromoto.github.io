import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useLanguage } from "@/app/context/LanguageProvider";
import useButtonScrollToTop from "./hooks/useButtonScrollToTop";
import ButtonScrollToTop from "./button-scroll-to-top";

vi.mock("@/app/context/LanguageProvider", () => ({
  useLanguage: vi.fn(),
}));

vi.mock("./hooks/useButtonScrollToTop", () => ({
  default: vi.fn(),
}));

const mockUseLanguage = vi.mocked(useLanguage);
const mockUseButtonScrollToTop = vi.mocked(useButtonScrollToTop);

const defaultLanguageContext = {
  isLanguagePortuguese: false,
  toggleLanguage: vi.fn(),
  information: { _scrollToTopButtonLabel: "Scroll to top" } as any,
  isLoading: false,
};

const defaultScrollTopResult = {
  shouldShowButtonScrollToTop: true,
  handleScrollToTop: vi.fn(),
};

describe("ButtonScrollToTop", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
    mockUseLanguage.mockReturnValue(defaultLanguageContext);
    mockUseButtonScrollToTop.mockReturnValue(defaultScrollTopResult);
  });

  it("renders the button when shouldShowButtonScrollToTop is true", () => {
    render(<ButtonScrollToTop />);
    expect(screen.getByRole("button", { name: "Scroll to top" })).toBeInTheDocument();
  });

  it("does not render the button when shouldShowButtonScrollToTop is false", () => {
    mockUseButtonScrollToTop.mockReturnValue({
      ...defaultScrollTopResult,
      shouldShowButtonScrollToTop: false,
    });
    render(<ButtonScrollToTop />);
    expect(screen.queryByRole("button")).not.toBeInTheDocument();
  });

  it("sets the correct aria-label from information", () => {
    render(<ButtonScrollToTop />);
    expect(screen.getByRole("button")).toHaveAttribute("aria-label", "Scroll to top");
  });

  it("uses Portuguese label when language is Portuguese", () => {
    mockUseLanguage.mockReturnValue({
      ...defaultLanguageContext,
      information: { _scrollToTopButtonLabel: "Voltar ao topo" } as any,
    });
    render(<ButtonScrollToTop />);
    expect(screen.getByRole("button", { name: "Voltar ao topo" })).toBeInTheDocument();
  });

  it("calls handleScrollToTop when clicked", async () => {
    const handleScrollToTop = vi.fn();
    mockUseButtonScrollToTop.mockReturnValue({ ...defaultScrollTopResult, handleScrollToTop });
    const user = userEvent.setup();
    render(<ButtonScrollToTop />);
    await user.click(screen.getByRole("button"));
    expect(handleScrollToTop).toHaveBeenCalledOnce();
  });
});
