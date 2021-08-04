const proxy = require('http-proxy-middleware');
//CORS 정책에 의해 포트가 서버와 클라이언트가 다르기에(5000,3000)
//proxy를 이용해, 서로 달라도 통신이 되게 해주는 코드이다
module.exports = function(app){
    app.use(
        '/api',
        proxy({
            target: 'http://localhost:5000',
            changeOrigin: true,
        })
    )
}