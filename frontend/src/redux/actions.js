import { STORE_JWT, GET_COURSE_INFO, LOGOUT } from './action-types';

function store_jwt(payload) {
  return { type: STORE_JWT, payload };
}

function get_course_info(payload) {
  return { type: GET_COURSE_INFO, payload };
}

function logout(payload) {
  return { type: LOGOUT, payload };
}

export { store_jwt, get_course_info, logout };
