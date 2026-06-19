import { describe, it, expect } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useReadMore } from "./useReadMore";

const shortText = "Short text.";
const longText = "A".repeat(101);

describe("useReadMore", () => {
  describe("initial state", () => {
    it("starts collapsed", () => {
      const { result } = renderHook(() => useReadMore(longText));
      expect(result.current.isExpanded).toBe(false);
    });

    it("does not truncate text within the default limit", () => {
      const { result } = renderHook(() => useReadMore(shortText));
      expect(result.current.shouldTruncate).toBe(false);
      expect(result.current.displayText).toBe(shortText);
    });

    it("truncates text that exceeds the default limit", () => {
      const { result } = renderHook(() => useReadMore(longText));
      expect(result.current.shouldTruncate).toBe(true);
      expect(result.current.displayText).toBe(longText.slice(0, 100));
    });

    it("respects a custom maxLength", () => {
      const { result } = renderHook(() => useReadMore(longText, 20));
      expect(result.current.displayText).toBe(longText.slice(0, 20));
    });

    it("does not truncate text equal to the limit", () => {
      const textAtLimit = "A".repeat(100);
      const { result } = renderHook(() => useReadMore(textAtLimit));
      expect(result.current.shouldTruncate).toBe(false);
    });
  });

  describe("toggleReadMore", () => {
    it("expands text when called once", () => {
      const { result } = renderHook(() => useReadMore(longText));

      act(() => result.current.toggleReadMore());

      expect(result.current.isExpanded).toBe(true);
      expect(result.current.displayText).toBe(longText);
    });

    it("collapses text when called twice", () => {
      const { result } = renderHook(() => useReadMore(longText));

      act(() => result.current.toggleReadMore());
      act(() => result.current.toggleReadMore());

      expect(result.current.isExpanded).toBe(false);
      expect(result.current.displayText).toBe(longText.slice(0, 100));
    });
  });

  describe("empty text", () => {
    it("handles an empty string without truncating", () => {
      const { result } = renderHook(() => useReadMore(""));
      expect(result.current.shouldTruncate).toBe(false);
      expect(result.current.displayText).toBe("");
    });
  });
});
