import React from 'react';
import { Route } from 'react-router';
import * as AppPaths from './constants/AppPaths.js';
import AppContainer from './containers/AppContainer';


export const createRoutes = () => (
  <Route path={AppPaths.BASE} component={AppContainer} />
);
