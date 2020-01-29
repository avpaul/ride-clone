import {ACTION} from '../../action-types/sample/example';

export const action = () => dispatch =>
  dispatch({
    type: ACTION,
    payload: true,
  });
