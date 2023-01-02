import * as NextImage from "next/image";
import { Global, ThemeProvider } from "@emotion/react";

import { globalStyles, theme } from "@/styles";

const OriginalNextImage = NextImage.default;

Object.defineProperty(NextImage, "default", {
  configurable: true,
  value: (props) => <OriginalNextImage {...props} unoptimized />,
});

const customTheme = {
  ...theme,
  margin: "10px",
};

export const decorators = [
  (Story) => (
    <>
      <Global styles={globalStyles} />
      <ThemeProvider theme={customTheme}>
        <Story />
      </ThemeProvider>
    </>
  ),
];

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    expanded: true,
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};
