import { red } from "@material-ui/core/colors";

export const oStyle = (theme, imgDesktop ,imgMobile) => {
    return {
        root: {
            height: "100vh",
            backgroundImage: `url(${imgDesktop})`,
            backgroundRepeat: "no-repeat",
            backgroundColor:
                theme.palette.type === "light"
                    ? theme.palette.grey[50]
                    : theme.palette.grey[900],
            backgroundSize: "contain",
            overflow: "hidden",

            ["@media (max-width:1025px)"]: {
                backgroundSize: "cover",

                ["@media (max-width:767px)"]: {
                    backgroundImage: `url(${imgMobile})`,
                    backgroundSize: "cover",

                },
            },
        },

        paper: {
            margin: theme.spacing(6, 4),
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
        },
        avatar: {
            margin: theme.spacing(1),
            width: "15%",
        },
        form: {
            width: "100%", // Fix IE 11 issue.
            marginTop: theme.spacing(1),
        },
        GradientBtn: {
            margin: theme.spacing(3, 0, 2),
        },

        logo: {
            position: "absolute",
            margin: "13px 23px 0px 32px",
        },

        login: {
            // width: "500px",
            height: "fit-content",
            position: "absolute",
            top: "8%",
            bottom: "0",
            right: "0",
            borderRadius: "20px",
            margin: theme.spacing(7, 15),
            // margin: "auto",


            ["@media (max-width:1024px)"]: {
                margin: "auto",
                position: "inherit",

                },


            }
        }
}


export default oStyle
