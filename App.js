import React from 'react';

import AppNavigation from './navigation';

import { init } from './db/db';

init()
  .then(() => {
    console.log('Database created');
  })
  .catch(err => {
    console.log(err);
  });

export default function App() {
  return (
    <AppNavigation />
  );
}