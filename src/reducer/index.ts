import { combineReducers } from 'redux';
import counterReducer, { CountState } from './counter';

export interface RootState {
  count : CountState,
}

export default combineReducers<RootState>({
  count: counterReducer,
});
