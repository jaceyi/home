import * as types from './type';

const _state = {
  userInfo: null
};

export default function (state = _state, {type, payload}) {
  switch (type) {
    case types.SET_USER_INFO:
      return {
        ...state,
        userInfo: payload
      };
    default:
      return state
  }
}
