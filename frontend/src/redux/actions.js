import { STORE_JWT, GET_COURSE_INFO, LOGOUT,TAB_CHANGE } from './action-types';

function store_jwt(payload) {
  return { type: STORE_JWT, payload };
}

function get_course_info(payload) {
  return { type: GET_COURSE_INFO, payload };
}

function logout(payload) {
  return { type: LOGOUT, payload };
}
function handleTabChange(payload){
  return {type: TAB_CHANGE,payload};
}
export { store_jwt, get_course_info, logout,handleTabChange };
