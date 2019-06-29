import {
  STORE_JWT,
  GET_COURSE_INFO,
  GET_WISHES,
  LOGOUT,
  TAB_CHANGE,
  SEND_SUCCESS
} from './action-types';
import { getStudentID, getGrade } from '../util';

const initialState = {
  jwt: null,
  courses: null,
  wishes: null,
  unselected: null,
  tabIndex: 0,
  successMessage: null
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case STORE_JWT:
      localStorage.setItem('jwt', action.payload);
      return { ...state, jwt: action.payload };
    case GET_WISHES:
      // assume GET_COURSE_INFO is called before
      // unselected = courses of user grade - wishes
      let grade = getGrade(getStudentID(state.jwt));
      let unselected = state.courses.filter(
        group =>
          group.grade === grade &&
          !action.payload.find(i => i.course_name === group.name) // not in wishes
      );
      return { ...state, wishes: action.payload, unselected };
    case GET_COURSE_INFO:
      return { ...state, courses: action.payload };
    case LOGOUT:
      localStorage.removeItem('jwt');
      return { ...initialState };
    case TAB_CHANGE:
      return { ...state, tabIndex: action.payload };
    case SEND_SUCCESS:
      return { ...state, successMessage: action.payload };
    default:
      if (!localStorage.getItem('jwt')) {
        return { ...initialState };
      } else {
        return { ...state, jwt: localStorage.getItem('jwt') };
      }
  }
}

export default rootReducer;
