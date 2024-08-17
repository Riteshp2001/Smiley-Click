// I got the React template from here:
// https://github.com/codesandbox/sandpack/blob/2d0c85c5ef4fa856c83e539e2c9e2ffd804fa366/sandpack-react/src/templates/react.ts

const react = {
  template: 'react',
  files: {
    '/App.js': {
      code: `export default function App() {
  return <h1>Hello World</h1>
}
`,
    },
    '/index.js': {
      hidden: true,
      code: `import React from "react";
import { createRoot } from 'react-dom/client';
import "./reset.css";
import "./styles.css";
import App from "./App";

const container = document.getElementById('root');
const root = createRoot(container);

root.render(<App />);`,
    },
    '/reset.css': {
      hidden: true,
      code: `
/*
  Josh's Custom CSS Reset
  https://www.joshwcomeau.com/css/custom-css-reset/
*/
*, *::before, *::after {
  box-sizing: border-box;
}
* {
  margin: 0;
}
html, body {
  height: 100%;
}
body {
  line-height: 1.5;
  -webkit-font-smoothing: antialiased;
}
img, picture, video, canvas, svg {
  display: block;
  max-width: 100%;
}
input, button, textarea, select {
  font: inherit;
}
p, h1, h2, h3, h4, h5, h6 {
  overflow-wrap: break-word;
}
#root, #__next {
  isolation: isolate;
}
\n\
/* Basic theme styles */
body {
  padding: 16px;
  font-family: 'Wotfard', sans-serif;
}
\n\
table {
  width: 100%;
  border-collapse: collapse;
}
th {
  text-align: left;
  border-bottom: 3px solid hsl(0deg 0% 25%);
}
tr:not(:last-of-type) td {
  border-bottom: 1px solid hsl(0deg 0% 50%);
}
\n\
/* Custom fonts */
@font-face {
  font-family: 'Wotfard';
  src: url('/fonts/wotfard/wotfard-semibold-webfont.woff2')
    format('woff2');
  font-weight: 600;
  font-style: normal;
  font-display: fallback;
}
\n\
@font-face {
  font-family: 'Wotfard';
  src: url('/fonts/wotfard/wotfard-medium-webfont.woff2')
    format('woff2');
  font-weight: 500;
  font-style: normal;
  font-display: fallback;
}
\n\
@font-face {
  font-family: 'Wotfard';
  src: url('/fonts/wotfard/wotfard-regular-webfont.woff2')
    format('woff2');
  font-weight: 400;
  font-style: normal;
  font-display: fallback;
}
      `,
    },
    '/styles.css': {
      hidden: true,
      code: ``,
    },
    '/public/index.html': {
      hidden: true,
      code: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
  </head>
  <body>
    <div id="root"></div>
  </body>
</html>`,
    },
  },
  dependencies: {
    react: '^17.0.0',
    'react-dom': '^17.0.0',
    'react-scripts': '^4.0.0',
  },
  entry: '/index.js',
  main: '/App.js',
  environment: 'create-react-app',
};

// This is a copy/paste of `react`, but with <StrictMode> added.
const strictReact = {
  template: 'react',
  files: {
    '/App.js': {
      code: `export default function App() {
  return <h1>Hello World</h1>
}
`,
    },
    '/index.js': {
      hidden: true,
      code: `import React from "react";
import { createRoot } from 'react-dom/client';
import "./reset.css";
import "./styles.css";
import App from "./App";

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);`,
    },
    '/reset.css': {
      hidden: true,
      code: `
/*
  Josh's Custom CSS Reset
  https://www.joshwcomeau.com/css/custom-css-reset/
*/
*, *::before, *::after {
  box-sizing: border-box;
}
* {
  margin: 0;
}
html, body {
  height: 100%;
}
body {
  line-height: 1.5;
  -webkit-font-smoothing: antialiased;
}
img, picture, video, canvas, svg {
  display: block;
  max-width: 100%;
}
input, button, textarea, select {
  font: inherit;
}
p, h1, h2, h3, h4, h5, h6 {
  overflow-wrap: break-word;
}
#root, #__next {
  isolation: isolate;
}
\n\
/* Basic theme styles */
body {
  padding: 16px;
  font-family: 'Wotfard', sans-serif;
}
\n\
table {
  width: 100%;
  border-collapse: collapse;
}
th {
  text-align: left;
  border-bottom: 3px solid hsl(0deg 0% 25%);
}
tr:not(:last-of-type) td {
  border-bottom: 1px solid hsl(0deg 0% 50%);
}
\n\
/* Custom fonts */
@font-face {
  font-family: 'Wotfard';
  src: url('/fonts/wotfard/wotfard-semibold-webfont.woff2')
    format('woff2');
  font-weight: 600;
  font-style: normal;
  font-display: fallback;
}
\n\
@font-face {
  font-family: 'Wotfard';
  src: url('/fonts/wotfard/wotfard-medium-webfont.woff2')
    format('woff2');
  font-weight: 500;
  font-style: normal;
  font-display: fallback;
}
\n\
@font-face {
  font-family: 'Wotfard';
  src: url('/fonts/wotfard/wotfard-regular-webfont.woff2')
    format('woff2');
  font-weight: 400;
  font-style: normal;
  font-display: fallback;
}
      `,
    },
    '/styles.css': {
      hidden: true,
      code: ``,
    },
    '/public/index.html': {
      hidden: true,
      code: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
  </head>
  <body>
    <div id="root"></div>
  </body>
</html>`,
    },
  },
  dependencies: {
    react: '^17.0.0',
    'react-dom': '^17.0.0',
    'react-scripts': '^4.0.0',
  },
  entry: '/index.js',
  main: '/App.js',
  environment: 'create-react-app',
};

const basicReact = {
  template: 'react',
  files: {},
};

const vanilla = {
  template: 'vanilla',
  files: {},
};

const templates = {
  vanilla,
  react,
  'basic-react': basicReact,
  'strict-react': strictReact,
};

export default templates;
