import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Switch, Route, Redirect, Link} from 'react-router-dom';
import {Header} from './Header';
import './index.css';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            loggedIn: false,
        }
    }

    setName(name) {
        if (this.state.loggedIn === false && name !== "") {
            this.setState({username: name});
            this.setState({loggedIn: true});
        }
    }

    componentDidMount() {
        fetch('http://localhost:4000/users')
            .then(response => response.json())
            .then(data => console.log(data))
            .catch(err=>console.error(err));
    }



    render() {
        const Home = () => (
            <div>
                <h1>Home Page {this.state.username}</h1>
            </div>
        );
        return (
            <div>
                <Router>
                    <Header username={this.state.username} loggedIn={this.state.loggedIn}
                            username={this.state.username}/>
                    <Switch>
                        <Route path="/" exact component={Home}/>
                        <Route path="/signin" render={(props) => <SignIn {...props} loggedin={this.state.loggedIn}
                                                                         username={this.state.username}
                                                                         setName={this.setName.bind(this)}/>}/>
                        <Route path="/userhome" render={(props) => <SignedIn {...props} loggedin={this.state.loggedIn}
                                                                             username={this.state.username}
                                                                             setName={this.setName.bind(this)}/>}/>
                        <Route path="/register" render={(props) => <Register {...props} loggedin={this.state.loggedIn}
                                                                             username={this.state.username}
                                                                             setName={this.setName.bind(this)}/>}/>
                    </Switch>
                </Router>
            </div>
        )
    }
}

class Register extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            username: "",
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({username: event.target.value});
    }


    handleSubmit(event) {
        event.preventDefault();
        console.log(this.state.username);
        fetch('http://localhost:4000/users/add?username='+this.state.username).catch(err=>console.error(err));

    }

    render() {
        return(
            <div>
                <h1>Register</h1>
                <form onSubmit={this.handleSubmit}>
                    <input type="text" value={this.state.username}
                           onChange={this.handleChange}/>
                    <input type="submit" value="Submit"/>
                </form>
            </div>
        )
    }
}

class SignIn extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loggedIn: false,
            username: "",
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({username: event.target.value});
    }


    handleSubmit(event) {
        event.preventDefault();
        console.log(this.state.username);
        this.props.setName(this.state.username);
        this.setState({loggedIn: true});
    }


    render() {
        if(this.state.loggedIn){
            return (
                <Redirect to="/userhome"/>
            )
        }
        return (
            <div>
                <h1>Sign-In</h1>
                <form onSubmit={this.handleSubmit}>
                    <input type="text" value={this.state.username}
                           onChange={this.handleChange}/>
                    <input type="submit" value="Submit"/>
                </form>
            </div>
        )

    }
}

class SignedIn extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
        }
    }

    render() {
        // if (this.state.username === "") {
        //     return (
        //         <Redirect to="/"/>
        //     )
        // }
        return (
            <div>
                {this.props.username}
            </div>
        )
    }
}

ReactDOM.render(<App/>, document.getElementById('root'));

