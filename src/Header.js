import React from 'react';
import {Link} from 'react-router-dom';
import './Header.css'


export class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            loggedIn: false
        };

    }

    componentDidUpdate(prevProps) {
        if ((prevProps.username !== this.props.username) && (prevProps.loggedIn !== this.props.loggedIn)) {
            this.setState({
                username: this.props.username
            });
            this.setState({
                loggedIn: this.props.loggedIn
            });
        }
    }

    render() {
        console.log(this.state.loggedIn);
        console.log(this.state.username);
        return (
            <div id="Header">
                <li>
                    {this.state.username}
                </li>
                <Link to={'/'}>
                    <li>Home</li>
                </Link>
                {this.state.loggedIn ? (
                    <li>Sign out</li>
                ) : (
                    <div>
                        <Link to={'/signin'}>
                            <li>Sign In</li>
                        </Link>
                        <Link to={'/register'}>
                            <li>Register</li>
                        </Link>
                    </div>


                )}


            </div>

        )

    }
}