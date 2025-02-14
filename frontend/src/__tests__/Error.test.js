import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Error from "../components/Error/Error"; // Adjust the path if necessary

describe("Error Component", () => {
  it("renders the error message correctly", () => {
    const testMessage = "Something went wrong!";

    // Render the component with the test message
    render(<Error errMessage={testMessage} />);

    // Check if the error message is displayed
    const errorElement = screen.getByText(testMessage);
    expect(errorElement).toBeInTheDocument();

    // Ensure correct styling
    expect(errorElement).toHaveClass("text-headingColor");
  });

  it("renders without crashing when no message is provided", () => {
    render(<Error />);
  });

  it("renders an empty heading when no message is provided", () => {
    render(<Error />);

    const heading = screen.getByRole("heading");

    // Ensure the <h3> exists but contains no text
    expect(heading).toBeInTheDocument();
    expect(heading).toBeEmptyDOMElement();
  });

});
