import {
  STORE_JWT,
  GET_COURSE_INFO,
  GET_WISHES,
  UPDATE_WISHES,
  UPDATE_WISHES_WITH_TEAMMATE,
  LOGOUT,
  TAB_CHANGE,
  SEND_SUCCESS,
  SEND_ERROR
} from './action-types';
import { getStudentID, getGrade } from '../util';

const initialState = {
  jwt: null,
  courses: null,
  wishes: null,
  unselected: null,
  tabIndex: 0,
  successMessage: null,
  errorMessage: null
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case STORE_JWT:
      localStorage.setItem('jwt', action.payload);
      return { ...state, jwt: action.payload };
    case GET_WISHES: {
      // assume GET_COURSE_INFO is called before
      // unselected = courses of user grade - wishes
      let grade = getGrade(getStudentID(state.jwt));
      let unselected = state.courses.filter(group => {
        let ind = action.payload.findIndex(i => i.name === group.name);
        // If `group` in `wishes`, then ind !== -1
        if (ind !== -1) action.payload[ind].grade = group.grade;
        return grade === group.grade;
      });
      return { ...state, wishes: action.payload, unselected };
    }
    case UPDATE_WISHES: {
      let ind = state.wishes.findIndex(
        wish => wish.name === action.payload.name
      );
      let newWishes = state.wishes;
      if (ind !== -1) {
        if (!action.payload.priority || action.payload.priority.length === 0)
          newWishes.splice(ind, 1);
        // Remove from wishes
        else newWishes[ind].priority = action.payload.priority; // Replace priority
      } else if (action.payload.priority.length !== 0) {
        action.payload.grade = state.courses.find(
          course => course.name === action.payload.name
        ).grade; // Get and save the grade of newly appended wish
        newWishes.push(action.payload); // not in wishes, append to wishes
      }
      return { ...state, wishes: newWishes };
    }
    case UPDATE_WISHES_WITH_TEAMMATE: {
      let ind = state.wishes.findIndex(
        wish => wish.name === action.payload.name
      );
      let newWishes = state.wishes;
      if (ind !== -1) {
        if (!action.payload.student_ids || action.payload.student_ids === 0)
          newWishes.splice(ind, 1);
        else newWishes[ind].student_ids = action.payload.student_ids;
      } else if (action.payload.student_ids.length !== 0) {
        action.payload.grade = state.courses.find(
          course => course.name === action.payload.name
        ).grade;
        newWishes.push(action.payload);
      }
      return { ...state, wishes: newWishes };
    }
    case GET_COURSE_INFO:
      return { ...state, courses: action.payload };
    case LOGOUT:
      localStorage.removeItem('jwt');
      return { ...initialState };
    case TAB_CHANGE:
      return { ...state, tabIndex: action.payload };
    case SEND_SUCCESS:
      return { ...state, successMessage: action.payload };
    case SEND_ERROR:
      return { ...state, errorMessage: action.payload };
    default:
      if (!localStorage.getItem('jwt')) {
        return { ...initialState };
      } else {
        return { ...state, jwt: localStorage.getItem('jwt') };
      }
  }
}

export default rootReducer;
