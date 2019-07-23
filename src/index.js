import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';
import {Header} from './Header';
import './index.css';
import {Message} from './message'

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            loggedIn: false,
        }
    }

    logout() {
        this.setState({
            loggedIn: false,
            username: ""
        });
    }

    setName(name) {
        if (this.state.loggedIn === false && name !== "") {
            this.setState(
                {
                    username: name,
                    loggedIn: true
                });
        }
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
                    <Header username={this.state.username} loggedIn={this.state.loggedIn} logout={this.logout.bind(this)}/>
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
                        <Route path='/user/:handle' render={(props) => <Message {...props} loggedin={this.state.loggedIn}
                                                                            user={this.state.username}/>}/>
                    </Switch>
                </Router>
            </div>
        )
    }
}

class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({name: event.target.value.toLowerCase()});
    }


    handleSubmit(event) {
        event.preventDefault();
        console.log(this.state.name);
        //TODO CHECK IF USER EXIST THEN IF NOT ADD
        fetch('http://localhost:4000/users/get?username=' + this.state.name)
            .then(response => response.json())
            .then(data => {
                if(data.data.length===0) {
                    fetch('http://localhost:4000/users/add?username=' + this.state.name).catch(err => console.error(err));
                    this.props.history.push('/');
                }else {
                    alert('Username already registered.');
                }
            })
            .catch(err => console.error(err));


    }

    render() {
        return (
            <div>
                <h1>Register</h1>
                <form onSubmit={this.handleSubmit}>
                    <input type="text" value={this.state.name}
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
        this.setState({username: event.target.value.toLowerCase()});
    }

    async userExists(name) {
        await fetch('http://localhost:4000/users/get?username=' + name)
            .then(response => response.json())
            .then(data => {
                if (data.data.length === 1) {
                    console.log(data.data[0]);
                    this.props.setName(data.data[0]);
                    this.setState({loggedIn: true});
                    this.props.history.push('/userhome');
                } else {
                    alert('user not found');
                }
            })
            .catch(err => console.error(err));
    }

    handleSubmit(event) {
        event.preventDefault();
        this.userExists(this.state.username);
    }


    render() {
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
            users: []
        }
    }

    componentDidMount() {
        if (this.props.username !== null) {

            fetch('http://localhost:4000/users')
                .then(response => response.json())
                .then(data => {
                    var temparray = [];
                    console.log(this.props.username);
                    for (let i = 0; i < data.data.length; i++) {
                        if (data.data[i].userID !== this.props.username.userID) {
                            temparray.push(data.data[i])
                        }
                    }
                    this.setState({users: temparray});
                })
                .catch(err => console.error(err));
        }
    }

    render() {
        console.log(this.props.username);
        if(this.props.username===""){
            this.props.history.push('/');
        }
        const ListUsers = ({users}) => (
            <div>
                {users.map(user => (

                    <div className="user" key={user.username}>
                        <Link to={{
                            pathname: `/user/${user.username}`,
                            state: {
                                toUser: user
                            }
                        }}>{user.username}</Link>
                    </div>
                    ))}
            </div>
        );

        return (
            <div>
                <ListUsers users={this.state.users}/>
            </div>
        )
    }
}

ReactDOM.render(<App/>, document.getElementById('root'));

