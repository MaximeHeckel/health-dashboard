import { createAction } from 'redux-actions';
import {
  OPEN_MODAL,
  CLOSE_MODAL,
} from '..';

export const openModal = createAction(OPEN_MODAL);
export const closeModal = createAction(CLOSE_MODAL);
