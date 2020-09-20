import {makeStyles} from "@material-ui/core/styles";
import palette from "../../components/UI/ColorTheme/Palette";

const Style = makeStyles((theme) => ({
    root: {
        margin: '30px 10px 50px 10px'
    },
    alignRight: {
        textAlign: 'right'
    },
    subtitle: {
        fontSize: '0.8em',
        color: palette.grey,
        paddingTop: 10
    },
    icon: {
        paddingRight: 10,
        marginTop: 2
    },
    resume: {
        paddingTop: 20
    },
    profileName: {
        textAlign: 'center',
        margin: 0
    },
    textCenter: {
        textAlign: 'center'
    },
    keywords: {
        margin: '0 2px'
    },
    h3: {
        marginTop: '50px',
        marginBottom: '20px',
        padding: '5px',
        color: palette.primary,
        borderBottom: '1px solid',
        borderColor: palette.primary
    },
    fixed: {
        position: 'fixed'
    },
    titleExam: {
        margin: '30px 0 15px 0'
    },
    patientDesktop: {
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'block'
        }
    },
    patientMobile: {
        display: 'block',
        [theme.breakpoints.up('sm')]: {
            display: 'none'
        }
    },
    paddigTopTitle: {
        paddingTop: '100px',
        [theme.breakpoints.up('sm')]: {
            paddingTop: '0'
        }
    }
}))

export default Style