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

            /*["@media (max-width:768px)"]: {
                backgroundImage: `url(${imgMobile})`,
                backgroundSize: "cover",
            },*/
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

            /* ["@media (max-width:768px)"]: {
                 margin: "auto",
                 display: "flex",
                 alignItems: "center",
                 justifyContent: "center",
             },*/
        },

        login: {
            width: "500px",
            height: "775px",
            position: "absolute",
            top: "10%",
            bottom: "0",
            right: "0",
            borderRadius: "8%",
            marginRight: "10%",
        },


    };
}


export default oStyle
