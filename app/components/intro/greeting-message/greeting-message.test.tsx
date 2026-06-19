import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import GreetingMessage from "./greeting-message";
import Information from "@/app/helpers/classes/Information";

vi.mock("../../typewriter/typewriter", () => ({
  default: ({ text }: { text: string }) => <span data-testid="typewriter">{text}</span>,
}));

const enInfo = new Information("en");
const ptInfo = new Information("pt");

describe("GreetingMessage", () => {
  it("renders non-name lines as spans", () => {
    render(<GreetingMessage {...enInfo} />);
    expect(screen.getByText("Hello!")).toBeInTheDocument();
    expect(screen.getByText("My name is")).toBeInTheDocument();
    expect(screen.getByText("and this is my portfolio!")).toBeInTheDocument();
  });

  it("renders the name line via Typewriter", () => {
    render(<GreetingMessage {...enInfo} />);
    expect(screen.getByTestId("typewriter")).toBeInTheDocument();
    expect(screen.getByTestId("typewriter")).toHaveTextContent(/Bianca/);
  });

  it("renders Portuguese greeting lines", () => {
    render(<GreetingMessage {...ptInfo} />);
    expect(screen.getByText("Olá!")).toBeInTheDocument();
    expect(screen.getByText("Meu nome é")).toBeInTheDocument();
    expect(screen.getByText("e esse é meu portfolio!")).toBeInTheDocument();
  });

  it("renders exactly one Typewriter for the name", () => {
    render(<GreetingMessage {...enInfo} />);
    expect(screen.getAllByTestId("typewriter")).toHaveLength(1);
  });
});
