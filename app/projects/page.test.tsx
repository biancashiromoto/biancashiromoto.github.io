import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { features } from "@/app/config/features";
import Projects from "./page";

const mockReplace = vi.fn();

vi.mock("next/navigation", () => ({
  useRouter: () => ({ replace: mockReplace }),
}));

vi.mock("@/app/config/features", () => ({
  features: { projects: true },
}));

vi.mock("../context/ReactQueryProvider", () => ({
  default: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

vi.mock("../components/projects-container/projects-container", () => ({
  default: () => <div data-testid="projects-container" />,
}));

describe("Projects page", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
    (features as { projects: boolean }).projects = true;
  });

  it("renders the projects container when flag is enabled", () => {
    render(<Projects />);
    expect(screen.getByTestId("projects-container")).toBeInTheDocument();
  });

  describe("when projects flag is disabled", () => {
    beforeEach(() => {
      (features as { projects: boolean }).projects = false;
    });

    it("renders NotFound component", () => {
      const { container } = render(<Projects />);
      expect(container.textContent).toContain("404");
    });
  });
});
