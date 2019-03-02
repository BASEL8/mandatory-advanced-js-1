import React, { Component } from "react";
import "./App.css";
import Login from "./Login";
import ChatBox from "./ChatBox";
let re = /^[\w\s.-]+$/igm;
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: "",
      login: null
    };
    this.handelUserName = this.handelUserName.bind(this);
    this.logout = this.logout.bind(this);
  }
  handelUserName(name) {
    this.setState({
      user: name,
      login: name.length >=1 && name.length <=12 && re.exec(name)!==null 
    });
    console.log(name.length >=1 && name.length <=12 && re.exec(name)!==null)
  }
  logout() {
    this.setState({
      user: "",
      login: false
    });
  }
  render() {
    console.log(this.state.login)
    const { logout, state, handelUserName} = this;
    if (state.login) {
      return <ChatBox userName={state.user} logout={logout} />;
    } else {
      return (
        <div>
          <h1>Bla Bla Bla</h1>
          <Login UserName={handelUserName} />
        </div>
      );
    }
  }
}

export default App;
