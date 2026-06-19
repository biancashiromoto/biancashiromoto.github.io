import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, act } from "@testing-library/react";
import { renderHook } from "@testing-library/react";
import { ScrollProvider, useScroll } from "./ScrollProvider";

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <ScrollProvider>{children}</ScrollProvider>
);

describe("ScrollProvider", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it("renders children", () => {
    render(
      <ScrollProvider>
        <span>child</span>
      </ScrollProvider>
    );
    expect(screen.getByText("child")).toBeInTheDocument();
  });

  it("provides scrollProgress of 0 initially", () => {
    const { result } = renderHook(() => useScroll(), { wrapper });
    expect(result.current.scrollProgress).toBe(0);
  });

  it("updates scrollProgress when scroll event fires", () => {
    Object.defineProperty(document.documentElement, "scrollHeight", { value: 1100, configurable: true });
    Object.defineProperty(window, "innerHeight", { value: 100, configurable: true });
    Object.defineProperty(window, "scrollY", { value: 500, configurable: true });

    const { result } = renderHook(() => useScroll(), { wrapper });

    act(() => {
      window.dispatchEvent(new Event("scroll"));
    });

    expect(result.current.scrollProgress).toBe(50);
  });

  it("removes scroll listener on unmount", () => {
    const removeSpy = vi.spyOn(window, "removeEventListener");
    const { unmount } = render(<ScrollProvider><span /></ScrollProvider>);
    unmount();
    expect(removeSpy).toHaveBeenCalledWith("scroll", expect.any(Function));
  });
});
