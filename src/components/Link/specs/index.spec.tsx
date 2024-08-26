import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { LinkRootProps } from "../LinkRoot.types";
import { LinkRoot } from "../LinkRoot";
import { BrowserRouter as Router } from "react-router-dom";

describe("LinkRoot component", () => {
  const mockProps: LinkRootProps = {
    ariaLabel: "link",
    className: "link",
    label: "link",
    link: "/test",
    testid: "link",
    text: "Tooltip Text",
    children: "label"
  };

  const renderLink = (props: LinkRootProps) => {
    return render(
      <Router>
        <LinkRoot
          ariaLabel={props.ariaLabel}
          link={props.link}
          testid={props.testid}
          label={props.label}
          className={props.className}
          text={props.text}
        >
          {props.children}
        </LinkRoot>
      </Router>
    );
  }

  it("should be correctly rendered", () => {
    renderLink(mockProps);

    const linkElement = screen.getByRole("link");
    expect(linkElement).toBeInTheDocument();
    expect(linkElement).toHaveTextContent("label");
    expect(linkElement).toHaveAttribute("href", "/test");

    const tooltipTrigger = screen.getByTestId("link");
    expect(tooltipTrigger).toBeInTheDocument();
  });
});
