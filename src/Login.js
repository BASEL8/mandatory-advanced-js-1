import React, { Component } from "react";
export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: "",
    };
    this.onChange = this.onChange.bind(this);
    this.onClick = this.onClick.bind(this);
    this.onKeyUp = this.onKeyUp.bind(this);
  }
  onChange(e) {
    this.setState({
      userName: e.target.value,
    });
  }
  onClick() {
    this.props.UserName(this.state.userName);
  }
  onKeyUp(e) {
    if (e.keyCode === 13) {
      this.onClick();
    }
  }
  render() {
    let re = /^[\w\s.-]+$/igm;
    const { onChange, onClick, onKeyUp ,state} = this;
    return (
      <div>
        <input placeholder="User Name" onChange={onChange} onKeyUp={onKeyUp} />
        <button onClick={onClick}>Login</button>
        <p style={{fontSize:'8px',color:state.userName.length >=1 && state.userName.length <=12 ? 'green':'red'}}> - The username must be between 1 and 12 characters long</p>
        <p style={{fontSize:'8px',color : re.exec(state.userName)!==null ? 'green':'red'}}> - The username can only contain alphanumeric characters, “-”, “_” and spaces</p>
      </div>
    );
  }
}
