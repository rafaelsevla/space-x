import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Grid, Typography } from '@material-ui/core';
import Carousel, { Dots } from '@brainhubeu/react-carousel';

import { AsyncData, Launch, getFormatedDate, getFormatedTime } from '../common';
import Base from '../common/ui/base';

export default function LatestLaunches () {
  const [ latestLaunch, setLatestLaunch ] = useState<AsyncData<Launch>>({ status: 'loading' });
  const [ carouselDotsValue, setCarouselDotsValue] = useState(0);

  function onChange (value: number) {
    setCarouselDotsValue(value);
  }

  useEffect(() => {
    (async () => {
      try {
        const response: { data: Launch } = await axios.get(`${process.env.REACT_APP_API_URL}/v1/launches/latest`);
        setLatestLaunch({ status: 'loaded', data: response.data });
      } catch (err) {
        setLatestLaunch({ status: 'error' });
      }
    })();
  }, []);
  
  return (
    <Base title='LATEST LAUNCH' data={latestLaunch}>
      {latestLaunch.status === 'loaded' && (
        <>
          <Typography variant='h3'>
            The last launch took place in {getFormatedDate(latestLaunch.data.date_utc)} at {getFormatedTime(latestLaunch.data.date_utc)}!
          </Typography>
          <br/>
          <Typography variant='h5'>
            {latestLaunch.data.details}
          </Typography>
          <br/>
          <Typography variant='h6'>
            The rocket {latestLaunch.data.rocket.name} was made in {latestLaunch.data.rocket.country}
          </Typography>

          <Typography variant='body1'>
            {latestLaunch.data.rocket.description}
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
            {latestLaunch.data.rocket.flickr_images.map(imageUrl => (
              <Grid item xs={4}>
                <img src={imageUrl} style={{ width: 500, marginRight: 200 }} alt="Rocket from space-x" />
              </Grid>
            ))}
            </Carousel>
            <Grid container justify='center' item xs={12} spacing={3}>
              <Dots
                value={carouselDotsValue}
                onChange={onChange}
                thumbnails={latestLaunch.data.rocket.flickr_images.map(imageUrl => (
                  <img src={imageUrl} style={{ width: 100 }} alt="Rocket from space-x on thumbnail" />
                ))}
              />
            </Grid>
          </Grid>
        </>
      )}
    </Base>
  );
}
