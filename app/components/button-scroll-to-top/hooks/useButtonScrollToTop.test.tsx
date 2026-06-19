import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useScroll } from "@/app/context/ScrollProvider";
import useButtonScrollToTop from "./useButtonScrollToTop";

vi.mock("@/app/context/ScrollProvider", () => ({
  useScroll: vi.fn(),
}));

const mockUseScroll = vi.mocked(useScroll);

describe("useButtonScrollToTop", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
    vi.stubGlobal("scrollTo", vi.fn());
  });

  describe("shouldShowButtonScrollToTop", () => {
    it("is false when scrollProgress is 0", () => {
      mockUseScroll.mockReturnValue({ scrollProgress: 0 });
      const { result } = renderHook(() => useButtonScrollToTop());
      expect(result.current.shouldShowButtonScrollToTop).toBe(false);
    });

    it("is false when scrollProgress is exactly 80", () => {
      mockUseScroll.mockReturnValue({ scrollProgress: 80 });
      const { result } = renderHook(() => useButtonScrollToTop());
      expect(result.current.shouldShowButtonScrollToTop).toBe(false);
    });

    it("is true when scrollProgress is above 80", () => {
      mockUseScroll.mockReturnValue({ scrollProgress: 81 });
      const { result } = renderHook(() => useButtonScrollToTop());
      expect(result.current.shouldShowButtonScrollToTop).toBe(true);
    });

    it("updates when scrollProgress changes", () => {
      mockUseScroll.mockReturnValue({ scrollProgress: 50 });
      const { result, rerender } = renderHook(() => useButtonScrollToTop());

      expect(result.current.shouldShowButtonScrollToTop).toBe(false);

      mockUseScroll.mockReturnValue({ scrollProgress: 90 });
      rerender();

      expect(result.current.shouldShowButtonScrollToTop).toBe(true);
    });
  });

  describe("handleScrollToTop", () => {
    it("calls window.scrollTo with top 0 and smooth behavior", () => {
      mockUseScroll.mockReturnValue({ scrollProgress: 90 });
      const { result } = renderHook(() => useButtonScrollToTop());

      act(() => result.current.handleScrollToTop());

      expect(window.scrollTo).toHaveBeenCalledWith({ top: 0, behavior: "smooth" });
    });
  });
});
