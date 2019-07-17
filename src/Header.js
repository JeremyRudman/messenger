import React from 'react';
import {Link} from 'react-router-dom';
import './Header.css'


export class Header extends React.Component{
    constructor(props) {
        super(props);
        this.state = { username: "",
        loggedin:false};

    }



    render() {
        return(
            <div id="Header">
                <Link to={'/'}>
                    <li>Home</li>
                </Link>
                {this.state.loggedIn ? (
                    //TODO
                    <div>implment logout</div>

                ) : (
                    <Link to={'/signin'}>
                        <li>Sign In</li>
                    </Link>
                )}
                <Link to={'/register'}>
                    <li>Register</li>
                </Link>
                <div className="user">
                {this.state.username}
                </div>
            </div>

        )

    }
}