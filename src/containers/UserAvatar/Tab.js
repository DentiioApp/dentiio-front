import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { useDispatch } from 'react-redux'
import SaveIcon from '@material-ui/icons/Save';
import { useHistory } from "react-router-dom";
import {
    Mouth,
    Eyebrows,
    Eye,
    Hair,
    HairColor,
    SkinColor,
    Accessories,
    Clothes,
    ClothesColor, Beard
} from "../../components/UI/Avatars/Library";
import Avatar, {Piece} from "avataaars";
import Button from "@material-ui/core/Button";
import {getUserById, getUserId, saveAvatar} from "../../services/Users";
import {UPDATE_AVATAR} from "../../store/actions";
import {useToasts} from "react-toast-notifications";
import config from "../../config";
function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`scrollable-force-tabpanel-${index}`}
            aria-labelledby={`scrollable-force-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

function a11yProps(index) {
    return {
        id: `scrollable-force-tab-${index}`,
        'aria-controls': `scrollable-force-tabpanel-${index}`,
    };
}

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        width: '100%',
        backgroundColor: theme.palette.background.paper,
        textAlign: "center",
        [theme.breakpoints.down('sm')]: {
            marginTop: '70px!important'
        }
    },
    btn: {
        margin: 5
    },
}));

export default function TabAvatar() {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);
    const [user, setUser] = React.useState({});
    let history = useHistory();
    const dispatch = useDispatch()
    const { addToast } = useToasts()
    const messages = config.messages.avatar



    const ResponseUser = async () => {
        const CaseById = await getUserById(getUserId())
        setUser(CaseById.datas)
    }

    const [mouth, setMouth] = React.useState("");
    const [eye, setEye] = React.useState("");
    const [eyebrow, setEyebrow] = React.useState("");
    const [hair, setHair] = React.useState("");
    const [hairColor, setHaircolor] = React.useState("");
    const [skinColor, setSkinColor] = React.useState("");
    const [accessories, setAccessories] = React.useState("");
    const [clothe, setClothe] = React.useState("");
    const [clotheColor, setClotheColor] = React.useState("");
    const [beard, setBeard] = React.useState("");
    const [beardColor, setBeardColor] = React.useState("");
    const [i, setI] = React.useState(true);

    useEffect(() => {
        if (Object.entries(user).length === 0) {
            ResponseUser()
        }
        if (user.avatar && i===true){
            setI(false)
            setBeardColor(user.avatar.facialHairColor)
            setMouth(user.avatar.mouthType)
            setEye(user.avatar.eyeType)
            setEyebrow(user.avatar.eyebrowType)
            setHair(user.avatar.topType)
            setHaircolor(user.avatar.hairColor)
            setSkinColor(user.avatar.skinColor)
            setAccessories(user.avatar.accessoriesType)
            setClothe(user.avatar.clotheType)
            setClotheColor(user.avatar.clotheColor)
            setBeard(user.avatar.facialHairType)
        }
    })

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const catchSubmit = async (e) => {
        e.preventDefault()
        const response = await saveAvatar({
            topType: hair,
            accessoriesType: accessories,
            hairColor: hairColor,
            facialHairType: hair,
            facialHairColor: beardColor,
            clotheType: clothe,
            clotheColor: clotheColor,
            eyebrowType: eyebrow,
            mouthType: mouth,
            skinColor: skinColor,
            eyeType: eye,
            avatarId: user.avatar.id
        })

        if (response === 'OK') { addToast(messages.success, { appearance: 'success' }) } else { addToast(messages.error, { appearance: 'error' }) }
        dispatch({ type: UPDATE_AVATAR })
        history.push('/profile')
    }
    return (
        <div className={classes.root}>
            <Avatar
                style={{width: '200px', height: '200px'}}
                avatarStyle='Circle'
                topType={hair && hair}
                accessoriesType={accessories && accessories}
                hairColor={hairColor && hairColor}
                facialHairType={beard && beard}
                facialHairColor={beardColor && beardColor}
                clotheType={clothe && clothe}
                clotheColor={clotheColor && clotheColor}
                eyeType={eye && eye}
                eyebrowType={eyebrow && eyebrow}
                mouthType={mouth && mouth}
                skinColor={skinColor && skinColor}
            />
            <br/>
            <Button
                onClick={catchSubmit}
                variant="contained"
                color="primary"
                size="small"
                className={classes.button}
                startIcon={<SaveIcon />}
            >
                Enregistrer
            </Button>
            <br/>
            <br/>
            <AppBar position="static" color="default">
                <Tabs
                    value={value}
                    onChange={handleChange}
                    variant="scrollable"
                    scrollButtons="on"
                    indicatorColor="primary"
                    textColor="primary"
                    aria-label="scrollable force tabs example"
                >
                    <Tab label="Yeux"  {...a11yProps(0)} />
                    <Tab label="Sourcil"  {...a11yProps(1)} />
                    <Tab label="Bouche"  {...a11yProps(2)} />
                    <Tab label="Cheveux" {...a11yProps(3)} />
                    <Tab label="Peau" {...a11yProps(4)} />
                    <Tab label="Barbe"  {...a11yProps(5)} />
                    <Tab label="Vêtement" {...a11yProps(6)} />
                    <Tab label="Accessoires"  {...a11yProps(7)} />

                </Tabs>
            </AppBar>
            <TabPanel value={value} index={0}>
                {Eye.map((type) => (
                    <Button key={type} onClick={() => setEye(type)}>
                        <Piece pieceType="eyes" pieceSize="250" eyeType={type}/>
                    </Button>
                ))}
            </TabPanel>
            <TabPanel value={value} index={1}>
                {Eyebrows.map((type) => (
                    <Button key={type} onClick={() => setEyebrow(type)}>
                        <Piece pieceType="eyebrows" pieceSize="250" eyebrowType={type}/>
                    </Button>
                ))}
            </TabPanel>
            <TabPanel value={value} index={2}>
                {Mouth.map((type) => (
                    <Button key={type} onClick={() => setMouth(type)}>
                        <Piece pieceType="mouth" pieceSize="250" mouthType={type}/>
                    </Button>
                ))}
            </TabPanel>
            <TabPanel value={value} index={3}>
                {HairColor.map((type) => (
                    <Button key={type} className={classes.btn} variant={"outlined"} onClick={() => setHaircolor(type)}>
                        {type}
                    </Button>
                ))}
                <br/>
                {Hair.map((type) => (
                    <Button key={type} onClick={() => setHair(type)}>
                        <Piece pieceType="top" pieceSize="100" topType={type} hairColor={hairColor}/>
                    </Button>
                ))}
            </TabPanel>
            <TabPanel value={value} index={4}>
                {SkinColor.map((type) => (
                    <Button key={type} onClick={() => setSkinColor(type)}>
                        <Piece pieceType="skin" pieceSize="100" skinColor={type} />
                    </Button>
                ))}
            </TabPanel>
            <TabPanel value={value} index={5}>
                {HairColor.map((type) => (
                    <Button key={type} className={classes.btn} variant={"outlined"} onClick={() => setBeardColor(type)}>
                        {type}
                    </Button>
                ))}
                <br/>
                {Beard.map((type) => (
                    <Button key={type} onClick={() => setBeard(type)}>
                        <Piece pieceType="facialHair" pieceSize="100" facialHairType={type} facialHairColor={beardColor}/>
                    </Button>
                ))}
            </TabPanel>
            <TabPanel value={value} index={6}>
                {ClothesColor.map((type) => (
                    <Button key={type} className={classes.btn} variant={"outlined"} onClick={() => setClotheColor(type)}>
                        {type}
                    </Button>
                ))}
                <br/>
                {Clothes.map((type) => (
                    <Button key={type} onClick={() => setClothe(type)}>
                        <Piece pieceType="clothe" pieceSize="100" clotheType={type} clotheColor={clotheColor}/>
                    </Button>
                ))}
            </TabPanel>
            <TabPanel value={value} index={7}>
                {Accessories.map((type) => (
                    <Button key={type} onClick={() => setAccessories(type)}>
                        <Piece pieceType="accessories" pieceSize="100" accessoriesType={type}/>
                    </Button>
                ))}
            </TabPanel>
        </div>
    );
}