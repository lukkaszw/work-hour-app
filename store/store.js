import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import initialState from './initialState';

import daysReducer from './reducers/daysReducer';
import historyReducer from './reducers/historyReducer';
import settingsReducer from './reducers/settingsReducer';
import holidaysReducer from './reducers/holidaysReducer';

const rootReducer = combineReducers({
  days: daysReducer,
  history: historyReducer,
  settings: settingsReducer,
  holidays: holidaysReducer,
});

const additionalMiddlewares = process.env.ENV === 'production' ? applyMiddleware(thunk) : composeWithDevTools(applyMiddleware(thunk));

const store = createStore(
  rootReducer, 
  initialState,
  additionalMiddlewares,
);

export default store;
