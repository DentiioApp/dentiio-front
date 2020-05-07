import { red } from "@material-ui/core/colors";

export const oStyle = (theme, img) => {
  return {
    root: {
      height: "100vh",
      backgroundImage: `url(${img})`,
      backgroundRepeat: "no-repeat",
      backgroundColor:
        theme.palette.type === "light"
          ? theme.palette.grey[50]
          : theme.palette.grey[900],
      backgroundSize: "contain",
      overflow: "hidden",
    },

    paper: {
      margin: theme.spacing(8, 4),
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
    },
    form: {
      width: "100%", // Fix IE 11 issue.
      marginTop: theme.spacing(1),
    },
    GradientBtn: {
      margin: theme.spacing(3, 0, 2),
    },
    test: {
      backgroundColor: "red",
      position: "absolute",
      marginLeft: "55%",
      marginRight: "15%",
      marginTop: "5%",
    }
  };
}

export default oStyle
