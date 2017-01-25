import {
  OPEN_MODAL,
  CLOSE_MODAL,
} from '../actions';

export default function modalReducer(state, action) {
  let resp;
  const { type, payload } = action;
  switch (type) {
    case OPEN_MODAL:
      resp = [payload.type, payload.data];
      break;
    case CLOSE_MODAL:
      resp = null;
      break;
    default:
      resp = state;
  }
  return resp;
}
