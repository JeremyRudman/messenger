import React from 'react';
import './message.css'
import {Link} from "react-router-dom";

export class Message extends React.Component{
    constructor(props){
        super(props);
        this.state={
            user:null,
            toUser: null,
            messages:[]
        }
    }

    componentDidMount() {
        var user = this.props.user;
        var toUser=this.props.location.state.toUser;
        console.log(user);
        console.log(toUser);
        fetch('http://localhost:4000/users/received?userID='+user.userID+'&toUserID='+toUser.userID)
            .then(response => response.json())
            .then(data =>{
                var tempsend=[];
                console.log(data);
                for (let i = 0; i < data.data.length; i++) {
                        tempsend.push(data.data[i])
                }
                console.log(tempsend);
                this.setState({
                    user:user,
                    toUser:toUser,
                    messages: tempsend
                })
            })
            .catch(err=>console.log(err))
    }

    render() {

        const Messages = ({messages}) => (
            <div>
                {messages.map(message => (
                  <div key={message.messageID}>
                      {(message.toUserID===this.state.user.userID)?
                          <div className="received"> {message.message}</div>:
                          <div className="sent"> {message.message}</div>}
                    </div>))}
            </div>
        );
        return(
            <div>
                <Messages messages={this.state.messages}/>
            </div>
        )
    }
}