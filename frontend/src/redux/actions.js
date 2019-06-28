import {
  STORE_JWT,
  GET_COURSE_INFO,
  STORE_STUDENT_ID,
  LOGOUT,
  TAB_CHANGE
} from './action-types';

export function store_jwt(payload) {
  return { type: STORE_JWT, payload };
}

export function store_student_id(payload) {
  return { type: STORE_STUDENT_ID, payload };
}

export function get_course_info(payload) {
  return { type: GET_COURSE_INFO, payload };
}

export function logout(payload) {
  return { type: LOGOUT, payload };
}

export function handleTabChange(payload) {
  return { type: TAB_CHANGE, payload };
}
