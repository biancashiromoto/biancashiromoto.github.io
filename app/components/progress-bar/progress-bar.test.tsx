import { describe, it, expect, vi, beforeEach } from "vitest";
import { render } from "@testing-library/react";
import { useScroll } from "@/app/context/ScrollProvider";
import ProgressBar from "./progress-bar";

vi.mock("@/app/context/ScrollProvider", () => ({
  useScroll: vi.fn(),
}));

const mockUseScroll = vi.mocked(useScroll);

describe("ProgressBar", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it("renders without crashing", () => {
    mockUseScroll.mockReturnValue({ scrollProgress: 0 });
    render(<ProgressBar />);
  });

  it("sets fill width to 0% when scrollProgress is 0", () => {
    mockUseScroll.mockReturnValue({ scrollProgress: 0 });
    const { container } = render(<ProgressBar />);
    const fill = container.querySelector("[class*='progressBarFill']") as HTMLElement;
    expect(fill.style.width).toBe("0%");
  });

  it("sets fill width to 50% when scrollProgress is 50", () => {
    mockUseScroll.mockReturnValue({ scrollProgress: 50 });
    const { container } = render(<ProgressBar />);
    const fill = container.querySelector("[class*='progressBarFill']") as HTMLElement;
    expect(fill.style.width).toBe("50%");
  });

  it("sets fill width to 100% when scrollProgress is 100", () => {
    mockUseScroll.mockReturnValue({ scrollProgress: 100 });
    const { container } = render(<ProgressBar />);
    const fill = container.querySelector("[class*='progressBarFill']") as HTMLElement;
    expect(fill.style.width).toBe("100%");
  });
});
