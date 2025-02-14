const React = require("react");

module.exports = {
    BrowserRouter: ({ children }) => children,
    Link: ({ children }) => <a>{children}</a>,
  };

//   module.exports = {
//     BrowserRouter: ({ children }) => children,
//     Link: ({ children }) => <a href={to}>{children}</a>,
//   };