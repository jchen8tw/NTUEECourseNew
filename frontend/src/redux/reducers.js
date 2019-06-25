import {STORE_JWT} from './action-types'
const initialState = {
    jwt: null
}
function rootReducer(state = initialState,action){
    if(action.type === STORE_JWT){
        localStorage.setItem("jwt",action.payload);
        return (Object.assign({},state,{jwt: action.payload}));
    }
    else{
        if(!localStorage.getItem("jwt")){
            return Object.assign({},initialState);
        }
        else{
            return Object.assign({},state,{jwt: localStorage.getItem("jwt")});
        }
    }
}
export default rootReducer;