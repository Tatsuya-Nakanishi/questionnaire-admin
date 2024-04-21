import "@testing-library/jest-dom";
import React from "react";
import { render, screen } from "@testing-library/react";
import BasicButton from "./index"; // パスは適宜調整してください

describe("BasicButton", () => {
  test("renders the button with the correct text", () => {
    render(<BasicButton>Click Me</BasicButton>);
    const buttonElement = screen.getByRole("button", { name: "Click Me" });
    expect(buttonElement).toBeInTheDocument();
    expect(buttonElement).toHaveClass("text-xl");
  });
});
