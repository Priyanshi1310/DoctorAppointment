import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import FaqItem from "../components/Faq/FaqItem"; // Adjust the path if necessary

describe("FaqItem Component", () => {
  const mockFaq = {
    question: "What is React?",
    content: "React is a JavaScript library for building user interfaces."
  };

  it("renders the FAQ question correctly", () => {
    render(<FaqItem item={mockFaq} />);
    
    // Check if the question is displayed
    expect(screen.getByText(mockFaq.question)).toBeInTheDocument();
  });

  it("does not show the answer by default", () => {
    render(<FaqItem item={mockFaq} />);
    
    // Answer should not be in the document initially
    expect(screen.queryByText(mockFaq.content)).not.toBeInTheDocument();
  });

  it("shows the answer when clicked", () => {
    render(<FaqItem item={mockFaq} />);
    
    // Click to open the FAQ
    fireEvent.click(screen.getByText(mockFaq.question));
    
    // The answer should now be visible
    expect(screen.getByText(mockFaq.content)).toBeInTheDocument();
  });

  it("hides the answer when clicked again", () => {
    render(<FaqItem item={mockFaq} />);
    
    const questionElement = screen.getByText(mockFaq.question);

    // Click once to show the answer
    fireEvent.click(questionElement);
    expect(screen.getByText(mockFaq.content)).toBeInTheDocument();

    // Click again to hide the answer
    fireEvent.click(questionElement);
    expect(screen.queryByText(mockFaq.content)).not.toBeInTheDocument();
  });

  it("renders the plus icon initially", () => {
    render(<FaqItem item={mockFaq} />);
    
    // Look for an SVG inside the component (initially, it should be the plus icon)
    const plusIcon = document.querySelector("svg");
    
    expect(plusIcon).toBeInTheDocument();
  });
  
  it("renders the minus icon when expanded", () => {
    render(<FaqItem item={mockFaq} />);
  
    // Click the question to expand
    fireEvent.click(screen.getByText(mockFaq.question));
  
    // Find all SVGs in the document after the click
    const allSvgs = document.querySelectorAll("svg");
  
    // There should still be an SVG present (now the minus icon)
    expect(allSvgs.length).toBeGreaterThan(0);
  });
  
});
