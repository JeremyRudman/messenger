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

        this.handleSubmit = this.handleSubmit.bind(this);
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

    handleSubmit(){
        this.props.logout();
    }

    render() {
        return (
            <div id="Header">
                <div className='username'>
                    {this.state.username}
                </div>
                {this.state.loggedIn ? (
                    <Link to={'/userhome'} style={{ textDecoration: 'none' }}>
                        <li>Home</li>
                    </Link>

                ) : (
                    <Link to={'/'} style={{ textDecoration: 'none' }}>
                        <li>Home</li>
                    </Link>)}

                {this.state.loggedIn ? (
                    <button onClick={this.handleSubmit}>Sign Out</button>

                ) : (
                    <div>
                        <Link to={'/signin'} style={{ textDecoration: 'none' }}>
                            <li>Sign In</li>
                        </Link>
                        <Link to={'/register'} style={{ textDecoration: 'none' }}>
                            <li>Register</li>
                        </Link>
                    </div>


                )}


            </div>

        )

    }
}