import React, { useEffect, useState } from 'react';
import axios from 'axios'
import { Grid, makeStyles, Typography } from '@material-ui/core';
import Carousel, { Dots } from '@brainhubeu/react-carousel';

import Base from 'common/ui/base';
import { AsyncData, Launch, getFormatedDate, getFormatedTime } from 'common';


const useStyles = makeStyles(() => ({
  media: {
    width: 500,
    marginRight: 200
  },
  imagePreview: {
    width: 100
  }
}));


export default function Home () {
  const classes = useStyles();
  const [ nextLaunch, setNextLaunch ] = useState<AsyncData<Launch>>({ status: 'loading' });
  const [ carouselDotsValue, setCarouselDotsValue] = useState(0);

  function onChange (value: number) {
    setCarouselDotsValue(value);
  }

  useEffect(() => {
    (async () => {
      try {
        const response: { data: Launch } = await axios.get(`${process.env.REACT_APP_API_URL}/v1/launches/next`);
        setNextLaunch({ status: 'loaded', data: response.data });
      } catch (err) {
        setNextLaunch({ status: 'error' });
      }
    })();
  }, []);

  return (
    <Base title="HOME" data={nextLaunch}>
      {nextLaunch.status === 'loaded' && (
        <>
          <Typography variant='h3'>
            The next launch will take place in {getFormatedDate(nextLaunch.data.date_utc)} at {getFormatedTime(nextLaunch.data.date_utc)}!
          </Typography>
          <br/>
          <Typography variant='h5'>
            {nextLaunch.data.details}
          </Typography>
          <br/>
          <Typography variant='h6'>
            The rocket {nextLaunch.data.rocket.name} was made in {nextLaunch.data.rocket.country}
          </Typography>

          <Typography variant='body1'>
            {nextLaunch.data.rocket.description}
          </Typography>
          <br/>
          
          <Typography variant='body1'>
            Some images:
          </Typography>

          <br/>
          
          <Grid container item xs={12} spacing={3}>
            <Carousel
              value={carouselDotsValue}
              onChange={onChange}
            >
            {nextLaunch.data.rocket.flickr_images.map(imageUrl => (
              <Grid item xs={4}>
                <img src={imageUrl} className={classes.media} alt="Rocket from space-x" />
              </Grid>
            ))}
            </Carousel>
            <Grid container justify='center' item xs={12} spacing={3}>
              <Dots
                value={carouselDotsValue}
                onChange={onChange}
                thumbnails={nextLaunch.data.rocket.flickr_images.map(imageUrl => (
                  <img src={imageUrl} className={classes.imagePreview} alt="Rocket from space-x on thumbnail" />
                ))}
              />
            </Grid>
          </Grid>
        </>
      )}
    </Base>
  );
}
