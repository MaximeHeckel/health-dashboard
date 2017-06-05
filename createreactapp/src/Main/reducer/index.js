import {
  SAMPLE_ACTION,
} from '../actions';

const INITIAL = {};

export default function landing(state = INITIAL, action) {
  switch (action.type) {
    case SAMPLE_ACTION:
      console.log('Sample action');
      return state;
    default:
      return state;
  }
}

