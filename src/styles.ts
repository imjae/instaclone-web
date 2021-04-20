import { createGlobalStyle, DefaultTheme } from "styled-components";
import { reset } from "styled-reset";

export const lightTheme: DefaultTheme = {
  accent: "#0095f6",
  borderColor: "rgb(219, 219, 219)",
};

export const darkTheme: any = {};

export const GlobalStyles = createGlobalStyle`
    ${reset}
    input {
      all:unset;
    }
    * {
      box-sizing:border-box;
    }
    body {
        background-color: #FAFAFA;
        font-size:14px;
        font-family:'Open Sans', sans-serif;
        color: rgb(38, 38, 38);
    }
    a {
      text-decoration: none;
    }
`;