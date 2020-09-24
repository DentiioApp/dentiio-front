import React, { useRef, useEffect } from 'react'
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import clsx from "clsx";
import { useDispatch, useSelector } from "react-redux";
import RightMenuIcon from "../../UI/RightMenuIcon/rightMenuIcon";
import TitleHeader from "../../UI/titleHeader/TitleHeader";
import { openSideBar, closeSideBar, fetchSpecialities, fetchTreatments } from "../../../store/actions";
import Collapse from "@material-ui/core/Collapse";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import { Treatments } from '../../../store/reducers/treatments';

const drawerWidth = 250;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
  appBar: {
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
}));

export default function PersistentDrawerLeft() {
  const sideBarRef = useRef(null)
  const classes = useStyles();
  const theme = useTheme();
  const dispatch = useDispatch();
  const open = useSelector((state) => state.cases.openSideBar);
  const specialities = useSelector((state) => state.specialities.specialities);
  const treatments = useSelector((state) => state.treatments.treatments);
  const pathologies = useSelector((state) => state.pathologies.pathologies);


  const handleDrawerOpen = () => {
    dispatch(openSideBar());

  };

  const handleDrawerClose = () => {
    dispatch(closeSideBar());
  };
  
 
  dispatch(fetchTreatments())
  dispatch(fetchSpecialities())
  dispatch(fetchPathologies());
  
  
  const [show, setOpen] = React.useState(true);
  const handleClick = () => {
    setOpen(!show);
  };
  
  function useOutsideSideBar(ref) {
    useEffect(() => {
      /**
       * Alert if clicked on outside of element
       */
      function handleClickOutside(event) {
        if (ref.current && !ref.current.contains(event.target)) {
             dispatch(closeSideBar());
        }
      }

      // Bind the event listener
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        // Unbind the event listener on clean up
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref]);
  }
  
  useOutsideSideBar(sideBarRef);

  return (
    <div className={classes.root} ref={sideBarRef}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, open && classes.hide)}
          >
            <TitleHeader />
          </IconButton>
          <RightMenuIcon />
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </div>
        <Divider />

        <ListItem button onClick={handleClick}>
          <ListItemText primary="Pathologies" />
          {show ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={show} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItem button className={classes.nested}>
              <ListItemText />
              <List>
                {pathologies.map((pathologie, index) => (
                  <ListItem button key={index}>
                    <ListItemText primary={pathologie.name} />
                  </ListItem>
                ))}
              </List>
            </ListItem>
          </List>
        </Collapse>

        <ListItem button onClick={handleClick}>
          <ListItemText primary="Spécialités" />
          {show ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={show} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItem button className={classes.nested}>
              <ListItemText />
              <List>
                {specialities.map((speciality, index) => (
                  <ListItem button key={index}>
                    <ListItemText primary={speciality.name} />
                  </ListItem>
                ))}
              </List>
            </ListItem>
          </List>
        </Collapse>
        <ListItem button onClick={handleClick}>
          <ListItemText primary="Traitements" />
          {show ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={show} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItem button className={classes.nested}>
              <ListItemText />
              <List>
                {treatments.map((treatment, index) => (
                  <ListItem button key={index}>
                    <ListItemText primary={treatment.name} />
                  </ListItem>
                ))}
              </List>
            </ListItem>
          </List>
        </Collapse>

        <Divider />
      </Drawer>
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
      ></main>
    </div>
  );
}
