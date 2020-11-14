import React from 'react';
import { Provider } from 'react-redux';
import AppNavigation from './navigation';
import store from './store/store';
import { init } from './db/db';
import './calendarConfig';


init()
  .then(() => {
    console.log('Database created');
  })
  .catch(err => {
    console.log(err);
  });

export default function App() {
  return (
    <Provider
      store={store}
    >
      <AppNavigation />
    </Provider>
  );
}