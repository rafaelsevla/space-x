import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Avatar, Card, CardContent, CardHeader, CardMedia, Grid, makeStyles, Typography } from '@material-ui/core';
import { red } from '@material-ui/core/colors';

import Base from '../common/ui/base';
import { AsyncData, Launch, getFormatedDateWithYear } from '../common';

const useStyles = makeStyles(() => ({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 0,
    paddingTop: '56.25%'
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

export default function PastLaunches () {
  const classes = useStyles();
  const [ pastLaunches, setPastLaunches ] = useState<AsyncData<Launch[]>>({ status: 'loading' });

  useEffect(() => {
    (async () => {
      try {
        const response: { data: { launches: Launch[] } } = await axios.get('http://localhost:5000/v1/launches/past?offset=0&limit=10');
        setPastLaunches({ status: 'loaded', data: response.data.launches });
      } catch (err) {
        setPastLaunches({ status: 'error' });
      }
    })();
  }, []);

  return (
    <Base title='PAST LAUNCHES' data={pastLaunches}>
      {pastLaunches.status === 'loaded' && (
        <Grid container item xs={12} spacing={3}>
          {pastLaunches.data.map(launch => (
            <Grid item xs={4}>
              <Card className={classes.root}>
                <CardHeader
                  avatar={
                    <Avatar aria-label="recipe" className={classes.avatar}>
                      {launch.flight_number}
                    </Avatar>
                  }
                  title={`${launch.rocket.name} from ${launch.rocket.country}`}
                  subheader={getFormatedDateWithYear(launch.date_utc)}
                />
                <CardMedia
                  className={classes.media}
                  image={launch.rocket.flickr_images[0]}
                />
                <CardContent>
                  <Typography variant="body2" color="textSecondary" component="p">
                   {launch.details || 'Description unavailable.'}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Base>
  );
}
