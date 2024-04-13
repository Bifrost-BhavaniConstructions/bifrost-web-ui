// 1. Import the extendTheme function
import { extendTheme } from "@chakra-ui/react";
import { MultiSelectTheme } from "chakra-multiselect";

// 2. Extend the theme to include custom colors, fonts, etc
const colors = {
  brand: {
    "main-bg": "#303041",
    "low-bg": "#3D3A50",
    "low-bg-floating": "#B97B91",
    accent: "#0EA2F6",
    500: "#0EA2F6",
    "low-accent": "#F4FCFE",
    "text-color": "#F4FCFE",
  },
};

const fonts = {
  heading: `'AirbnbCereal', sans-serif`,
  body: `'AirbnbCereal', sans-serif`,
};

const config = {
  initialColorMode: "dark",
  useSystemColorMode: false,
};

const components = { MultiSelect: MultiSelectTheme };

const theme = extendTheme({ colors, config, fonts, components });

export default theme;
