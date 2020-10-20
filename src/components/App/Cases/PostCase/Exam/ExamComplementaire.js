import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import {TextField, Grid} from "@material-ui/core";
import {DropzoneArea} from 'material-ui-dropzone';
import {Fingerprint, Scanner, AddAPhoto, Panorama} from "@material-ui/icons";

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`vertical-tabpanel-${index}`}
            aria-labelledby={`vertical-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    {children}
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
        id: `vertical-tab-${index}`,
        'aria-controls': `vertical-tabpanel-${index}`,
    };
}

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
        display: 'flex',
        alignItems: 'left',
        width: '100%'
    },
    tabs: {
        borderRight: `1px solid ${theme.palette.primary}`,
    },
}));

const ExamComplementaire = (props) => {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <div className={classes.root}>
            <Tabs
                orientation="vertical"
                variant="scrollable"
                value={value}
                onChange={handleChange}
                aria-label="Vertical tabs example"
                className={classes.tabs}
            >
                <Tab label="Scanner" {...a11yProps(0)} />
                <Tab label="Biopsy" {...a11yProps(1)} />
                <Tab label="Moulage en plâtre" {...a11yProps(2)} />
                <Tab label="Téléradiographie" {...a11yProps(3)} />
            </Tabs>
            <TabPanel value={value} index={0}>
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <DropzoneArea
                            showPreviews={true}
                            showPreviewsInDropzone={false}
                            dropzoneText={'Déposez vos scanner'}
                            useChipsForPreview
                            previewGridProps={{container: {spacing: 1, direction: 'row'}}}
                            previewText="Fichiers"
                            Icon={Scanner}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            placeholder='Description du Scanner'
                            variant='outlined'
                            label='Description du Scanner'
                            rows={5}
                            multiline
                            fullWidth
                            margin='dense'
                            name='scanner_desc'
                            type='textarea'
                            id='scanner_desc'
                            value={props.values.scanner_desc}
                            autoComplete='current-scanner_desc'
                            onChange={props.onChange('scanner_desc')}
                        />
                    </Grid>
                </Grid>
                </TabPanel>
            <TabPanel value={value} index={1}>
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                <DropzoneArea
                    showPreviews={true}
                    showPreviewsInDropzone={false}
                    dropzoneText={'Déposez vos biopsy'}
                    useChipsForPreview
                    previewGridProps={{container: {spacing: 1, direction: 'row'}}}
                    previewText="Fichiers"
                    Icon={Fingerprint}

                />
                    </Grid>
                    <Grid item xs={6}>

                    <TextField
                    aria-label='minimum height'
                    placeholder='Description de la Biopsy'
                    variant='outlined'
                    label='Description de la Biopsy'
                    rows={5}
                    multiline
                    fullWidth
                    margin='dense'
                    name='biopsy_desc'
                    type='textarea'
                    id='biopsy_desc'
                    value={props.values.biopsy_desc}
                    autoComplete='current-biopsy_desc'
                    onChange={props.onChange('biopsy_desc')}
                />
                    </Grid>
                </Grid>
            </TabPanel>
            <TabPanel value={value} index={2}>
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <DropzoneArea
                            showPreviews={true}
                            showPreviewsInDropzone={false}
                            dropzoneText={'Déposez vos photos de moulages'}
                            useChipsForPreview
                            previewGridProps={{container: {spacing: 1, direction: 'row'}}}
                            previewText="Fichiers"
                            Icon={AddAPhoto}

                        />
                    </Grid>
                    <Grid item xs={6}>

                        <TextField
                            aria-label='minimum height'
                            placeholder='Description du moulage'
                            variant='outlined'
                            label='Description du moulage'
                            rows={5}
                            multiline
                            fullWidth
                            margin='dense'
                            name='biopsy_desc'
                            type='textarea'
                            id='biopsy_desc'
                            value={props.values.moulage_desc}
                            autoComplete='current-moulage_desc'
                            onChange={props.onChange('moulage_desc')}
                        />
                    </Grid>
                </Grid>
            </TabPanel>
            <TabPanel value={value} index={3}>
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <DropzoneArea
                            showPreviews={true}
                            showPreviewsInDropzone={false}
                            dropzoneText={'Déposez vos téléradiographie'}
                            useChipsForPreview
                            previewGridProps={{container: {spacing: 1, direction: 'row'}}}
                            previewText="Fichiers"
                            Icon={Panorama}

                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            aria-label='minimum height'
                            placeholder='Description de la téléradiographie'
                            variant='outlined'
                            label='Description de la téléradiographie'
                            rows={5}
                            multiline
                            fullWidth
                            margin='dense'
                            name='teleradio_desc'
                            type='textarea'
                            id='teleradio_desc'
                            value={props.values.teleradio_desc}
                            autoComplete='current-teleradio_desc'
                            onChange={props.onChange('teleradio_desc')}
                        />
                    </Grid>
                </Grid>
            </TabPanel>
        </div>
    );
}

export default ExamComplementaire


