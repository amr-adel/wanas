// Suppressing react-dom act warning
// https://github.com/testing-library/react-testing-library/issues/459

const originalError = global.console.error;
beforeAll(() => {
  global.console.error = jest.fn((...args) => {
    if (
      typeof args[0] === "string" &&
      args[0].includes("a test was not wrapped in act")
    ) {
      return;
    }
    return originalError.call(console, args);
  });
});

afterAll(() => {
  global.console.error.mockRestore();
});
