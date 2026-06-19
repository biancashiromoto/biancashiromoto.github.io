import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import TopicsList from "./topics-list";

describe("TopicsList", () => {
  it("renders each topic as a list item", () => {
    render(<TopicsList topics={["react", "typescript"]} />);
    expect(screen.getByText("react")).toBeInTheDocument();
    expect(screen.getByText("typescript")).toBeInTheDocument();
  });

  it("filters out the 'display' topic", () => {
    render(<TopicsList topics={["display", "react"]} />);
    expect(screen.queryByText("display")).not.toBeInTheDocument();
    expect(screen.getByText("react")).toBeInTheDocument();
  });

  it("renders an empty list when all topics are 'display'", () => {
    render(<TopicsList topics={["display"]} />);
    expect(screen.queryAllByRole("listitem")).toHaveLength(0);
  });

  it("renders an empty list when topics array is empty", () => {
    render(<TopicsList topics={[]} />);
    expect(screen.queryAllByRole("listitem")).toHaveLength(0);
  });

  it("renders multiple topics in order", () => {
    render(<TopicsList topics={["react", "nextjs", "typescript"]} />);
    const items = screen.getAllByRole("listitem");
    expect(items).toHaveLength(3);
    expect(items[0]).toHaveTextContent("react");
    expect(items[1]).toHaveTextContent("nextjs");
    expect(items[2]).toHaveTextContent("typescript");
  });
});
