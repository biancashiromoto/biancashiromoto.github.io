import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { useLanguage } from "@/app/context/LanguageProvider";
import { information as getInformation } from "@/app/helpers/information";
import Timeline from "./timeline";

vi.mock("@/app/context/LanguageProvider", () => ({
  useLanguage: vi.fn(),
}));

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

  it("renders inside a region landmark with correct aria-label", () => {
    render(<Timeline />);
    expect(
      screen.getByRole("region", { name: /timeline of experience and education/i }),
    ).toBeInTheDocument();
  });

  it("renders a list item for each timeline entry", () => {
    const {
      home: { timeline },
    } = getInformation(false);
    render(<Timeline />);
    expect(screen.getAllByRole("listitem")).toHaveLength(timeline.length);
  });

  it("renders work icon for work-type entries", () => {
    render(<Timeline />);
    expect(screen.getAllByTestId("icon-work").length).toBeGreaterThan(0);
  });

  it("renders education icon for education-type entries", () => {
    render(<Timeline />);
    expect(screen.getAllByTestId("icon-education").length).toBeGreaterThan(0);
  });

  it("renders position text for each unique item", () => {
    const {
      home: { timeline },
    } = getInformation(false);
    render(<Timeline />);
    const uniquePositions = [...new Set(timeline.map((item) => item.position))];
    uniquePositions.forEach((position) => {
      expect(screen.getAllByText(position).length).toBeGreaterThan(0);
    });
  });

  it("renders location text for each item", () => {
    const {
      home: { timeline },
    } = getInformation(false);
    render(<Timeline />);
    const uniqueLocations = [...new Set(timeline.map((item) => item.location))];
    uniqueLocations.forEach((location) => {
      expect(screen.getAllByText(location).length).toBeGreaterThan(0);
    });
  });

  it("renders date for each item", () => {
    const {
      home: { timeline },
    } = getInformation(false);
    render(<Timeline />);
    const uniqueDates = [...new Set(timeline.map((item) => item.date))];
    uniqueDates.forEach((date) => {
      expect(screen.getAllByText(date).length).toBeGreaterThan(0);
    });
  });

  it("renders position as h3 and location as h4", () => {
    render(<Timeline />);
    expect(screen.getAllByRole("heading", { level: 3 }).length).toBeGreaterThan(0);
    expect(screen.getAllByRole("heading", { level: 4 }).length).toBeGreaterThan(0);
  });
});
