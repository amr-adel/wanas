import { render } from "@testing-library/react";
import "@testing-library/jest-dom";

import { IntlProvider } from "react-intl";
import * as locales from "../lang";

const AllTheProviders = ({ children }) => {
  return (
    <IntlProvider locale="en" defaultLocale="en" messages={locales.en}>
      {children}
    </IntlProvider>
  );
};

const customRender = (ui, options) =>
  render(ui, { wrapper: AllTheProviders, ...options });

// re-export everything
export * from "@testing-library/react";

// override render method
export { customRender as render };
