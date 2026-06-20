import { describe, it, expect, beforeEach, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { axe } from "vitest-axe";
import userEvent from "@testing-library/user-event";
import { useLanguage } from "@/app/context/LanguageProvider";
import LanguageSwitch from "./language-switch";

vi.mock("@/app/context/LanguageProvider", () => ({ useLanguage: vi.fn() }));

const mockUseLanguage = vi.mocked(useLanguage);

const defaultLanguageContext = {
  isLanguagePortuguese: false,
  toggleLanguage: vi.fn(),
  information: { _translateButtonLabel: "Traduzir para o português" } as any,
  isLoading: false,
};

describe("LanguageSwitch", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
    mockUseLanguage.mockReturnValue(defaultLanguageContext);
  });

  it("renders the switch input with the correct aria-label", () => {
    render(<LanguageSwitch />);
    expect(screen.getByRole("switch", { name: /traduzir para o português/i })).toBeInTheDocument();
  });

  it("renders the label text in uppercase", () => {
    render(<LanguageSwitch />);
    expect(screen.getByText("TRADUZIR PARA O PORTUGUÊS")).toBeInTheDocument();
  });

  it("renders the switch as unchecked when language is not Portuguese", () => {
    render(<LanguageSwitch />);
    expect(screen.getByRole("switch")).not.toBeChecked();
  });

  it("renders the switch as checked when language is Portuguese", () => {
    mockUseLanguage.mockReturnValue({
      ...defaultLanguageContext,
      isLanguagePortuguese: true,
      information: { _translateButtonLabel: "Translate to English" } as any,
    });

    render(<LanguageSwitch />);
    expect(screen.getByRole("switch")).toBeChecked();
  });

  it("displays the correct label when language is Portuguese", () => {
    mockUseLanguage.mockReturnValue({
      ...defaultLanguageContext,
      isLanguagePortuguese: true,
      information: { _translateButtonLabel: "Translate to English" } as any,
    });

    render(<LanguageSwitch />);
    expect(screen.getByText("TRANSLATE TO ENGLISH")).toBeInTheDocument();
    expect(screen.getByRole("switch", { name: /translate to english/i })).toBeInTheDocument();
  });

  it("calls toggleLanguage when the switch is clicked", async () => {
    const toggleLanguage = vi.fn();
    mockUseLanguage.mockReturnValue({
      ...defaultLanguageContext,
      toggleLanguage,
    });

    const user = userEvent.setup();
    render(<LanguageSwitch />);

    await user.click(screen.getByRole("switch"));
    expect(toggleLanguage).toHaveBeenCalledTimes(1);
  });

  describe("accessibility", () => {
    it("has no violations in English", async () => {
      const { container } = render(<LanguageSwitch />);
      const results = await axe(container);
      expect(results.violations).toHaveLength(0);
    });

    it("has no violations in Portuguese", async () => {
      mockUseLanguage.mockReturnValue({
        ...defaultLanguageContext,
        isLanguagePortuguese: true,
        information: { _translateButtonLabel: "Translate to English" } as any,
      });
      const { container } = render(<LanguageSwitch />);
      const results = await axe(container);
      expect(results.violations).toHaveLength(0);
    });
  });
});
