import React, { Component } from "react";
import * as grpc from "grpc-web";
import logo from "./logo.svg";
import "./App.css";
const { LoginRequest } = require("./proto/alaska_pb");
const { AlaskaClient } = require("./proto/alaska_grpc_web_pb");
var client = new AlaskaClient("http://localhost:8080");

class App extends Component {
  state = {
    grpcreturn: ""
  };
  componentDidMount() {
    const queryRequest = new LoginRequest();
    var call = client.login(queryRequest, {}, function(err, message) {
      if (err) {
        console.log("Error code: " + err.code + ' "' + err.message + '"');
      } else {
        var values = message.toObject();
        console.log(values);
        // this.setState({
        //   grpcreturn: values
        // });
      }
    });
    call.on("status", function(status) {
      if (status.code !== grpc.StatusCode.OK) {
        console.log("Error code: " + status.code + ' "' + status.details + '"');
      }
    });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>{this.state.grpcreturn}</p>
        </header>
      </div>
    );
  }
}

export default App;
