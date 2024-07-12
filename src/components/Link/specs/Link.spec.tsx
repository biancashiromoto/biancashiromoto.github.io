import { describe } from "vitest";
import { LinkRootProps } from "../LinkRoot.types";
import { render, RenderResult } from "@testing-library/react";
import { LinkRoot } from "../LinkRoot";
import { LinkLabel } from "../LinkLabel";

describe("Link component", () => {
  const mockProps = {
    ariaLabel: "link",
    className: "link",
    href: "link",
    testid: "link"
  };
  const renderLink = (props: LinkRootProps): RenderResult => {
    return render(
      <LinkRoot
        ariaLabel={props.ariaLabel}
        className={props.className}
        href={props.href}
        testid={props.testid}
      >
        <LinkLabel label="label" />
      </LinkRoot>
    );
  }
  it("should be correctly rendered", () => {
    const { getByRole, getByTestId } = renderLink(mockProps);
    expect(getByTestId("link")).toBeInTheDocument();
    expect(getByRole("link").firstChild).toHaveTextContent("label");
    expect(getByRole("link").classList).toContain("link");
  });
});