import React from 'react';
import './message.css'

export class Message extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: null,
            toUser: null,
            messages: [],
            localMessages: [],
            message: "",
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    sendmessage(message) {
        if(message!=="") {
            fetch(`http://localhost:4000/users/send?userID=${this.state.user.userID}
        &toUserID=${this.state.toUser.userID}&message=${message}`)
                .catch(err => console.log(err));
        }
        fetch('http://localhost:4000/users/received?userID='
            + this.state.user.userID + '&toUserID=' + this.state.toUser.userID)
            .then(response => response.json())
            .then(data => {
                var tempsend = [];
                console.log(data);
                for (let i = 0; i < data.data.length; i++) {
                    tempsend.push(data.data[i])
                }
                this.setState({
                    messages: tempsend
                })
            })
            .catch(err => console.log(err));
        console.log(message);
    }

    handleSubmit(event) {
        event.preventDefault();
        this.sendmessage(this.state.message);
    }

    handleChange(event) {
        this.setState({message: event.target.value});
    }

    componentDidMount() {
        if(this.props.user==='' || this.props.location.state.toUser===undefined){
            this.props.history.push('/userhome');
        }
        var user = this.props.user;
        var toUser = this.props.location.state.toUser;


        console.log(user);
        console.log(toUser);
        fetch('http://localhost:4000/users/received?userID=' + user.userID + '&toUserID=' + toUser.userID)
            .then(response => response.json())
            .then(data => {
                var tempsend = [];
                console.log(data);
                for (let i = 0; i < data.data.length; i++) {
                    tempsend.push(data.data[i])
                }
                console.log(tempsend);
                this.setState({
                    user: user,
                    toUser: toUser,
                    messages: tempsend
                })
            })
            .catch(err => console.log(err));
        setInterval(()=>{
            fetch('http://localhost:4000/users/received?userID=' + user.userID + '&toUserID=' + toUser.userID)
                .then(response => response.json())
                .then(data => {
                    var tempsend = [];
                    console.log(data);
                    for (let i = 0; i < data.data.length; i++) {
                        tempsend.push(data.data[i])
                    }
                    this.setState({
                        messages: tempsend
                    })
                })
                .catch(err => console.log(err))
        },2000)
    }

    render() {

        const LocalMessages = ({messages}) => (
            <div>
                {messages.map(message => (
                    <div key={message.messageID}>
                        {(message.toUserID === this.state.user.userID) ?
                            <div className="received"> {message.message}</div> :
                            <div className="sent"> {message.message}</div>}
                    </div>))}
            </div>
        );
        const Messages = ({messages}) => (
            <div>
                {messages.map(message => (
                    <div key={message.messageID}>
                        {(message.toUserID === this.state.user.userID) ?
                            <div className="received"> {message.message}</div> :
                            <div className="sent"> {message.message}</div>}
                    </div>))}
            </div>
        );
        return (
            <div>
                <Messages messages={this.state.messages}/>
                {/*<LocalMessages messages={this.state.localMessages}/>*/}
                <div className="userInput">
                    <form onSubmit={this.handleSubmit}>
                        <input type="text" value={this.state.username}
                               onChange={this.handleChange}/>
                        <input type="submit" value="Submit"/>
                    </form>
                </div>
            </div>
        )
    }
}