import React,{useEffect, useState} from 'react'
import {withRouter} from 'react-router-dom'
import {Style} from '../../../css/StartPage.css'
import StarImage from '../../../Images/stars.png'
import MoonImage from '../../../Images/moon.png'
import MountainFrontImage from '../../../Images/mountains_front.png'
import MountainBackImage from '../../../Images/mountains_behind.png'

function Startpage() {


    const [ScrollValue, SetScrollValue] = useState("")

    function ScrollEvent(){
        window.addEventListener('scroll', function(){
            let value = window.scrollY;
            SetScrollValue(value);
        })
    }
    return (
        <div style={Style}>
            <div>
                <title>Parallax Scrolling</title>
                
            </div>
            <div>
                <header style={{
                        top: ScrollValue*0.5+'px'
                    }}>
                    <a href="#" className="logo">POLAROID</a>
                    <ul>
                        <li><a href="#" >Home</a></li>
                        <li><a href="#">About</a></li>
                        <li><a href="#">Register</a></li>
                        <li><a href="#" className="active">Login</a></li>

                    </ul>
                </header>
                <section>
                    <img src={StarImage} id="stars" style={{
                        left: ScrollValue*0.25+'px'
                    }}

                    />
                    <img src={MoonImage} id="moon" style={{
                        top: ScrollValue*1.05+'px'
                    }}/>
                    <img src={MountainBackImage} id="mountains_back" style={{
                        top: ScrollValue*0.5+'px'
                    }}/>
                    <h2 id="text" style={{
                        marginRight: ScrollValue*4+'px',
                        marginTop: ScrollValue*1.5+'px',
                    }}>Moon Light</h2>
                    <a href="#sec" id="btn" style={{
                        marginTop: ScrollValue*1.5+'px',
                    }}>Explore</a>
                    <img src={MountainFrontImage} id="mountains_front" style={{
                        top: ScrollValue*0+'px'
                    }}/>

                </section>
                <div className="sec" id="sec">
                    <h2>Polaroid</h2>
                    <p>Polaroid에 오신것을 환영합니다<br/><br/>
                    testtesttesttesttesttesttesttesttesttesttesttesttesttesttest
                    testtesttesttesttesttesttesttesttesttesttesttesttesttesttest
                    testtesttesttesttesttesttesttesttesttesttesttesttesttesttest
                    <br/><br/>
                    testtesttesttesttesttesttesttesttesttesttesttesttesttesttest
                    testtesttesttesttesttesttesttesttesttesttesttesttesttesttest
                    testtesttesttesttesttesttesttesttesttesttesttesttesttesttest
                    testtesttesttesttesttesttesttesttesttesttesttesttesttesttest
                    testtesttesttesttesttesttesttesttesttesttesttesttesttesttest
                    testtesttesttesttesttesttesttesttesttesttesttesttesttesttest
                    <br/><br/>
                    testtesttesttesttesttesttesttesttesttesttesttesttesttesttest
                    testtesttesttesttesttesttesttesttesttesttesttesttesttesttest
                    testtesttesttesttesttesttesttesttesttesttesttesttesttesttest
                    <br/><br/>
                    testtesttesttesttesttesttesttesttesttesttesttesttesttesttest
                    testtesttesttesttesttesttesttesttesttesttesttesttesttesttest
                    testtesttesttesttesttesttesttesttesttesttesttesttesttesttest
                    <br/><br/>
                    testtesttesttesttesttesttesttesttesttesttesttesttesttesttest
                    testtesttesttesttesttesttesttesttesttesttesttesttesttesttest
                    testtesttesttesttesttesttesttesttesttesttesttesttesttesttest
                    <br/><br/>
                    testtesttesttesttesttesttesttesttesttesttesttesttesttesttest
                    testtesttesttesttesttesttesttesttesttesttesttesttesttesttest
                    testtesttesttesttesttesttesttesttesttesttesttesttesttesttest
                    <br/><br/>
                    </p>
                </div>
                {ScrollEvent()}
            </div>
        </div>
    )
}

export default withRouter(Startpage)
