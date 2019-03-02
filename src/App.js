import React, { Component } from "react";
import "./App.css";
import Login from "./Login";
import ChatBox from "./ChatBox";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: "",
      login: false
    };
    this.handelUserName = this.handelUserName.bind(this);
    this.logout = this.logout.bind(this);
  }
  handelUserName(name, login) {
    this.setState({
      user: name,
      login: true
    });
  }
  logout() {
    this.setState({
      user: "",
      login: !this.state.login
    });
  }
  render() {
    const { logout, state, handelUserName } = this;
    if (state.login && state.user) {
      return <ChatBox userName={state.user} logout={logout} />;
    } else {
      return (
        <div>
          <h1>Bla Bla Bla</h1>
          <Login UserName={handelUserName} login={state.login} />
        </div>
      );
    }
  }
}

export default App;
