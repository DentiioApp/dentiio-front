import React, {useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import {useSelector} from "react-redux";



const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    button: {
        marginRight: theme.spacing(1),
    },
    instructions: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
    },
}));

function getSteps() {
    return ['Information patient', 'Examens', 'Diagnostic', 'Plan de traitement', 'Evolution', 'Informations'];
}

export default function PostCaseStepper() {
    const home = useSelector((state) => state.home)
    const level = home.levelStepperPostCase

    const classes = useStyles();
    const [activeStep, setActiveStep] = React.useState(level);
    const steps = getSteps();

    useEffect(() => {
        setActiveStep(level)
    });

    return (
        <div className={classes.root}>
            <Stepper alternativeLabel activeStep={activeStep}>
                {steps.map((label) => (
                    <Step key={label}>
                        <StepLabel>{label}</StepLabel>
                    </Step>
                ))}
            </Stepper>
        </div>
    );
}
