import React, { Component } from 'react';
const io = require('socket.io-client');
const reactStringReplace = require('react-string-replace')
let socket = null;

const emojiName = require("emoji-name-map");
export default class ChatBox extends Component{
    constructor(props){
          super(props);
          this.state={
              inputValue : '',
              allMessage : []
          }
          this.onChange = this.onChange.bind(this);
          this.onClick = this.onClick.bind(this);
          this.onKeyUp = this.onKeyUp.bind(this);
    }
    onChange(e){
        this.setState({
            inputValue : e.target.value,
        })
    }
    onClick(){
        socket.emit('message', {
            username: this.props.userName,
            content: this.state.inputValue,
          }, (bla) => {
            this.setState({
                allMessage : [...this.state.allMessage, bla.data.newMessage],
                inputValue : ''
            })
          });
    }
    onKeyUp(e){
        if(e.keyCode === 13){
           this.onClick();
        }
    }
    componentDidMount(){
        socket = io('http://ec2-13-53-66-202.eu-north-1.compute.amazonaws.com:3000');

        socket.on('messages', (messages) => {
            this.setState({
                allMessage : [...messages]
            })
        });
        socket.on('new_message', (message) => {  
            this.setState({
                allMessage : [...this.state.allMessage, message]
            })
          });    
    }
    componentWillUnmount() {
        socket.disconnect();
        socket = null;
    }
    render(){    
        const {props,state,onChange,onKeyUp,onClick} = this;
        return(
            <div>
            <button onClick={()=>{props.logout()}}style={{position:'fixed',top:'10px',right:'10px'}}>logout</button>
                <ul style={{listStyle:'none'}}>
                    {state.allMessage.map((m,i)=>{
                       let replacedText;  
                       replacedText = reactStringReplace(m.content, /(https?:\/\/\S+)/g, (match, i) => (
                        <a key={match + i} target="_blank" rel="noopener noreferrer" href={match}>{match}</a>
                           ));
                        var re = /(?:^|\W):(\w+):(?!\w)/g, emojiMatch;
                        while (emojiMatch = re.exec(replacedText)) {
                            replacedText = reactStringReplace(replacedText, emojiMatch[0], () => (emojiName.get(emojiMatch[1])));                        
                        }
                      return <li key={i}> <p><strong>{m.username}: </strong> {replacedText}</p></li>
                     })}
                 </ul>
                
                <input value={state.inputValue} onChange={onChange} onKeyUp={onKeyUp}/>
                <button onClick={onClick}>Send</button>
            </div>
        )
    }
}