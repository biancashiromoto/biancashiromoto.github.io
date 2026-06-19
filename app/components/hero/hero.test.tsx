import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import Hero from "./hero";

vi.mock("./hooks/useHeroScrollEffect", () => ({
  useHeroScrollEffect: () => ({ imageRef: { current: null } }),
}));

vi.mock("next/image", () => ({
  default: ({ src, alt, ...props }: any) => <img src={src} alt={alt} {...props} />,
}));

vi.mock("@/public/assets/image__laptop.jpg", () => ({
  default: "/assets/image__laptop.jpg",
}));

describe("Hero", () => {
  it("renders a section element", () => {
    const { container } = render(<Hero />);
    expect(container.querySelector("section")).toBeInTheDocument();
  });

  it("renders the laptop image with the correct alt text", () => {
    render(<Hero />);
    expect(screen.getByRole("img", { name: "Laptop" })).toBeInTheDocument();
  });
});
