import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { renderHook, act } from "@testing-library/react";
import useTypeWriter from "./useTypeWriter";
import { TypeWriterProps } from "../typewriter";

const defaultProps: TypeWriterProps = {
  text: "Hello",
  delay: 100,
  infinite: false,
};

const infiniteProps: TypeWriterProps = {
  ...defaultProps,
  infinite: true,
};

const emptyTextProps: TypeWriterProps = {
  ...defaultProps,
  text: "",
};

// The hook registers one timeout per character — each state update causes a
// re-render that schedules the next timeout. Advancing all time at once only
// fires the first timeout. Step through one delay at a time instead.
const advanceByNChars = (n: number, delay: number) => {
  for (let i = 0; i < n; i++) {
    act(() => vi.advanceTimersByTime(delay));
  }
};

describe("useTypeWriter", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  describe("initial state", () => {
    it("returns empty currentText on mount", () => {
      const { result } = renderHook(() => useTypeWriter(defaultProps));
      expect(result.current.currentText).toBe("");
    });

    it("returns currentIndex of 0 on mount", () => {
      const { result } = renderHook(() => useTypeWriter(defaultProps));
      expect(result.current.currentIndex).toBe(0);
    });

    it("returns showCursor as true on mount", () => {
      const { result } = renderHook(() => useTypeWriter(defaultProps));
      expect(result.current.showCursor).toBe(true);
    });

    it("returns isDeleting as false on mount", () => {
      const { result } = renderHook(() => useTypeWriter(defaultProps));
      expect(result.current.isDeleting).toBe(false);
    });
  });

  describe("typing phase", () => {
    it("types the first character after the delay", () => {
      const { result } = renderHook(() => useTypeWriter(defaultProps));

      act(() => {
        vi.advanceTimersByTime(100);
      });

      expect(result.current.currentText).toBe("H");
    });

    it("types each character one at a time with the given delay", () => {
      const { result } = renderHook(() => useTypeWriter(defaultProps));

      advanceByNChars(2, defaultProps.delay);

      expect(result.current.currentText).toBe("He");
    });

    it("types the full text after enough time has passed", () => {
      const { result } = renderHook(() => useTypeWriter(defaultProps));

      advanceByNChars(defaultProps.text.length, defaultProps.delay);

      expect(result.current.currentText).toBe("Hello");
    });

    it("does not type any character when text is empty", () => {
      const { result } = renderHook(() => useTypeWriter(emptyTextProps));

      act(() => {
        vi.advanceTimersByTime(1000);
      });

      expect(result.current.currentText).toBe("");
    });

    it("currentIndex equals the length of currentText", () => {
      const { result } = renderHook(() => useTypeWriter(defaultProps));

      act(() => {
        vi.advanceTimersByTime(300);
      });

      expect(result.current.currentIndex).toBe(result.current.currentText.length);
    });
  });

  describe("non-infinite mode", () => {
    it("stops typing after the full text is typed", () => {
      const { result } = renderHook(() => useTypeWriter(defaultProps));

      advanceByNChars(defaultProps.text.length, defaultProps.delay);

      expect(result.current.currentText).toBe("Hello");
      expect(result.current.isDeleting).toBe(false);

      act(() => vi.advanceTimersByTime(5000));

      expect(result.current.currentText).toBe("Hello");
      expect(result.current.isDeleting).toBe(false);
    });
  });

  describe("infinite mode", () => {
    it("starts deleting after 2 seconds once the full text is typed", () => {
      const { result } = renderHook(() => useTypeWriter(infiniteProps));

      advanceByNChars(infiniteProps.text.length, infiniteProps.delay);
      expect(result.current.currentText).toBe("Hello");

      act(() => vi.advanceTimersByTime(2000));

      expect(result.current.isDeleting).toBe(true);
    });

    it("deletes characters faster than typing", () => {
      const { result } = renderHook(() => useTypeWriter(infiniteProps));

      advanceByNChars(infiniteProps.text.length, infiniteProps.delay);
      act(() => vi.advanceTimersByTime(2000));

      // delete speed is delay/2 = 50ms per char; advance one step
      act(() => vi.advanceTimersByTime(50));

      expect(result.current.currentText.length).toBeLessThan(5);
    });

    it("restarts typing after deleting all characters", () => {
      const { result } = renderHook(() => useTypeWriter(infiniteProps));

      advanceByNChars(infiniteProps.text.length, infiniteProps.delay);
      act(() => vi.advanceTimersByTime(2000));

      // delete all 5 chars at delay/2 = 50ms each
      advanceByNChars(infiniteProps.text.length, infiniteProps.delay / 2);

      expect(result.current.currentText).toBe("");
      expect(result.current.isDeleting).toBe(false);
    });
  });

  describe("cursor blinking", () => {
    it("toggles showCursor every 500ms", () => {
      const { result } = renderHook(() => useTypeWriter(defaultProps));

      expect(result.current.showCursor).toBe(true);

      act(() => {
        vi.advanceTimersByTime(500);
      });

      expect(result.current.showCursor).toBe(false);

      act(() => {
        vi.advanceTimersByTime(500);
      });

      expect(result.current.showCursor).toBe(true);
    });
  });

  describe("text prop changes", () => {
    it("resets currentText when text prop changes", () => {
      const { result, rerender } = renderHook(
        (props: TypeWriterProps) => useTypeWriter(props),
        { initialProps: defaultProps }
      );

      advanceByNChars(3, defaultProps.delay);

      expect(result.current.currentText).toBe("Hel");

      // Change the text prop
      rerender({ ...defaultProps, text: "World" });

      expect(result.current.currentText).toBe("");
    });

    it("resets isDeleting when text prop changes", () => {
      const { result, rerender } = renderHook(
        (props: TypeWriterProps) => useTypeWriter(props),
        { initialProps: infiniteProps }
      );

      advanceByNChars(infiniteProps.text.length, infiniteProps.delay);
      act(() => vi.advanceTimersByTime(2000));

      expect(result.current.isDeleting).toBe(true);

      // Change text mid-deletion
      rerender({ ...infiniteProps, text: "World" });

      expect(result.current.isDeleting).toBe(false);
    });

    it("starts typing new text after prop change", () => {
      const { result, rerender } = renderHook(
        (props: TypeWriterProps) => useTypeWriter(props),
        { initialProps: defaultProps }
      );

      rerender({ ...defaultProps, text: "Hi" });

      act(() => {
        vi.advanceTimersByTime(100);
      });

      expect(result.current.currentText).toBe("H");
    });
  });
});
