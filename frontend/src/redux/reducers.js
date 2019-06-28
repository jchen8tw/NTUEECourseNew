import { STORE_JWT, GET_COURSE_INFO, LOGOUT,TAB_CHANGE } from './action-types';

const initialState = {
  jwt: null,
  courses: null,
  tabIndex: 0
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case STORE_JWT:
      localStorage.setItem('jwt', action.payload);
      return { ...state, jwt: action.payload };
    case GET_COURSE_INFO:
      return { ...state, courses: action.payload.allCourseGroups };
    case LOGOUT:
      localStorage.removeItem('jwt');
      return { ...initialState };
    case TAB_CHANGE:
      return {...state, tabIndex: action.payload};
    default:
      if (!localStorage.getItem('jwt')) {
        return { ...initialState };
      } else {
        return { ...state, jwt: localStorage.getItem('jwt') };
      }
  }
}

export default rootReducer;
