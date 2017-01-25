import modalReducer from './modalReducer';

import {
  OPEN_MODAL,
  CLOSE_MODAL,
} from '../actions';

const INITIAL = {
  modal: null,
};

export default function landing(state = INITIAL, action) {
  const {
    modal,
  } = state;

  switch (action.type) {
    case OPEN_MODAL:
    case CLOSE_MODAL:
      return {
        modal: modalReducer(modal, action),
      };
    default:
      return state;
  }
}

