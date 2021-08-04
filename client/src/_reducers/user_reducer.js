import {
    LOGIN_USER
} from '../_actions/types';

export default function (state = {},action){
    switch(action.type){
        case LOGIN_USER:
                return {...state, login_Success: action.payload}//그래도 가져오는것 (...) 빈상태를 가져오는것

        default:
            return state;
    }
}