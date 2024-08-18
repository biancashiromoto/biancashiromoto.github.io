import { act, fireEvent, render, RenderResult } from "@testing-library/react";
import { describe, vi } from "vitest";
import { ButtonRootProps } from "../ButtonRoot.types";
import { ButtonRoot } from "../ButtonRoot";
import { ButtonLabel } from "../ButtonLabel";

describe("Button component", () => {
  const onClickMock = vi.fn();
  const mockProps = {
    className: "button",
    children: "button",
    onClick : onClickMock,
    testId: "button"
  }
  const renderButton = (props: ButtonRootProps): RenderResult => {
    return render(
      <ButtonRoot
        onClick={props.onClick}
        testId={props.testId}
      >
        <ButtonLabel label="label" />
      </ButtonRoot>
    );
  };

  it("should be correctly rendered", () => {
    const { getByRole, getByTestId } = renderButton(mockProps);
    expect(getByTestId("button")).toBeInTheDocument();
    expect(getByRole("button").firstChild).toHaveTextContent("label");
  });

  it("should correctly handle click", () => {
    const { getByRole } = renderButton(mockProps);
    act(() => fireEvent.click(getByRole("button")));
    expect(onClickMock).toHaveBeenCalled();
  });
});