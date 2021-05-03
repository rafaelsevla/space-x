import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Avatar, Button, Card, CardContent, CardHeader, CardMedia, Grid, makeStyles, Typography } from '@material-ui/core';
import { red } from '@material-ui/core/colors';

import Base from 'common/ui/base';
import { AsyncData, Launch, getFormatedDateWithYear } from 'common';

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


export default function PastLaunches () {
  const classes = useStyles();
  const [ pastLaunches, setPastLaunches ] = useState<AsyncData<Launch[]>>({ status: 'loading' });
  const [ paginationOffset, setPaginationOffset ] = useState<number>(0);

  async function fetchPastLaunches (offset: number) {
    try {
      setPastLaunches({ status: 'loading' });
      const response: { data: { launches: Launch[] } } = await axios.get(
        `${process.env.REACT_APP_API_URL}/v1/launches/past?offset=${offset}&limit=12`
      );
      setPastLaunches({ status: 'loaded', data: response.data.launches });
    } catch (err) {
      setPastLaunches({ status: 'error' });
    }
  }

  useEffect(() => {
    fetchPastLaunches(paginationOffset);
  }, [ paginationOffset ]);

  function onPagination (action: 'next' | 'previous') {
    let newPaginationOffset;
    if (action === 'next') {
      newPaginationOffset = paginationOffset + 10;
    } else { // previous pagination
      newPaginationOffset = paginationOffset - 10;
    }
    setPaginationOffset(newPaginationOffset)
  }

  return (
    <Base title='PAST LAUNCHES' data={pastLaunches}>
      {pastLaunches.status === 'loaded' && (
        <>
          <Grid container item xs={12} spacing={3}>
            {pastLaunches.data.length === 0 && (
              <Typography variant='h4'>
                There is no more release available
              </Typography>
            )}
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
                onClick={() => onPagination('next')}
                disabled={pastLaunches.data.length === 0}
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
