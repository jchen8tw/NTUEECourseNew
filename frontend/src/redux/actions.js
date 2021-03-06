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

export function store_jwt(payload) {
  return { type: STORE_JWT, payload };
}

export function get_course_info(payload) {
  return { type: GET_COURSE_INFO, payload };
}

export function get_wishes(payload) {
  return { type: GET_WISHES, payload };
}

export function update_wishes(payload) {
  return { type: UPDATE_WISHES, payload };
}

export function update_wishes_with_teammate(payload) {
  return { type: UPDATE_WISHES_WITH_TEAMMATE, payload };
}

export function logout(payload) {
  return { type: LOGOUT, payload };
}

export function handleTabChange(payload) {
  return { type: TAB_CHANGE, payload };
}

export function send_success(payload) {
  return { type: SEND_SUCCESS, payload };
}

export function send_error(payload) {
  return { type: SEND_ERROR, payload };
}
