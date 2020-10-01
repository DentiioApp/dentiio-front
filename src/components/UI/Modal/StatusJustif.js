import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import InfoIcon from '@material-ui/icons/Info';

const styles = (theme) => ({
    root: {
        margin: 0,
        padding: theme.spacing(2),
    },
    closeButton: {
        position: 'absolute',
        right: theme.spacing(1),
        top: theme.spacing(1),
        color: theme.palette.grey[500],
    },
});

const DialogTitle = withStyles(styles)((props) => {
    const { children, classes, onClose, ...other } = props;
    return (
        <MuiDialogTitle disableTypography className={classes.root} {...other}>
            <Typography variant="h6">{children}</Typography>
            {onClose ? (
                <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
                    <CloseIcon />
                </IconButton>
            ) : null}
        </MuiDialogTitle>
    );
});

const DialogContent = withStyles((theme) => ({
    root: {
        padding: theme.spacing(2),
    },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
    root: {
        margin: 0,
        padding: theme.spacing(1),
    },
}))(MuiDialogActions);

export default function StatusJustif() {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    return (
        <>
            <IconButton color="primary" onClick={handleClickOpen} aria-label="upload picture" component="span">
                <InfoIcon />
            </IconButton>
            <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
                <DialogTitle id="customized-dialog-title" onClose={handleClose}>
                    Confirmez votre status
                </DialogTitle>
                <DialogContent dividers>
                    <Typography gutterBottom variant={"subtitle1"}>
                        Validez votre inscription en soumettant tout document attestant que vous êtes
                        un étudiant ou professionnel de la santé bucco-dentaire.<br/>
                        (exemple: certificat de scolarité, carte étudiante, CPS, contrat de travail, diplôme, etc.)
                    </Typography>
                    <br/>
                    <Typography gutterBottom>
                        Votre justificatif doit impérativement faire apparaître:
                    </Typography>
                    <ul>
                        <li>Votre nom et prénom</li>
                        <li>Votre spécialité ou votre statut</li>
                        <li>Votre affiliation à un ordre, faculté/école ou établissement de santé</li>
                    </ul>
                    <Typography gutterBottom>
                        Si vous avez une question, n’hésitez pas à nous contacter sur : contact@dentiio.fr
                    </Typography>
                    <Typography gutterBottom variant={"subtitle2"} className={"textCenter"}>
                    Aucune des informations fournies ne sera publiée. Celles-ci ne serviront qu'à valider votre profil par l'équipe Dentiio.
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={handleClose} color="primary">
                        J'AI COMPRIS
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}

