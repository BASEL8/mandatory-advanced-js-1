import React, { Component } from 'react';


export default class Login extends Component{
      constructor(props){
       super(props);
       this.state = {
         userName : ''
       }
       this.onChange = this.onChange.bind(this);
       this.onClick = this.onClick.bind(this);
       this.onKeyUp = this.onKeyUp.bind(this);
      }
      onChange(e){
        this.setState({
          userName : e.target.value
        })
      }
      onClick(){
        this.props.UserName(this.state.userName,this.props.Login)
      }
      onKeyUp(e){
        if(e.keyCode === 13){
           this.onClick();
        }
    }
  render(){
    const {onChange,onClick,onKeyUp}=this;
    return(
      <div>
        <input placeholder="User Name" onChange={onChange} onKeyUp={onKeyUp}/>
        <button onClick={onClick}>Login</button>
      </div>
    )
}

}