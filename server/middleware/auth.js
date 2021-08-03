const {User} = require("../models/User")

let auth = (req, res, next)=>{
    //인증 처리를 하는곳
    //클라이언트 쿠키에서 토큰을 가져온다
    let token = req.cookies.x_auth

    //토큰을 복호화한 후 유저를 찾는다
    User.findByToken(token, (err,user)=>{
        if(err) throw err;
        if(!user) return res.json({isAuth: false, error: true})

        req.token = token;
        req.user = user;
        next();//콜백함수가 없으면 next를 써줘야한다
        //schema.methods 나 statics 로 함수를 만들면 콜백함수를
        //매개변수로 사용할 수 있다
    })
    //유저가 있으면 인증이 된다

    //유저가 없으면 인증이 안된다

}

module.exports = {auth};