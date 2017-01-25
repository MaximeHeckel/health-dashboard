import { combineReducers } from 'redux';
import main from '../../Main/reducer';
import { client } from '../graphql';

const rootReducer = combineReducers({
  main,
  apollo: client.reducer(),
});

export default rootReducer;
