import { css } from '@emotion/react';
import BackgroundDesktop from './background_photo_desktop.jpg';

export const globalStyles = css`
  /* RESET */

  html, body, div, span, applet, object, iframe,
  h1, h2, h3, h4, h5, h6, p, blockquote, pre,
  a, abbr, acronym, address, big, cite, code,
  del, dfn, em, img, ins, kbd, q, s, samp,
  small, strike, strong, sub, sup, tt, var,
  b, u, i, center,
  dl, dt, dd, ol, ul, li,
  fieldset, form, label, legend,
  table, caption, tbody, tfoot, thead, tr, th, td,
  article, aside, canvas, details, embed,
  figure, figcaption, footer, header, hgroup,
  menu, nav, output, ruby, section, summary,
  time, mark, audio, video {
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    font: inherit;
    vertical-align: baseline;
  }
  /* HTML5 display-role reset for older browsers */
  article, aside, details, figcaption, figure,
  footer, header, hgroup, menu, nav, section {
    display: block;
  }
  body {
    line-height: 1;
  }
  ol, ul {
    list-style: none;
  }
  blockquote, q {
    quotes: none;
  }
  blockquote:before, blockquote:after,
  q:before, q:after {
    content: '';
    content: none;
  }
  table {
    border-collapse: collapse;
    border-spacing: 0;
  }

  /* App global styles */

  * {
    box-sizing: border-box;
  }

  body,
  html,
  #root {
    height: 100%;
  }

  html {
    font-family: 'Work Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
    font-size: 18px;
    font-weight: 500;
    color: #fff;
  }

  h1 {
    padding: .77rem 0;
    background-color: #010c3f;
    text-align: center;
    font-family: 'Poppins', sans-serif;
    font-size: 1.88rem;
    color: #fff;
  }

  h2 {
    font-family: 'Poppins', sans-serif;
    font-size: 1.55rem;
  }

  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
`;

export const app = css`
  height: 100%;
  padding: 0 17% 10% 17%;
  background-image: url(${BackgroundDesktop});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
`;

export const app_playlist = css`
  display: flex;
  justify-content: space-between;
  width: 100%;

  @media only screen and (max-width: 1020px) {
    align-items: center;
    flex-direction: column;
  }
`;

export const highlight = css`
  h1 & {
    color: #6c41ec;
  }
`;