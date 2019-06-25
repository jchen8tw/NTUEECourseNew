import { STORE_JWT, GET_COURSE_INFO } from './action-types';
const initialState = {
  jwt: null,
  courses: null
};
function rootReducer(state = initialState, action) {
  if (action.type === STORE_JWT) {
    localStorage.setItem('jwt', action.payload);
    return Object.assign({}, state, { jwt: action.payload });
  } else if (action.type === GET_COURSE_INFO) {
    return Object.assign({}, state, { courses: action.payload });
  } else {
    if (!localStorage.getItem('jwt')) {
      return Object.assign({}, initialState);
    } else {
      return Object.assign({}, state, { jwt: localStorage.getItem('jwt') });
    }
  }
}
export default rootReducer;
