import { globalCss } from ".";

export default globalCss({
  "*": {
    boxSizing: "border-box",
    m: 0,
    p: 0,
    scrollBehavior: "smooth",
  },
  html: {
    "@media (max-width: 1080px)": {
      fontSize: "93.75%",
    },
    "@media (max-width: 720px)": {
      fontSize: "87.5%",
    },
    "@media (max-width: 480px)": {
      fontSize: "81.25%",
    },
  },
  a: {
    textDecoration: "none",
  },
  button: {
    cursor: "pointer",
    border: 0,
    transition: 250,
  },
});