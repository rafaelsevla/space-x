import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Avatar, Button, Card, CardContent, CardHeader, CardMedia, Grid, makeStyles, Typography } from '@material-ui/core';
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
  paginationButton: {
    marginTop: 30
  }
}));

export default function UpcomingLaunches () {
  const classes = useStyles();
  const [ upcomingLaunches, setUpcomingLaunches ] = useState<AsyncData<Launch[]>>({ status: 'loading' });
  const [ paginationOffset, setPaginationOffset ] = useState<number>(0);

  async function fetchUpcomingLaunches (offset: number) {
    try {
      setUpcomingLaunches({ status: 'loading' })
      const response: { data: { launches: Launch[] } } = await axios.get(
        `${process.env.REACT_APP_API_URL}/v1/launches/upcoming?offset=${paginationOffset}&limit=12`
      );
      setUpcomingLaunches({ status: 'loaded', data: response.data.launches });
    } catch (err) {
      setUpcomingLaunches({ status: 'error' });
    }
  }

  useEffect(() => {
    fetchUpcomingLaunches(paginationOffset);
  }, []);

  function onPagination (action: 'next' | 'previous') {
    let newPaginationOffset;
    if (action === 'next') {
      newPaginationOffset = paginationOffset + 10;
    } else { // previous pagination
      newPaginationOffset = paginationOffset - 10;
    }
    fetchUpcomingLaunches(newPaginationOffset);
    setPaginationOffset(newPaginationOffset)
  }

  return (
    <Base title='UPCOMING LAUNCHES' data={upcomingLaunches}>
      {upcomingLaunches.status === 'loaded' && (
        <>
          <Grid container item xs={12} spacing={3}>
            {upcomingLaunches.data.length === 0 && (
              <Typography variant='h4'>
                There is no more release available
              </Typography>
            )}
            {upcomingLaunches.data.map(launch => (
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
                    {launch.details || 'Description coming soon...'}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>

          <Grid container item xs={12} spacing={3} className={classes.paginationButton}>
          <Grid container xs={6}>
            <Button
              variant="contained"
              color="primary"
              disabled={paginationOffset === 0}
              onClick={() => onPagination('previous')}
            >
              PREVIOUS PAGE
            </Button>
          </Grid>

          <Grid container xs={6} justify='flex-end'>
            <Button
              variant="contained"
              color="primary"
              disabled={upcomingLaunches.data.length === 0}
              onClick={() => onPagination('next')}
            >
              NEXT PAGE
            </Button>
          </Grid>

          </Grid>
        </>
      )}
    </Base>
  );
}
