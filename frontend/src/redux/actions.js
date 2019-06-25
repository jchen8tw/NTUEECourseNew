import { STORE_JWT,GET_COURSE_INFO } from './action-types';
function Store_jwt(payload) {
  return { type: STORE_JWT, payload };
}
function Get_course_info(payload){
  return {type: GET_COURSE_INFO, payload};
}

export  { Store_jwt,Get_course_info };
