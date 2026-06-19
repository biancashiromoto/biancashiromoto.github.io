import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { useLanguage } from "@/app/context/LanguageProvider";
import { information as getInformation } from "@/app/helpers/information";
import Timeline from "./timeline";

vi.mock("@/app/context/LanguageProvider", () => ({
  useLanguage: vi.fn(),
}));

vi.mock("react-vertical-timeline-component", () => ({
  VerticalTimeline: ({ children }: any) => <div data-testid="vertical-timeline">{children}</div>,
  VerticalTimelineElement: ({ children, icon, date }: any) => (
    <div data-testid="timeline-element">
      <span data-testid="timeline-date">{date}</span>
      <span data-testid="timeline-icon">{icon}</span>
      {children}
    </div>
  ),
}));

vi.mock("react-vertical-timeline-component/style.min.css", () => ({}));

vi.mock("react-icons/fa", () => ({
  FaBriefcase: () => <span data-testid="icon-work" />,
  FaGraduationCap: () => <span data-testid="icon-education" />,
}));

const mockUseLanguage = vi.mocked(useLanguage);

const defaultLanguageContext = {
  isLanguagePortuguese: false,
  toggleLanguage: vi.fn(),
  isLoading: false,
  information: {} as any,
};

describe("Timeline", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
    mockUseLanguage.mockReturnValue(defaultLanguageContext);
  });

  it("renders the VerticalTimeline container", () => {
    render(<Timeline />);
    expect(screen.getByTestId("vertical-timeline")).toBeInTheDocument();
  });

  it("renders a timeline element for each entry", () => {
    const { home: { timeline } } = getInformation(false);
    render(<Timeline />);
    expect(screen.getAllByTestId("timeline-element")).toHaveLength(timeline.length);
  });

  it("renders work icon for work-type entries", () => {
    render(<Timeline />);
    const workIcons = screen.getAllByTestId("icon-work");
    expect(workIcons.length).toBeGreaterThan(0);
  });

  it("renders education icon for education-type entries", () => {
    render(<Timeline />);
    const educationIcons = screen.getAllByTestId("icon-education");
    expect(educationIcons.length).toBeGreaterThan(0);
  });

  it("renders position text for each unique item position", () => {
    const { home: { timeline } } = getInformation(false);
    render(<Timeline />);
    const uniquePositions = [...new Set(timeline.map((item) => item.position))];
    uniquePositions.forEach((position) => {
      expect(screen.getAllByText(position).length).toBeGreaterThan(0);
    });
  });

  it("renders inside a region landmark", () => {
    render(<Timeline />);
    expect(document.querySelector("[role='region']")).toBeInTheDocument();
  });
});
