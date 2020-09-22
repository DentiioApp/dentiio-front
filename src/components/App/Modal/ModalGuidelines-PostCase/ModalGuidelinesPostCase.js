import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import grey from "@material-ui/core/colors/grey";
export default function AlertDialog() {
    const [open, setOpen] = React.useState(true);

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"Lignes directrices pour la publication de cas cliniques"}</DialogTitle>
                <DialogContent color={{grey}}>
                        <ul>
                            <li>
                                Supprimez toutes les informations d'identification du patient. Cela comprend les noms, les dates, les lieux, les visages, les tatouages ​​ou tout autre détail qui pourrait être utilisé pour identifier un patient.
                                Veuillez vous référer à notre page d'identifiants pour une liste d'identifiants.
                            </li>
                            <br/>
                            <li>
                                Respectez les patients.
                            </li>
                            <br/>
                            <li>
                                Partagez uniquement les cas professionnels.
                            </li>
                            <br/>
                            <li>
                                Dentiio n'est pas destinée à partager vos propres conditions médicales, ni celles de votre famille ou de vos amis.
                            </li>
                        </ul>
                        Tous les cas sont examinés avant d'être ajoutés à notre base de données. Les cas qui ne répondent pas à ces critères ne seront pas acceptés. Veuillez noter que toutes vos activités sur la Dentiio sont soumises à nos directives communautaires complètes et à nos conditions d'utilisation.

                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary" variant="contained">
                        J'ai compris
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}