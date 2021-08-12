import {Link} from 'react-router-dom'
import {withRouter} from 'react-router-dom'
import {Style} from '../../../css/LandingPage.css'
//여기다가 rfce만 치면 자동완성
//es7 react를 설치해야함

function LandingPage(props) {

    return (
        <div className="LandingPage" style={Style}>
            <Link className = "writebtn" to="/Create">Write</Link>

        </div>
    )
}

export default withRouter(LandingPage)
