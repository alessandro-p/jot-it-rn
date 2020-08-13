import 'react-native-gesture-handler';

import React from 'react';
import {StatusBar} from 'react-native';

import {AppNavigation} from './navigation/AppNavigation';

declare var global: {HermesInternal: null | {}};

const App = () =>
{
  return (
    <>
      <StatusBar barStyle='dark-content' />
      <AppNavigation />
    </>
  );
};

export default App;
