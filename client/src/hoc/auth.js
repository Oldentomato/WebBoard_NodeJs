import React,{useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {auth} from '../_actions/user_action'

export default function ( ComposedClass, reload, adminRoute = null) {
    //option -> null: 아무나 출입이 가능한 페이지
    //true: 로그인한 유저만 출입이 가능한 페이지
    //false: 로그인한 유저는 출입 불가능한 페이지
    
    
    // function AuthenticationCheck(props){
    //     const dispatch = useDispatch();
    //     useEffect(()=>{
    //         dispatch(auth())
    //         .then(response=>{
    //             //로그인 하지 않은 상태
    //             if(!response.payload.isAuth){
    //                 if(option){//로그인이 안됐는데 로그인 된 페이지로 가려면 login으로 가버림
    //                     alert("로그인을 하십시오")
    //                     props.history.push('/login')
    //                 }
    //             }else{//로그인 한 상태
    //                 if(adminRoute && !response.payload.isAdmin){
    //                     alert("관리자용 페이지입니다")
    //                     props.history.push('/')
    //                 }else{//로그인이 되었는데 로그인페이지로 가려는경우
    //                     if(option === false){
    //                         props.history.push('/')
    //                     }
                        
    //                 }
    //             }
    //         })
    //     })
    //     return (
    //         <div>
    //             <SpecificComponent/>
    //         </div>
    //         )
    // }

    function AuthenticationCheck(props) {

        let user = useSelector(state => state.user);
        const dispatch = useDispatch();

        useEffect(() => {

            dispatch(auth()).then(async response => {
                if (await !response.payload.isAuth) {//로그인 하지 않은 상태
                    if (reload) {
                        props.history.push('/login')
                    }
                } else {
                    if (adminRoute && !response.payload.isAdmin) {
                        props.history.push('/')
                    }
                    else {
                        if (reload === false) {
                            props.history.push('/')
                        }
                    }
                }
            })
            
        }, [dispatch, props.history, user.googleAuth])

        return (
            <ComposedClass {...props} user={user} />
        )

    }

    return AuthenticationCheck
}