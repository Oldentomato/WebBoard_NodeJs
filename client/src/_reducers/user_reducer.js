import {
    LOGIN_USER,
    REGISTER_USER,
    AUTH_USER,
    CREATE_BOARD
} from '../_actions/types';

export default function (state = {},action){
    switch(action.type){
        case LOGIN_USER:
            return {...state, login_Success: action.payload}//그대로 가져오는것 (...) 빈상태를 가져오는것

        case REGISTER_USER:
            return {...state, register: action.payload}

        case AUTH_USER:
            return {...state, userData: action.payload}

        case CREATE_BOARD:
            return {...state, boardData: action.payload}

        default:
            return state;
    }
}