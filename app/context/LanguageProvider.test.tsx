import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, act, renderHook } from "@testing-library/react";
import { LanguageProvider, useLanguage } from "./LanguageProvider";

vi.mock("../helpers/classes/Utils", () => ({
  default: vi.fn().mockImplementation(() => ({
    isLanguagePortuguese: vi.fn().mockReturnValue(false),
    formatProjectTitle: vi.fn(),
  })),
}));

vi.mock("../components/loader/loader", () => ({
  default: () => <div data-testid="loader" />,
}));

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <LanguageProvider>{children}</LanguageProvider>
);

const LOADING_DELAY = 150;

describe("LanguageProvider", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    localStorage.clear();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("renders Loader while loading", () => {
    render(
      <LanguageProvider>
        <span>content</span>
      </LanguageProvider>,
    );
    expect(screen.getByTestId("loader")).toBeInTheDocument();
    expect(screen.queryByText("content")).not.toBeInTheDocument();
  });

  it("renders children after loading completes", () => {
    render(
      <LanguageProvider>
        <span>content</span>
      </LanguageProvider>,
    );
    act(() => vi.advanceTimersByTime(LOADING_DELAY));
    expect(screen.getByText("content")).toBeInTheDocument();
    expect(screen.queryByTestId("loader")).not.toBeInTheDocument();
  });

  it("provides English information by default", () => {
    const { result } = renderHook(() => useLanguage(), { wrapper });
    act(() => vi.advanceTimersByTime(LOADING_DELAY));
    expect(result.current.isLanguagePortuguese).toBe(false);
    expect(result.current.information).toBeDefined();
  });

  it("uses language saved in localStorage", () => {
    localStorage.setItem("preferredLanguage", "pt");
    const { result } = renderHook(() => useLanguage(), { wrapper });
    act(() => vi.advanceTimersByTime(LOADING_DELAY));
    expect(result.current.isLanguagePortuguese).toBe(true);
  });

  it("toggleLanguage switches from English to Portuguese", async () => {
    const { result } = renderHook(() => useLanguage(), { wrapper });
    act(() => vi.advanceTimersByTime(LOADING_DELAY));

    act(() => result.current.toggleLanguage());

    expect(result.current.isLanguagePortuguese).toBe(true);
  });

  it("toggleLanguage switches from Portuguese back to English", () => {
    localStorage.setItem("preferredLanguage", "pt");
    const { result } = renderHook(() => useLanguage(), { wrapper });
    act(() => vi.advanceTimersByTime(LOADING_DELAY));

    act(() => result.current.toggleLanguage());

    expect(result.current.isLanguagePortuguese).toBe(false);
  });

  it("saves the new language to localStorage on toggle", () => {
    const { result } = renderHook(() => useLanguage(), { wrapper });
    act(() => vi.advanceTimersByTime(LOADING_DELAY));

    act(() => result.current.toggleLanguage());

    expect(localStorage.getItem("preferredLanguage")).toBe("pt");
  });

  it("exposes isLoading as false after the loading delay", () => {
    const { result } = renderHook(() => useLanguage(), { wrapper });
    act(() => vi.advanceTimersByTime(LOADING_DELAY));
    expect(result.current.isLoading).toBe(false);
  });
});
