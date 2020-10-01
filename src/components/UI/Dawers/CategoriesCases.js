import "./CategorieCases.scss"
import React, {useEffect} from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ExpandMore from '@material-ui/icons/ExpandMore'
import ListItemText from '@material-ui/core/ListItemText';
import ListIcon from '@material-ui/icons/List';
import {fetchPathologies, fetchSpecialities, fetchTreatments} from "../../../store/actions";
import {useDispatch, useSelector} from "react-redux";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from '@material-ui/icons/Close';
import {Accordion, AccordionDetails, AccordionSummary} from "@material-ui/core";


const useStyles = makeStyles({
    list: {
        width: 250,
    },
    fullList: {
        width: 'auto',
    },
});

export default function TemporaryDrawer() {
    const classes = useStyles();
    const [state, setState] = React.useState({
        top: false,
        left: false,
        bottom: false,
        right: false,
    });
    const dispatch = useDispatch()
    const specialities = useSelector((state) => state.specialities.specialities)
    const treatments = useSelector((state) => state.treatments.treatments)
    const pathologies = useSelector((state) => state.pathologies.pathologies)

    const toggleDrawer = (anchor, open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        setState({ ...state, [anchor]: open });
    };

    useEffect(() => {
        if (treatments.length < 1) {
            dispatch(fetchTreatments())
        }
        if (specialities.length < 1) {
            dispatch(fetchSpecialities())
        }
        if (pathologies.length < 1) {
            dispatch(fetchPathologies())
        }
    })

    const list = (anchor) => (
        <div
            className={clsx(classes.list, {
                [classes.fullList]: anchor === 'top' || anchor === 'bottom',
            })}
            role="presentation"
        >
            <div className={"flex"}>
                <div className={"searchby"}>
                    Rechercher par
                </div>
                <div className={"drawerHeader"}>
                    <IconButton  onClick={toggleDrawer("left", false)}>
                        <CloseIcon htmlColor={"#fff"} fontSize={"default"}/>
                    </IconButton>
                </div>
            </div>

            <Accordion>
                <AccordionSummary expandIcon={<ExpandMore />}>
                    <ListItem>
                        <ListItemText primary='Pathologies' />
                    </ListItem>
                </AccordionSummary>

                <AccordionDetails>
                    <ListItem button className={classes.nested}>
                        <ListItemText />
                        <List>
                            {pathologies &&
                            pathologies.map((pathologie, index) => (
                                <ListItem button key={index}>
                                    <ListItemText primary={pathologie.name} />
                                </ListItem>
                            ))}
                        </List>
                    </ListItem>
                </AccordionDetails>
            </Accordion>

            <Accordion>
                <AccordionSummary expandIcon={<ExpandMore />}>
                    <ListItem>
                        <ListItemText primary='Spécialités' />
                    </ListItem>
                </AccordionSummary>

                <AccordionDetails>
                    <ListItem>
                        <ListItemText />
                        <List>
                            {specialities &&
                            specialities.map((speciality, index) => (
                                <ListItem button key={index}>
                                    <ListItemText primary={speciality.name} />
                                </ListItem>
                            ))}
                        </List>
                    </ListItem>
                </AccordionDetails>
            </Accordion>

            <Accordion>
                <AccordionSummary expandIcon={<ExpandMore />}>
                    <ListItem>
                        <ListItemText primary='Traitements' />
                    </ListItem>
                </AccordionSummary>

                <AccordionDetails>
                    <ListItem>
                        <ListItemText />
                        <List>
                            {treatments &&
                            treatments.map((treatment, index) => (
                                <ListItem button key={index}>
                                    <ListItemText primary={treatment.name} />
                                </ListItem>
                            ))}
                        </List>
                    </ListItem>
                </AccordionDetails>
            </Accordion>
        </div>
    );

    return (
        <div>
            <React.Fragment key={"left"}>
                <Button size={"large"} className={"boutonCat"} color={"primary"} variant={"contained"} onClick={toggleDrawer("left", true)}><ListIcon htmlColor={"#fff"}/></Button>
                <Drawer anchor={"left"} open={state["left"]} onClose={toggleDrawer("left", false)}>
                    {list("left")}
                </Drawer>
            </React.Fragment>
        </div>
    );
}
