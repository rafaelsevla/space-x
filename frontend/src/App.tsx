import '@brainhubeu/react-carousel/lib/style.css';
import React, { Suspense } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { LinearProgress } from '@material-ui/core';
import { routes } from './routes';


const App = () => {
  return (
    <Suspense fallback={<LinearProgress />}>
      <BrowserRouter>
        <Switch>
          {routes.map(route => (
            <Route
              key={route.id}
              exact
              path={route.url}
              component={route.children}
            />
          ))}
        </Switch>
      </BrowserRouter>
    </Suspense>
  );
};

export default App;