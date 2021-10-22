import React, { Component } from "react";
import axios from "axios";
export class Testizmjene extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data1: "smile",
      quizzes: [],
    };
  }

  componentDidMount = () => {
    console.log("uzmi");
    let constData = {
      email: "john1@gmail.com",
      name: "Johhny Dope",
    };
    // const headers = {
    //   "content-type": "application/json",
    //   //   withCredentials: "true",
    //   Authorization: `Bearer `,
    // };
    document.cookie = "username=bob";
    let x = document.cookie;
    console.log(x);
    axios
      .put("/v1/auth/updatedetails", constData, {
        headers: {
          Authorization: `Bearer`,
          "content-type": "application/json",
        },
      })
      .then((response) => {
        console.log(response);
      })
      .catch((err) => console.log(err));
    // axios
    //   .post("/v1/auth/updatedetails", constData, headers)
    //   .then((response) => {
    //     console.log(response);
    //   })
    //   .catch((err) => console.log(err));
  };
  render() {
    return <div>Testna komponenta</div>;
  }
}
