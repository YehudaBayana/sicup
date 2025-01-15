// import { createTheme } from "@mui/material";

// export const theme = createTheme({
//   components: {
//     MuiCssBaseline: {
//       styleOverrides: {
//         body: {
//           margin: 0,
//           padding: 0,
//           boxSizing: "border-box",
//         },
//       },
//     },
//     MuiPaper: {
//       styleOverrides: {
//         root: {
//           border: "none",
//           boxShadow: "none",
//         },
//       },
//     },
//     MuiButton: {
//       styleOverrides: {
//         root: {
//           border: "none",
//           boxShadow: "none",
//         },
//       },
//     },
//     MuiTextField: {
//       styleOverrides: {
//         root: {
//           "& .MuiOutlinedInput-root": {
//             border: "none",
//             boxShadow: "none",
//           },
//         },
//       },
//     },
//     MuiCard: {
//       styleOverrides: {
//         root: {
//           border: "none",
//           boxShadow: "none",
//         },
//       },
//     },
//   },
// });

// src/theme/theme.ts
import { createTheme, ThemeOptions } from "@mui/material/styles";
export const colors = {
  main: {
    primary: "#FF8600",
    secondary: "#f48fb1",
  },
  background: {
    default: "#007EA7",
    paper: "#003459",
  },
  text: {
    primary: "#ffffff",
    secondary: "#bdbdbd",
  },
};
const darkThemeOptions: ThemeOptions = {
  // palette: {
  //   mode: 'dark',
  //   primary: {
  //     main: colors.main.primary,
  //   },
  //   secondary: {
  //     main: colors.main.secondary,
  //   },
  //   background: {
  //     default: colors.background.default,
  //     paper: colors.background.paper,
  //   },
  //   text: {
  //     primary: colors.text.primary,
  //     secondary: colors.text.secondary,
  //   },
  // },
  // typography: {
  //   fontFamily: 'Roboto, Arial, sans-serif',
  // },
  palette: {
    mode: "dark",
    primary: {
      main: colors.main.primary,
    },
    secondary: {
      main: "#f48fb1",
    },
    background: {
      default: colors.background.default,
      paper: colors.background.paper,
    },
    text: {
      primary: colors.text.primary,
      secondary: colors.text.secondary,
    },
  },
  typography: {
    fontFamily: "Roboto, Arial, sans-serif",
  },
  shape: {
    borderRadius: 2,
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          margin: 0,
          padding: 0,
          boxSizing: "border-box",
        },
        a: {
          textDecoration: "none",
          color: "unset",
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          border: "none",
          boxShadow: "none",
          background: "rgba(0,0,0,0)",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          border: "none",
          boxShadow: "none",
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            border: "none",
            boxShadow: "none",
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          border: "none",
          boxShadow: "none",
        },
      },
    },
  },
};

export const darkTheme = createTheme(darkThemeOptions);
