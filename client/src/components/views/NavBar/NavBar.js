import React from 'react'
import {Link} from 'react-router-dom'

function NavBar() {
    return (
        <div>
            <header>
                <Link to="/" className="logo">POLAROID</Link>
                <ul>
                    <li><a href="#" >Home</a></li>
                    <li><Link to="/Board">Board</Link></li>
                    <li><Link to="/Register">Register</Link></li>
                    <li><Link to="/Login" className="active">Login</Link></li>

                </ul>
            </header>
        </div>
    )
}

export default NavBar
