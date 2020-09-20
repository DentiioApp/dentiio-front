import {makeStyles} from "@material-ui/core/styles";
import {blue} from "@material-ui/core/colors";

const Style = makeStyles((theme) => ({
    root: {
        maxWidth: 345,
        border: 'solid 1px #90caf9'
    },
    media: {
        height: 0,
        paddingTop: '56.25%' // 16:9
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest
        })
    },
    expandOpen: {
        transform: 'rotate(180deg)'
    },
    avatar: {
        backgroundColor: blue[200]
    },
    flright: {
        float: 'right'
    }

}))

export default Style