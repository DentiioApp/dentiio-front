import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import fav from '../../../images/maquette/fav.svg'
import vin from '../../../images/maquette/vin.svg'

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

const Case = (props) => {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card className={classes.root}>
      <CardHeader
        action={
          <IconButton aria-label="settings">
            <img src={fav} alt="favorite"/>
          </IconButton>
        }
      />
      <CardMedia
        className={classes.media}
        image={'https://upload.wikimedia.org/wikipedia/commons/1/17/Yin_yang.svg'}
        title="Paella dish"
      />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          {props.item.presentation}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        
        <Avatar aria-label="recipe" className={classes.avatar}>
            {'Av'}
        </Avatar>
        <small>{'pseudo'} </small>
        <small>  {'function'}</small>
        {/*<TeethButton>*/} 

        {/*</TeethButton>*/} 
        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>Presentation:</Typography>
           <Typography paragraph>{props.item.observation}</Typography>
          <Typography paragraph>Observation:</Typography>
          <Typography paragraph>{props.item.observation}</Typography>
          <Typography paragraph>Plan de traitement:</Typography>
          <Typography paragraph>{props.item.treatmentPlan}</Typography>
          <Typography paragraph color='blue'>Evolution:</Typography>
          <Typography paragraph>{props.item.evolution}</Typography>
          <Typography>
            {props.item.conclusion}
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
}

export default Case