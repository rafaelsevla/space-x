import React, { Suspense } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { LinearProgress } from '@material-ui/core';
import Base from './ui/base';
import { routes } from './routes';


const App = () => {
  return (
    <Suspense fallback={<LinearProgress />}>
      <BrowserRouter>
        <Switch>
          {routes.map(route => (
            <Route
              exact
              path={route.url}
              component={() => (
                <Base title={route.title}>
                  {route.children}
                </Base>
              )}
            />
          ))}
        </Switch>
      </BrowserRouter>
    </Suspense>
  );
};

export default App;