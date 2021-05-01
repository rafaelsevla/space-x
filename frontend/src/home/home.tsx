import React, { useEffect, useState } from 'react';
import axios from 'axios'
import { LinearProgress } from '@material-ui/core';

import { AsyncData } from 'common/async-data';
import Base from '../common/ui/base';

interface Launch {
  title: string;
}

export default function Home () {
  const [ nextLaunch, setNextLaunch ] = useState<AsyncData<Launch>>({ status: 'loading' });

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get<{ data: Launch }>('localhost:5000/launches/next');
        console.log(response.data)

        // setNextLaunch({ status: 'loaded', data: response.data });
        setNextLaunch({ status: 'error' });
      } catch (err) {
        setNextLaunch({ status: 'error' });
      }
    })();
  }, []);

  return (
    <Base title="HOME" data={nextLaunch}>
      <h1>
        saas
      </h1>
    </Base>
  );
}
