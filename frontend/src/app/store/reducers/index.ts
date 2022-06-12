import { Action, combineReducers } from '@ngrx/store';
import * as Charts from './charts-reducer';

export interface State {
  'charts': Charts.State;
}

export function reducers(state: State | undefined, action: Action) {
  return combineReducers({
    charts: Charts.chartsReducer
  })(state, action);
}
