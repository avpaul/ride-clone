import {ACTION} from '../../action-types/sample/example';

const reducer = (state = {loading: false, error: null}, {type, payload}) => {
  switch (type) {
    case ACTION:
      return {
        ...state,
        loading: true,
        data: payload,
      };
    default:
      return state;
  }
};

export default reducer;
