import 'react-native-gesture-handler';

import React, {useEffect, useState} from 'react';
import {StatusBar} from 'react-native';
import {Provider} from 'react-redux';

import {store} from './flux/store';
import {AppNavigation} from './navigation/AppNavigation';
import {setup_18n} from './utils/locales';

declare var global: {HermesInternal: null | {}};

const App = () =>
{
  const [ready, set_ready] = useState(false);

  useEffect(() =>
  {
    (async () =>
    {
      if(!ready)
        setup_18n();

      set_ready(true);
    })();
  }, [ready]);

  if(!ready)
    return <></>;

  return (
    <>
      <Provider store={store}>
        <StatusBar barStyle='dark-content' />
        <AppNavigation />
      </Provider>
    </>
  );
};

export default App;
