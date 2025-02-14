import React from "react";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import About from "../components/About/About";

describe("About Component", () => {
  test("renders the heading correctly", () => {
    render(
      <BrowserRouter>
        <About />
      </BrowserRouter>
    );

    const heading = screen.getByText(/Proud to be one of the nations best/i);
    expect(heading).toBeInTheDocument();
  });

  test("renders the paragraphs correctly", () => {
    render(
      <BrowserRouter>
        <About />
      </BrowserRouter>
    );

    const paragraph1 = screen.getByText(
      /Lorem ipsum dolor sit amet consectetur adipisicing elit/i
    );
    const paragraph2 = screen.getByText(
      /Id cupiditate esse dolore ratione dignissimos/i
    );

    expect(paragraph1).toBeInTheDocument();
    expect(paragraph2).toBeInTheDocument();
  });

  test("renders the 'Learn More' button", () => {
    render(
      <BrowserRouter>
        <About />
      </BrowserRouter>
    );

    const button = screen.getByRole("button", { name: /Learn More/i });
    expect(button).toBeInTheDocument();
  });

  test("renders the link properly", () => {
    render(
      <BrowserRouter>
        <About />
      </BrowserRouter>
    );

    // Get the button instead of the link
    const button = screen.getByRole("button", { name: /learn more/i });

    // Now Jest should recognize the Link as an actual <a> tag
    // const link = screen.getByRole("link", { name: /learn more/i });
    // Find its closest parent <a> tag (Link)
    const link = button.closest("a");

    expect(link).toHaveAttribute("href", "/");
  });
});


// import React from "react";
// import { render, screen } from "@testing-library/react";
// import { expect } from "chai";
// import { MemoryRouter } from "react-router-dom"; // Needed for <Link>
// import About from "../components/About/About";

// describe("About Component", () => {
//   before(() => {
//     // Simulate a browser environment for Jest/Chai
//     global.jsdom = require("jsdom-global")();
//   });

//   after(() => {
//     global.jsdom();
//   });

//   it("renders the heading", () => {
//     render(
//       <MemoryRouter>
//         <About />
//       </MemoryRouter>
//     );
//     const heading = screen.getByText(/Proud to be one of the nations best/i);
//     expect(heading).to.exist;
//   });

//   it("renders the paragraphs", () => {
//     render(
//       <MemoryRouter>
//         <About />
//       </MemoryRouter>
//     );
//     const paragraph1 = screen.getByText(
//       /Lorem ipsum dolor sit amet consectetur adipisicing elit/i
//     );
//     const paragraph2 = screen.getByText(
//       /Lorem ipsum dolor sit amet consectetur, adipisicing elit/i
//     );
//     expect(paragraph1).to.exist;
//     expect(paragraph2).to.exist;
//   });

//   it("renders the Learn More button", () => {
//     render(
//       <MemoryRouter>
//         <About />
//       </MemoryRouter>
//     );
//     const button = screen.getByText(/Learn More/i);
//     expect(button).to.exist;
//   });

//   it("renders images", () => {
//     render(
//       <MemoryRouter>
//         <About />
//       </MemoryRouter>
//     );
//     const images = screen.getAllByRole("img");
//     expect(images).to.have.lengthOf.at.least(2);
//   });
// });
