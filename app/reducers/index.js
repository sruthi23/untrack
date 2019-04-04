// @flow
import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import untrack from './untrack';

export default function createRootReducer(history: History) {
  return combineReducers({
    router: connectRouter(history),
    untrack: untrack
  });
}
