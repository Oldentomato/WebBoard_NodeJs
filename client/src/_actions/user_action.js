import axios from 'axios'
import {
    LOGIN_USER,
    REGISTER_USER,
    AUTH_USER,
    CREATE_BOARD
} from './types';

export function loginUser(dataTosubmit){
    const request = axios.post('api/users/login',dataTosubmit)
    .then(response => response.data )

    return {
       type: LOGIN_USER,
       payload: request
    }
}

export function registerUser(dataTosubmit){
    const request = axios.post('api/users/register',dataTosubmit)
    .then(response => response.data )

    return {
       type: REGISTER_USER,
       payload: request
    }
}

export function auth(){
    const request = axios.get('api/users/auth')
    .then(response => response.data )

    return {
       type: AUTH_USER,
       payload: request
    }
}

export function create(dataTosubmit){
    const request = axios.post('api/board/create',dataTosubmit)
    .then(response => response.data)

    return {
        type: CREATE_BOARD,
        payload: request
    }
}