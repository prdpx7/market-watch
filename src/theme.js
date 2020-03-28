import { grey, white } from "color-name"

const breakpoints = {
  xs: '479px',
  sm: '767px', // lesser than this -> phones
  md: '991px', // lesser than this -> tablets, small laptops
  lg: '1199px', // lesser than this laptops, desktops
}

export const lightMode = {
  themeName: "light",
  bg: "#fff",
  primary: "#111",
  breakpoints: breakpoints,
  linkColor: "#61dafb",
  darkGray: "#2b2d3c",
  green: "green",
  backgroundGreen: "#ddf0b4",
  backgroundRed: "#f7c2ba",
  red: "red",
  indexChangeFontWeight: "500",
  fontWeight: "500",
  indexFooterColor: "grey"
}

export const darkMode = {
  themeName: "dark",
  bg: "#282c34",
  primary: "#fff",
  linkColor: "#61dafb",
  breakpoints: breakpoints,
  green: "green",
  red: "red",
  backgroundGreen: "#ddf0b4",
  backgroundRed: "#f7c2ba",
  indexChangeFontWeight: "600",
  fontWeight: "600",
  indexFooterColor: "lightgrey"
}
