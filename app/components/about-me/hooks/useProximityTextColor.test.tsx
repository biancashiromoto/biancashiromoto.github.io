import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { renderHook } from "@testing-library/react";
import { useWindowResize } from "@/app/context/WindowResizeProvider";
import { useProximityTextColor } from "./useProximityTextColor";

vi.mock("@/app/context/WindowResizeProvider", () => ({
  useWindowResize: vi.fn(),
}));

const mockUseWindowResize = vi.mocked(useWindowResize);

const desktopContext = { isDesktop: true, windowWidth: 1200 };
const mobileContext = { isDesktop: false, windowWidth: 375 };

// Wrapper component that attaches the ref to a real DOM element,
// letting the effect run with a non-null container.
function ProximityWrapper({ color = "cyan", radius = 100 }: { color?: string; radius?: number }) {
  const ref = useProximityTextColor(color, radius);
  return (
    <div ref={ref} data-testid="container">
      <span data-char="A">A</span>
    </div>
  );
}

describe("useProximityTextColor", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  describe("on mobile", () => {
    it("returns undefined", () => {
      mockUseWindowResize.mockReturnValue(mobileContext);
      const { result } = renderHook(() => useProximityTextColor());
      expect(result.current).toBeUndefined();
    });
  });

  describe("on desktop", () => {
    beforeEach(() => {
      mockUseWindowResize.mockReturnValue(desktopContext);
    });

    it("returns a ref object", () => {
      const { result } = renderHook(() => useProximityTextColor());
      expect(result.current).toBeDefined();
      expect(result.current).toHaveProperty("current");
    });

    it("applies color and fontWeight to a span within the radius on mousemove", () => {
      render(<ProximityWrapper color="cyan" radius={200} />);
      const container = screen.getByTestId("container");
      const span = container.querySelector("span[data-char]") as HTMLElement;

      // Place the span at a known position
      vi.spyOn(span, "getBoundingClientRect").mockReturnValue({
        left: 45, top: 45, width: 10, height: 10,
        right: 55, bottom: 55, x: 45, y: 45, toJSON: () => {},
      });

      // Mouse exactly over the span center (50, 50) — distance = 0
      container.dispatchEvent(new MouseEvent("mousemove", { clientX: 50, clientY: 50, bubbles: true }));

      expect(span.style.color).toBe("cyan");
      expect(span.style.fontWeight).toBe("600");
    });

    it("resets color for a span outside the radius on mousemove", () => {
      render(<ProximityWrapper color="cyan" radius={10} />);
      const container = screen.getByTestId("container");
      const span = container.querySelector("span[data-char]") as HTMLElement;
      span.style.color = "cyan";

      vi.spyOn(span, "getBoundingClientRect").mockReturnValue({
        left: 0, top: 0, width: 10, height: 10,
        right: 10, bottom: 10, x: 0, y: 0, toJSON: () => {},
      });

      // Mouse far away — distance >> 10
      container.dispatchEvent(new MouseEvent("mousemove", { clientX: 500, clientY: 500, bubbles: true }));

      expect(span.style.color).toBe("");
      expect(span.style.fontWeight).toBe("normal");
    });

    it("resets all span colors on mouseleave", () => {
      render(<ProximityWrapper color="cyan" radius={200} />);
      const container = screen.getByTestId("container");
      const span = container.querySelector("span[data-char]") as HTMLElement;
      span.style.color = "cyan";

      container.dispatchEvent(new MouseEvent("mouseleave", { bubbles: true }));

      expect(span.style.color).toBe("");
    });
  });
});
