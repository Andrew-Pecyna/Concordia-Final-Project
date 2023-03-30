import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
/* :root {
  --font-heading: 'Helvetica', Arial, Helvetica, sans-serif;
  --font-body: 'Helvetica', Arial, Helvetica, sans-serif;
  --padding-page: 24px;
  --dark-blue: #000a14;
  --medium-blue: #344d66;
  --light-blue: #c0cfdf;
  --off-white: #e9eef3;
} */

/* http://meyerweb.com/eric/tools/css/reset/
v2.0 | 20110126
License: none (public domain)
*/

html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, ol, ul, li,
fieldset, form, label, legend,
caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed,
figure, figcaption, footer, header, hgroup,
menu, nav, output, ruby, section, summary,
time, mark, audio, video {
  margin: 0;
  padding: 0;
  border: 0;
  box-sizing: border-box;
  font-size: 100%;
  vertical-align: baseline;
}
/* HTML5 display-role reset for older browsers */
article, aside, details, figcaption, figure,
footer, header, hgroup, menu, nav, section {
  display: block;
}
body {
  line-height: 1.25;
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

h1 {
  font-family: var(--font-heading);
  font-size: 32px;
  font-weight: bolder;
  text-align: center;
  text-transform: uppercase;
  color: var(--dark-blue);
}

h2 {
  font-family: var(--font-heading);
  font-size: 24px;
  font-weight: bold;
  text-align: center;
  text-transform: uppercase;
  color: var(--dark-blue);
}

h3,
label,
button {
  font-family: var(--font-heading);
  font-size: 18px;
  font-weight: bold;
  text-align: center;
  text-transform: uppercase;
  color: var(--medium-blue);
  
}

p,
a,
li,
blockquote,
input {
  font-family: var(--font-body);
  color: var(--dark-blue);
}

input {
  font-size: 24px;
  height: 42px;
  border: 2px solid var(--color-black);
  border-radius: 4px;
  padding: 0 12px;
  
}

`;

  export default GlobalStyle;