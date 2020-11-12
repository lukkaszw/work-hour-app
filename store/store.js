import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import initialState from './initialState';

import daysReducer from './reducers/daysReducer';
import monthsReducer from './reducers/monthsReducer';
import settingsReducer from './reducers/settingsReducer';

const rootReducer = combineReducers({
  days: daysReducer,
  months: monthsReducer,
  settings: settingsReducer,
});

const additionalMiddlewares = process.env.ENV === 'production' ? applyMiddleware(thunk) : composeWithDevTools(applyMiddleware(thunk));

const store = createStore(
  rootReducer, 
  initialState,
  additionalMiddlewares,
);

export default store;
