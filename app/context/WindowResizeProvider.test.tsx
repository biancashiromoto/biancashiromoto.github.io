import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, act } from "@testing-library/react";
import { renderHook } from "@testing-library/react";
import { WindowResizeProvider, useWindowResize } from "./WindowResizeProvider";

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <WindowResizeProvider>{children}</WindowResizeProvider>
);

describe("WindowResizeProvider", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it("renders children", () => {
    render(
      <WindowResizeProvider>
        <span>child</span>
      </WindowResizeProvider>,
    );
    expect(screen.getByText("child")).toBeInTheDocument();
  });

  it("provides initial width from window.innerWidth", () => {
    Object.defineProperty(window, "innerWidth", { value: 1280, configurable: true });
    const { result } = renderHook(() => useWindowResize(), { wrapper });
    expect(result.current.width).toBe(1280);
  });

  it("sets isDesktop to true when width is 1024 or more", () => {
    Object.defineProperty(window, "innerWidth", { value: 1024, configurable: true });
    const { result } = renderHook(() => useWindowResize(), { wrapper });
    expect(result.current.isDesktop).toBe(true);
  });

  it("sets isDesktop to false when width is less than 1024", () => {
    Object.defineProperty(window, "innerWidth", { value: 768, configurable: true });
    const { result } = renderHook(() => useWindowResize(), { wrapper });
    expect(result.current.isDesktop).toBe(false);
  });

  it("updates width when resize event fires", () => {
    Object.defineProperty(window, "innerWidth", { value: 800, configurable: true });
    const { result } = renderHook(() => useWindowResize(), { wrapper });

    act(() => {
      Object.defineProperty(window, "innerWidth", { value: 1440, configurable: true });
      window.dispatchEvent(new Event("resize"));
    });

    expect(result.current.width).toBe(1440);
  });

  it("removes resize listener on unmount", () => {
    const removeSpy = vi.spyOn(window, "removeEventListener");
    const { unmount } = render(
      <WindowResizeProvider>
        <span />
      </WindowResizeProvider>,
    );
    unmount();
    expect(removeSpy).toHaveBeenCalledWith("resize", expect.any(Function));
  });
});
