import React from 'react'
import Typography from '@material-ui/core/Typography'
import Skeleton from "@material-ui/lab/Skeleton";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions/CardActions";
import Card from "@material-ui/core/Card/Card";

const LoadingCasesList = () => {

  return (
    <>
      {Array.from(Array(6)).map((i, index) => {
        return (
            <Card key={index}>
              <Skeleton  animation="wave" variant="rect" width={345} height={190} />
              <CardContent>
                <Typography component="div" variant={"h3"}>
                  <Skeleton animation="wave" />
                </Typography>
                <br/>

                <Skeleton animation="wave" width="100%"/>
                <Skeleton animation="wave" width="100%"/>
                <Skeleton animation="wave" width="100%"/>
                <Skeleton animation="wave" width={"75%"} />
              </CardContent>
              <br/>
              <br/>
            </Card>
        )
      }
      )}
    </>
  )
}

export default LoadingCasesList
