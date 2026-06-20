import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useQuery } from "@tanstack/react-query";
import { useLanguage } from "@/app/context/LanguageProvider";
import ProjectsContainer from "./projects-container";
import { Repository } from "@/app/helpers/classes/fetchRepos";

vi.mock("@tanstack/react-query", () => ({ useQuery: vi.fn() }));

vi.mock("@/app/context/LanguageProvider", () => ({ useLanguage: vi.fn() }));

vi.mock("@/app/helpers/classes/Utils", () => ({
  default: vi.fn().mockImplementation(() => ({
    getLocalStorage: vi.fn().mockReturnValue(null),
    isLanguagePortuguese: vi.fn().mockReturnValue(false),
  })),
}));

vi.mock("../project-card/project-card", () => ({
  default: ({ repo }: { repo: Repository }) => <div data-testid="project-card">{repo.name}</div>,
}));

vi.mock("react-icons/bs", () => ({
  BsArrowLeft: () => <span>←</span>,
  BsArrowRight: () => <span>→</span>,
}));

const mockUseQuery = vi.mocked(useQuery);
const mockUseLanguage = vi.mocked(useLanguage);

const defaultRepo: Repository = {
  id: 1,
  name: "project-alpha",
  description: "First project",
  html_url: "https://github.com/biancashiromoto/project-alpha",
  homepage: "https://project-alpha.vercel.app",
  language: "TypeScript",
  topics: ["display", "react"],
};

const secondRepo: Repository = {
  ...defaultRepo,
  id: 2,
  name: "project-beta",
  description: "Second project",
  html_url: "https://github.com/biancashiromoto/project-beta",
  homepage: "https://project-beta.vercel.app",
};

const defaultLanguageContext = {
  isLanguagePortuguese: false,
  toggleLanguage: vi.fn(),
  information: {} as any,
  isLoading: false,
};

const defaultQueryResult = {
  data: [defaultRepo, secondRepo],
  isLoading: false,
  isError: false,
  error: null,
} as any;

describe("ProjectsContainer", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
    mockUseLanguage.mockReturnValue(defaultLanguageContext);
    mockUseQuery.mockReturnValue(defaultQueryResult);
  });

  it("renders the heading in English", () => {
    render(<ProjectsContainer />);
    expect(screen.getByRole("heading", { name: "Projects" })).toBeInTheDocument();
  });

  it("renders the heading in Portuguese", () => {
    mockUseLanguage.mockReturnValue({
      ...defaultLanguageContext,
      isLanguagePortuguese: true,
    });
    render(<ProjectsContainer />);
    expect(screen.getByRole("heading", { name: "Projetos" })).toBeInTheDocument();
  });

  it("shows loading message in English when isLoading is true and no data", () => {
    mockUseQuery.mockReturnValue({
      data: undefined,
      isLoading: true,
      isError: false,
      error: null,
    } as any);
    render(<ProjectsContainer />);
    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("shows loading message in Portuguese when isLoading is true and no data", () => {
    mockUseLanguage.mockReturnValue({
      ...defaultLanguageContext,
      isLanguagePortuguese: true,
    });
    mockUseQuery.mockReturnValue({
      data: undefined,
      isLoading: true,
      isError: false,
      error: null,
    } as any);
    render(<ProjectsContainer />);
    expect(screen.getByText("Carregando...")).toBeInTheDocument();
  });

  it("shows error message in English when isError is true", () => {
    mockUseQuery.mockReturnValue({
      data: undefined,
      isLoading: false,
      isError: true,
      error: { message: "Network error" },
    } as any);
    render(<ProjectsContainer />);
    expect(screen.getByText(/Error loading projects/)).toBeInTheDocument();
    expect(screen.getByText(/Network error/)).toBeInTheDocument();
  });

  it("shows error message in Portuguese when isError is true", () => {
    mockUseLanguage.mockReturnValue({
      ...defaultLanguageContext,
      isLanguagePortuguese: true,
    });
    mockUseQuery.mockReturnValue({
      data: undefined,
      isLoading: false,
      isError: true,
      error: null,
    } as any);
    render(<ProjectsContainer />);
    expect(screen.getByText(/Erro ao carregar projetos/)).toBeInTheDocument();
  });

  it("shows no-projects message when repos is empty", () => {
    mockUseQuery.mockReturnValue({
      data: [],
      isLoading: false,
      isError: false,
      error: null,
    } as any);
    render(<ProjectsContainer />);
    expect(screen.getByText("No projects available")).toBeInTheDocument();
  });

  it("renders the first ProjectCard by default", () => {
    render(<ProjectsContainer />);
    expect(screen.getByTestId("project-card")).toHaveTextContent("project-alpha");
  });

  it("renders navigation buttons", () => {
    render(<ProjectsContainer />);
    expect(screen.getByRole("button", { name: "Projeto anterior" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Próximo projeto" })).toBeInTheDocument();
  });

  it("advances to the next card when next button is clicked", async () => {
    const user = userEvent.setup();
    render(<ProjectsContainer />);
    await user.click(screen.getByRole("button", { name: "Próximo projeto" }));
    expect(screen.getByTestId("project-card")).toHaveTextContent("project-beta");
  });

  it("goes to the previous card when previous button is clicked", async () => {
    const user = userEvent.setup();
    render(<ProjectsContainer />);
    await user.click(screen.getByRole("button", { name: "Próximo projeto" }));
    await user.click(screen.getByRole("button", { name: "Projeto anterior" }));
    expect(screen.getByTestId("project-card")).toHaveTextContent("project-alpha");
  });

  it("wraps around to the last card when going previous from the first", async () => {
    const user = userEvent.setup();
    render(<ProjectsContainer />);
    await user.click(screen.getByRole("button", { name: "Projeto anterior" }));
    expect(screen.getByTestId("project-card")).toHaveTextContent("project-beta");
  });

  it("wraps around to the first card when going next from the last", async () => {
    const user = userEvent.setup();
    render(<ProjectsContainer />);
    await user.click(screen.getByRole("button", { name: "Próximo projeto" }));
    await user.click(screen.getByRole("button", { name: "Próximo projeto" }));
    expect(screen.getByTestId("project-card")).toHaveTextContent("project-alpha");
  });

  it("advances card with ArrowRight key", async () => {
    const user = userEvent.setup();
    render(<ProjectsContainer />);
    const container = document.querySelector("[tabindex='0']") as HTMLElement;
    container.focus();
    await user.keyboard("{ArrowRight}");
    expect(screen.getByTestId("project-card")).toHaveTextContent("project-beta");
  });

  it("goes to previous card with ArrowLeft key", async () => {
    const user = userEvent.setup();
    render(<ProjectsContainer />);
    const container = document.querySelector("[tabindex='0']") as HTMLElement;
    container.focus();
    await user.keyboard("{ArrowRight}");
    await user.keyboard("{ArrowLeft}");
    expect(screen.getByTestId("project-card")).toHaveTextContent("project-alpha");
  });
});
