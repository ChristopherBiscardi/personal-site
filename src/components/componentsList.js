import styled, { css } from "styled-components";
import { Link } from "gatsby";

import theme from "styled-theming";
import { createGlobalStyle } from "styled-components";

const darkBlue = "#131316";
const siteBg = "#F0EEE3";
export const textColorStyles = theme("mode", {
  light: css`
    color: ${darkBlue};
    font-size: 17px;
  `,
  dark: "#ffffff"
});

export const headingColorStyles = theme("mode", {
  light: darkBlue,
  dark: "#ffffff"
});

export const GlobalStyle = createGlobalStyle`
  html {
    height: 100%;
    width: 100%;
}
  body {
    background-color: ${siteBg};
    height: 100%;
  width: 100%;
  }
  #___gatsby,
#gatsby-focus-wrapper {
    height: 100%;
}
  `;

export const StyledContainer = styled.div`
  height: 100vh;
  width: 100vw;
  margin: 0;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr auto;
  grid-column-gap: 0px;
  grid-row-gap: 0px;
`;

const createWithStyles = (component, baseStyles, newStyles) => {
  const el = styled[component]`
    ${baseStyles}
    ${newStyles}
  `;
  return el;
};
const createInternalWithStyles = (component, baseStyles, newStyles) => {
  const el = styled(component)`
    ${baseStyles}
    ${newStyles}
  `;
  return el;
};

export const BaseLinkStyles = css`
  color: ${darkBlue};
  text-decoration: none;
`;

export const Header1 = createWithStyles("h1", headingColorStyles, "");
export const Header3 = createWithStyles("h3", headingColorStyles, "");

export const BaseText = createWithStyles("p", textColorStyles, "");

export const GeneralExternalLinkTag = createWithStyles("a", BaseLinkStyles, "");

export const BioExternalLinkTag = styled.a`
  padding: 5px;
  border-radius: "10px";
  background-color: #454553;
  color: #ffaf7b;
`;

export const InternalSiteLink = createInternalWithStyles(
  Link,
  BaseLinkStyles,
  `
box-shadow:none;
  `
);

export const OverflowYScrollContainer = styled.div`
  padding: 0.5em;
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow-y: scroll;
  flex-basis: 95%;
  align-items: flex-start;
  @media screen and (min-width: 30em) {
    flex-basis: 70%;
  }
`;

export const ListItem = styled.div`
  padding: 0.5em;
  display: flex;
  flex-direction: column;
  width: 100%;
`;
