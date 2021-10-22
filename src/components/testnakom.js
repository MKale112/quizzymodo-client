import React, { Component } from "react";
import axios from "axios";

export class Testnakom extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data1: "bokset",
      quizzes: [],
    };
  }

  componentDidMount = () => {
    let constData = {
      email: "john@gmail.com",
      password: "123456",
    };
    const headers = {
      "Content-Type": "application/json",
    };
    axios
      .post("/v1/auth/login", constData, headers)
      .then((response) => {
        console.log(response);
      })
      .catch((err) => console.log(err));
  };
  render() {
    return <div>Testna komponenta</div>;
  }
}
