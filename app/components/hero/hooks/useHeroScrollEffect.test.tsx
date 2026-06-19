import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useHeroScrollEffect } from "./useHeroScrollEffect";

describe("useHeroScrollEffect", () => {
  beforeEach(() => {
    vi.stubGlobal("scrollY", 0);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("returns an imageRef object", () => {
    const { result } = renderHook(() => useHeroScrollEffect());
    expect(result.current.imageRef).toBeDefined();
    expect(result.current.imageRef).toHaveProperty("current");
  });

  it("attaches a scroll event listener on mount", () => {
    const addEventListenerSpy = vi.spyOn(window, "addEventListener");
    renderHook(() => useHeroScrollEffect());
    expect(addEventListenerSpy).toHaveBeenCalledWith("scroll", expect.any(Function));
  });

  it("removes the scroll event listener on unmount", () => {
    const removeEventListenerSpy = vi.spyOn(window, "removeEventListener");
    const { unmount } = renderHook(() => useHeroScrollEffect());
    unmount();
    expect(removeEventListenerSpy).toHaveBeenCalledWith("scroll", expect.any(Function));
  });

  it("sets CSS custom properties on the imageRef element when scrolled", () => {
    const { result } = renderHook(() => useHeroScrollEffect());

    // Attach a real element to the ref so the handler can write to it
    const div = document.createElement("div");
    (result.current.imageRef as React.MutableRefObject<HTMLDivElement>).current = div;

    act(() => {
      vi.stubGlobal("scrollY", 200);
      window.dispatchEvent(new Event("scroll"));
    });

    // At scrollY=200 out of maxScroll=400: progress=0.5, scale=0.75, opacity=0.5
    expect(div.style.getPropertyValue("--image-scale")).toBe("0.75");
    expect(div.style.getPropertyValue("--image-opacity")).toBe("0.5");
  });

  it("clamps scale to 0.5 at full scroll", () => {
    const { result } = renderHook(() => useHeroScrollEffect());
    const div = document.createElement("div");
    (result.current.imageRef as React.MutableRefObject<HTMLDivElement>).current = div;

    act(() => {
      vi.stubGlobal("scrollY", 400);
      window.dispatchEvent(new Event("scroll"));
    });

    expect(div.style.getPropertyValue("--image-scale")).toBe("0.5");
    expect(div.style.getPropertyValue("--image-opacity")).toBe("0");
  });
});
