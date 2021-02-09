import AppBar from "@material-ui/core/AppBar";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import { makeStyles } from "@material-ui/core/styles";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import Typography from "@material-ui/core/Typography";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import SaveIcon from "@material-ui/icons/Save";
import Avatar, { Piece } from "avataaars";
import PropTypes from "prop-types";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useToasts } from "react-toast-notifications";
import {
  Accessories,
  Clothes,
  ClothesColor,
  Eye,
  Eyebrows,
  Hair,
  HairColor,
  Mouth,
  SkinColor,
} from "../../components/UI/Avatars/Library";
import config from "../../config";
import { getUserById, getUserId, saveAvatar } from "../../services/Users";
import { SET_USER, UPDATE_AVATAR } from "../../store/actions";

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
    "aria-controls": `scrollable-force-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: "100%",
    backgroundColor: theme.palette.background.paper,
    textAlign: "center",
  },
  btn: {
    margin: 5,
  },
  arrowBack: {
    marginTop: "70px",
    [theme.breakpoints.up("sm")]: {
      marginTop: "0px",
    },
  },
}));

export default function TabAvatar() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const dispatch = useDispatch();
  const history = useHistory();
  const { addToast } = useToasts();
  const messages = config.messages.editUser;
  const currents_user = useSelector((state) => state.user.current_user);

  const [mouth, setMouth] = React.useState(
    currents_user.avatar && currents_user.avatar.mouthType
  );
  const [eye, setEye] = React.useState(
    currents_user.avatar && currents_user.avatar.eyeType
  );
  const [eyebrow, setEyebrow] = React.useState(
    currents_user.avatar && currents_user.avatar.eyebrowType
  );
  const [hair, setHair] = React.useState(
    currents_user.avatar && currents_user.avatar.topType
  );
  const [hairColor, setHaircolor] = React.useState(
    currents_user.avatar && currents_user.avatar.hairColor
  );
  const [skinColor, setSkinColor] = React.useState(
    currents_user.avatar && currents_user.avatar.skinColor
  );
  const [accessories, setAccessories] = React.useState(
    currents_user.avatar && currents_user.avatar.accessoriesType
  );
  const [clothe, setClothe] = React.useState(
    currents_user.avatar && currents_user.avatar.clotheType
  );
  const [clotheColor, setClotheColor] = React.useState(
    currents_user.avatar && currents_user.avatar.clotheColor
  );
  const [beard, setBeard] = React.useState(
    currents_user.avatar && currents_user.avatar.facialHairType
  );
  const [beardColor, setBeardColor] = React.useState(
    currents_user.avatar && currents_user.avatar.facialHairColor
  );
  const [i, setI] = React.useState(true);

  useEffect(() => {
    /* eslint-disable */
    if (currents_user.avatar && i === true) {
      // eslint-disable-line
      setI(false);
      setBeardColor(currents_user.avatar.facialHairColor);
      setMouth(currents_user.avatar.mouthType);
      setEye(currents_user.avatar.eyeType);
      setEyebrow(currents_user.avatar.eyebrowType);
      setHair(currents_user.avatar.topType);
      setHaircolor(currents_user.avatar.hairColor);
      setSkinColor(currents_user.avatar.skinColor);
      setAccessories(currents_user.avatar.accessoriesType);
      setClothe(currents_user.avatar.clotheType);
      setClotheColor(currents_user.avatar.clotheColor);
      setBeard(currents_user.avatar.facialHairType);
    }
  }, []);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const ResponseUser = async () => {
    const response = await getUserById(getUserId());

    if (Object.entries(response).length !== 0) {
      dispatch({ type: SET_USER, datas: response.datas });
    }
  };

    const catchSubmit = async (e) => {
        e.preventDefault()
        const response = await saveAvatar({
            topType: hair,
            accessoriesType: accessories,
            hairColor: hairColor,
            facialHairType: beard,
            facialHairColor: beardColor,
            clotheType: clothe,
            clotheColor: clotheColor,
            eyebrowType: eyebrow,
            mouthType: mouth,
            skinColor: skinColor,
            eyeType: eye,
            avatarId: currents_user.avatar.id
        })

    if (response === "OK") {
      addToast(messages.success, { appearance: "success" });
    } else {
      addToast(messages.error, { appearance: "error" });
    }
    dispatch({ type: UPDATE_AVATAR });
    await ResponseUser();
    history.push("/profile");
  };
  return (
    <>
      <IconButton
        className={classes.arrowBack}
        href={"#"}
        onClick={() => history.goBack()}
      >
        <ArrowBackIcon color="primary" />
      </IconButton>
      <div className={classes.root}>
        <Avatar
          style={{ width: "200px", height: "200px" }}
          avatarStyle="Circle"
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
        <br />
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
        <br />
        <br />
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
            <Tab label="Yeux" {...a11yProps(0)} />
            <Tab label="Sourcil" {...a11yProps(1)} />
            <Tab label="Bouche" {...a11yProps(2)} />
            <Tab label="Cheveux" {...a11yProps(3)} />
            <Tab label="Peau" {...a11yProps(4)} />
            <Tab label="Barbe"  {...a11yProps(5)} />
            <Tab label="Vêtement" {...a11yProps(6)} />
            <Tab label="Accessoires" {...a11yProps(7)} />
          </Tabs>
        </AppBar>
        <TabPanel value={value} index={0}>
          {Eye.map((type) => (
            <Button key={type} onClick={() => setEye(type)}>
              <Piece pieceType="eyes" pieceSize="250" eyeType={type} />
            </Button>
          ))}
        </TabPanel>
        <TabPanel value={value} index={1}>
          {Eyebrows.map((type) => (
            <Button key={type} onClick={() => setEyebrow(type)}>
              <Piece pieceType="eyebrows" pieceSize="250" eyebrowType={type} />
            </Button>
          ))}
        </TabPanel>
        <TabPanel value={value} index={2}>
          {Mouth.map((type) => (
            <Button key={type} onClick={() => setMouth(type)}>
              <Piece pieceType="mouth" pieceSize="250" mouthType={type} />
            </Button>
          ))}
        </TabPanel>
        <TabPanel value={value} index={3}>
          {HairColor.map((type) => (
            <Button
              key={type}
              className={classes.btn}
              variant={"outlined"}
              onClick={() => setHaircolor(type)}
            >
              {type}
            </Button>
          ))}
          <br />
          {Hair.map((type) => (
            <Button key={type} onClick={() => setHair(type)}>
              <Piece
                pieceType="top"
                pieceSize="100"
                topType={type}
                hairColor={hairColor}
              />
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
            <Button
              key={type}
              className={classes.btn}
              variant={"outlined"}
              onClick={() => setBeardColor(type)}
            >
              {type}
            </Button>
          ))}
          <br />
          {Beard.map((type) => (
            <Button key={type} onClick={() => setBeard(type)}>
              <Piece
                pieceType="facialHair"
                pieceSize="100"
                facialHairType={type}
                facialHairColor={beardColor}
              />
            </Button>
          ))}
        </TabPanel>
        <TabPanel value={value} index={6}>
          {ClothesColor.map((type) => (
            <Button
              key={type}
              className={classes.btn}
              variant={"outlined"}
              onClick={() => setClotheColor(type)}
            >
              {type}
            </Button>
          ))}
          <br />
          {Clothes.map((type) => (
            <Button key={type} onClick={() => setClothe(type)}>
              <Piece
                pieceType="clothe"
                pieceSize="100"
                clotheType={type}
                clotheColor={clotheColor}
              />
            </Button>
          ))}
        </TabPanel>
        <TabPanel value={value} index={7}>
          {Accessories.map((type) => (
            <Button key={type} onClick={() => setAccessories(type)}>
              <Piece
                pieceType="accessories"
                pieceSize="100"
                accessoriesType={type}
              />
            </Button>
          ))}
        </TabPanel>
      </div>
    </>
  );
}
