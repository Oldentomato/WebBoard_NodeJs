import {
    LOGIN_USER,
    REGISTER_USER
} from '../_actions/types';

export default function (state = {},action){
    switch(action.type){
        case LOGIN_USER:
            return {...state, login_Success: action.payload}//그대로 가져오는것 (...) 빈상태를 가져오는것

        case REGISTER_USER:
            return {...state, register: action.payload}
        default:
            return state;
    }
}