import React, { Component } from "react";
import styles from "../profile/login.module.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  withRouter,
} from "react-router-dom";
import axios from "axios";
import { Overlay, Popover, OverlayTrigger } from "react-bootstrap";

const popover = (message) => {
  return (
    <Popover id="popover-basic">
      <Popover.Title as="h3">Error</Popover.Title>
      <Popover.Content>{message}</Popover.Content>
    </Popover>
  );
};

const popover2 = () => {
  return <Popover id="popover-basic2"></Popover>;
};

class ResetPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ResetPassword: "",
      resetToken: "",
      ErrorMessage: "",
      stile: popover2(),
    };
  }
  updateFormValue = (event) => {
    this.setState({ [event.target.name]: event.target.value });
    // console.log(event.target.value);
    // console.log(`Password: ${this.state.password}`);
    // console.log(`Email: ${this.state.email}`);
  };

  ResetPasswordUrl = () => {
    let constData = {
      password: this.state.ResetPassword,
      resetToken: this.state.resetToken,
    };
    return axios
      .put(`/v1/auth/resetpassword/${this.state.resetToken}`, constData, {
        headers: {
          "content-type": "application/json",
        },
      })
      .then((response) => response)
      .catch((err) => err);
    // console.log(response.data.token);
    // localStorage.setItem("token", response.data.token);
    // this.setState({
    //   ResetPassword: "",
    //   resetToken: "",
  };

  PopoverStil = (history) => {
    this.ResetPasswordUrl().then((response) => {
      console.log(response);
      if (response.status != 200) {
        console.log("we have error");
        console.log(response.response.data.error);
        this.setState({ ErrorMessage: response.response.data.error });
        this.setState({ stile: popover(this.state.ErrorMessage) });
        setTimeout(() => {
          this.setState({ stile: popover2() });
        }, 3000);
      } else {
        console.log(response.data.token);
        localStorage.setItem("token", response.data.token);
        this.setState({ ResetPassword: "", resetToken: "" });
        this.setState({ stile: popover2() });
        this.props.RenderAll();
        history.push("/");
      }
    });
  };

  render() {
    return (
      <div>
        <div className={styles.formBlock}>
          <div className="flex_col tc mt6 ">
            <h1 className="">
              Solve this form and retrieve your new password!
            </h1>
            <h2 className="near-black-70">
              Input the token you recieved in the mail.
            </h2>
          </div>
          <div className="w-30-ns mt4 br3 pa4 pa4-ns ba bg-white b--black-10 mb7">
            <form>
              <h2 className="mv2" style={{ fontSize: 28 }}>
                Reset password
              </h2>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  maxWidth: "200px",
                  maxHeight: "500px",
                  margin: "1rem 0",
                }}
              >
                <input
                  className="pa2"
                  style={{ fontSize: 12, marginTop: 5 }}
                  type="text"
                  value={this.state.resetToken}
                  name="resetToken"
                  placeholder="Enter reset Token"
                  onChange={this.updateFormValue}
                />
                <input
                  className="pa2"
                  style={{ fontSize: 12, marginTop: 5 }}
                  type="password"
                  value={this.state.ResetPassword}
                  name="ResetPassword"
                  placeholder="Enter new password"
                  onChange={this.updateFormValue}
                />

                <OverlayTrigger
                  overlay={this.state.stile}
                  trigger="focus"
                  placement="bottom"
                >
                  <button
                    className="f5 link dim br3 fr ph4 pv2 mb1 mv3 mr2 dib white bg-purple"
                    type="button"
                    value="Change password"
                    // onClick={LoginUser}
                    onClick={() => this.PopoverStil(this.props.history)}
                  >
                    Change Password
                  </button>
                </OverlayTrigger>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(ResetPassword);
