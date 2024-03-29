import './caseItem.scss'
import { Link } from 'react-router-dom'
import Card from '@material-ui/core/Card'
import CardMedia from '@material-ui/core/CardMedia'
import CardContent from '@material-ui/core/CardContent'
import CardActions from '@material-ui/core/CardActions'
import Typography from '@material-ui/core/Typography'
// import FavButton from '../../../UI/buttons/FavButton/FavButton'
import UserAvatar from '../../../UI/Avatars/UserAvatar'
import { avgNotes } from '../../../../utils'
import ChatIcon from '@material-ui/icons/Chat'
import StarBorderIcon from '@material-ui/icons/StarBorder';
import StarIcon from '@material-ui/icons/Star';
import { HashLink } from "react-router-hash-link";
import OptionCaseButton from "../../../UI/buttons/OptionCaseButton/OptionCaseButton";
// import Box from "@material-ui/core/Box";



const CasesItem = (props) => {
  const img = () => {
    if (props.item.imgClinicalCaseOmnipratiques) {
      return props.item.imgClinicalCaseOmnipratiques.filter(function (i) {
        return i.isPrincipal === true
      }).map(function (img) {
        return img.path
      })
    }
  }

  return (
        <Card key={props.item.id} id={props.item.id} className="card" hidden={props.item.isEnable} style={{display: !props.item.isEnable ? "none" : "block"}}>
      {/*
      <FavButton alt='favorite' value={props.item} isFavorite={props.favorite} />
*/}
      {props.btnEdit ?
          <>
          <div className={"topCard"} >
            <OptionCaseButton  className={"settingBtn"} caseId={props.item.id}/>
          </div>
            </>
          : ""}
      <Link
        to={`/case/${props.item.id}`}
        style={{ textDecoration: "none", height: "100%" }}
      >
        {img()[0] !== undefined ? (
          <CardMedia
            className="media"
            image={process.env.REACT_APP_BACK_URL + "images/" + img()[0]}
            title={props.item.title}
          />
        ) : (
          <CardMedia
            className="media"
            image={window.location.origin + "/logoteethBleu.png"}
            title={props.item.title}
          />
        )}

        {/*        <div style={{ marginTop: '-35px', marginLeft: '15px' }}>
          {props.item.keyword && props.item.keyword.map((keyword, index) => (
            <Keyword key={index} keyword={keyword.name} />
          ))}
        </div>*/}
        <CardContent>
          <Typography variant="h6" component="p" className="title">
            {props.item.title}
          </Typography>
          <Typography variant="subtitle2" component="p" className="desc">
            {props.item.Patient?.reasonConsult}
          </Typography>
        </CardContent>
      </Link>
        <div className={"cardContent"}>
          <CardActions className={"card_action"}>
            <UserAvatar avatar={props?.item?.User?.avatar} width="50px" />
            <Typography
              variant="body2"
              style={{ color: "black", textTransform: "capitalize" }}
              component="p"
            >
              {props?.item?.User?.pseudo}
              <br />
              <span style={{ color: "dimgray", fontSize: "0.9em" }}>
                {props?.item?.User?.job?.name}
              </span>
            </Typography>
            <div className="grow" style={{ align: "right" }} />
            <HashLink
              to={`/case/${props.item.id}#discussion`}
              style={{
                textDecoration: "none",
                display: "flex",
                paddingTop: "5px",
              }}
            >
              <Typography variant="body2" color="textSecondary" component="p">
                {props.item.commentaires.length}
              </Typography>
              <ChatIcon color="primary" fontSize="medium" className="pr-15" />
            </HashLink>
            <Typography variant="body2" color="textSecondary" component="p">
              {props.item.notations
                ? isNaN(props.item.notations)
                  ? avgNotes(props.item.notations)
                  : "Aucune note"
                : null}
            </Typography>
            {isNaN(props.item.notations) ? (
              <StarIcon color="primary" fontSize="medium" />
            ) : (
              <StarBorderIcon color="primary" fontSize="medium" />
            )}
          </CardActions>
        </div>
    </Card>

  );
}

export default CasesItem
