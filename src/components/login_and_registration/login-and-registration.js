import React, { Component } from "react";
import { Link } from "react-router-dom";
import styles from "../login_and_registration/login.module.css";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { Overlay, Popover, OverlayTrigger } from "react-bootstrap";
import { InputGroup } from "react-bootstrap";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  withRouter,
} from "react-router-dom";
import axios from "axios";

const provjeraRegistra = (history, RegisterUser) => {
  console.log("registracija");

  RegisterUser();
  setTimeout(() => {
    let token = localStorage.getItem("token");
    if (token) {
      console.log("Register good");
      history.push("/");
    } else {
      alert(
        "Error in registration\n: Check for this errors \n: Email is already being user \n password is less than 6 letters"
      );
      console.log("Fail");
    }
  }, 1000);
};

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

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      stile: popover2(),
      ErrorMessage: "",
    };
  }
  //update state values
  updateFormValue = (event) => {
    this.setState({ [event.target.name]: event.target.value });
    // console.log(event.target.value);
    // console.log(`Password: ${this.state.password}`);
    // console.log(`Email: ${this.state.email}`);
  };

  //login user
  LoginUser = () => {
    console.log("zasto");
    let constData = {
      email: this.state.email,
      password: this.state.password,
    };
    const headers = {
      "Content-Type": "application/json",
    };
    return axios
      .post("/v1/auth/login", constData, headers)
      .then((res) => res)
      .catch((err) => err);
  };

  //forgot password
  ForgotPassword = () => {
    let token = localStorage.getItem("token");
    let constData = {
      email: this.state.email,
    };

    return axios
      .post("/v1/auth/forgotpassword", constData, {
        headers: {
          "content-type": "application/json",
        },
      })
      .then((response) => response)
      .catch((err) => err);
  };

  PopoverStil = (choose, history) => {
    if (choose === "login") {
      this.LoginUser().then((response) => {
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
          this.setState({ email: "", password: "" });
          this.setState({ stile: popover2() });
          this.props.RenderAll();

          history.push("/");
        }
      });
    } else {
      this.ForgotPassword().then((response) => {
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
          this.setState({
            email: "",
          });
          this.setState({ stile: popover2() });
          this.props.RenderAll();

          history.push("/");
        }
      });
    }
  };

  render() {
    return (
      <div className={styles.formBox}>
        <form
          className={styles.formBlock}
          style={{
            p: 30,
            maxWidth: "400px",
          }}
        >
          <h3 style={{ fontSize: 28 }}>LOGIN TO AN EXISTING ACCOUNT </h3>{" "}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              maxWidth: "200px",
              maxHeight: "500px",
            }}
          >
            <input
              className="pa2"
              style={{ fontSize: 12, marginTop: 5 }}
              type="text"
              value={this.state.email}
              name="email"
              placeholder="Email"
              onChange={this.updateFormValue}
            />
            <input
              className="pa2"
              style={{ fontSize: 12, marginTop: 5 }}
              type="password"
              value={this.state.password}
              name="password"
              placeholder="Password"
              onChange={this.updateFormValue}
            />
          </div>
          <div className={styles.btnContainer}>
            <OverlayTrigger
              overlay={this.state.stile}
              trigger="focus"
              placement="bottom"
            >
              <button
                className="f5 link dim br3 ph4 pv2 mb1 mv3 mr2 dib white bg-purple"
                type="button"
                value="Forgot pass?"
                onClick={() => this.PopoverStil("forgot", this.props.history)}
              >
                Forgot Pwd?
              </button>
            </OverlayTrigger>
            <OverlayTrigger
              overlay={this.state.stile}
              trigger="focus"
              placement="bottom"
            >
              <button
                className="f5 link dim br3 fr ph4 pv2 mb1 mv3 mr2 dib white bg-purple"
                type="button"
                value="LOGIN"
                // onClick={LoginUser}
                onClick={() => this.PopoverStil("login", this.props.history)}
              >
                Login
              </button>
            </OverlayTrigger>
          </div>
        </form>
      </div>
    );
  }
}

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      RegUsername: "",
      RegEmail: "",
      RegPassword: "",
      RegRepeatPassword: "",
      stile: popover2(),
      ErrorMessage: "",
    };
  }

  RegisterUser = () => {
    let constData = {
      name: this.state.RegUsername,
      email: this.state.RegEmail,
      password: this.state.RegPassword,
      role: "publisher",
    };
    const headers = {
      "Content-Type": "application/json",
    };
    return axios
      .post("/v1/auth/register", constData, headers)
      .then((response) => response)
      .catch((err) => err);
  };

  updateFormValue = (event) => {
    this.setState({ [event.target.name]: event.target.value });
    console.log(event.target.value);
    console.log(`Password: ${this.state.password}`);
    console.log(`Email: ${this.state.email}`);
  };

  PopoverStil = (history, password, repeatpassword) => {
    if (password != repeatpassword) {
      // this.setState({ ErrorMessage: "Passwords are not equal" });
      this.setState({ stile: popover("Passwords are not equal") });
      setTimeout(() => {
        this.setState({ stile: popover2() });
      }, 5000);
    } else {
      this.RegisterUser().then((response) => {
        console.log(response);
        if (response.status != 200) {
          console.log("we have error");
          console.log(response.response.data.error);
          this.setState({
            ErrorMessage: response.response.data.error.slice(24),
          });
          this.setState({ stile: popover(this.state.ErrorMessage) });
          setTimeout(() => {
            this.setState({ stile: popover2() });
          }, 5000);
        } else {
          console.log(response.data.token);

          localStorage.setItem("token", response.data.token);
          this.setState({
            RegUsername: "",
            RegEmail: "",
            RegPassword: "",
            RegRepeatPassword: "",
          });
          this.setState({ stile: popover2() });
          this.props.RenderAll();

          history.push("/");
        }
      });
    }
  };

  render() {
    return (
      <div className={styles.formBox}>
        <form
          className={styles.formBlock}
          style={{
            p: 30,
            maxWidth: "400px",
          }}
        >
          <h3 style={{ fontSize: 28 }}>DON'T OWN AN ACCOUNT? MAKE ONE! </h3>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              maxWidth: "200px",
            }}
          >
            <input
              className="pa2"
              style={{ fontSize: 12, marginTop: 5 }}
              type="text"
              value={this.state.RegUsername}
              name="RegUsername"
              placeholder="Username"
              onChange={this.updateFormValue}
            />
            <input
              className="pa2"
              style={{ fontSize: 12, marginTop: 5 }}
              type="text"
              value={this.state.RegEmail}
              name="RegEmail"
              placeholder="Email"
              onChange={this.updateFormValue}
            />
            <input
              className="pa2"
              style={{ fontSize: 12, marginTop: 5 }}
              type="password"
              value={this.state.RegPassword}
              name="RegPassword"
              placeholder="Password"
              onChange={this.updateFormValue}
            />
            <input
              className="pa2"
              style={{ fontSize: 12, marginTop: 5 }}
              type="password"
              value={this.state.RegRepeatPassword}
              name="RegRepeatPassword"
              placeholder="Repeat the password"
              onChange={this.updateFormValue}
            />
          </div>
          <div className={styles.dataInputHorizontal}>
            <h4 style={{ fontSize: 14 }}>Date of Birth: </h4>
            <input className={styles.inputDate} type="date" />
          </div>
          <div className={styles.dataInputHorizontal}>
            <h4 style={{ fontSize: 14 }}>Gender: </h4>
            <div className="gender">
              <div>
                <input
                  className={styles.inputRadio}
                  type="radio"
                  id="male"
                  name="gender"
                  value="male"
                  defaultChecked
                />
                Male
              </div>
              <div>
                <input
                  className={styles.inputRadio}
                  type="radio"
                  id="female"
                  name="gender"
                  value="female"
                />
                Female
              </div>
              <div>
                <input
                  className={styles.inputRadio}
                  type="radio"
                  id="other"
                  name="gender"
                  value="other"
                />
                Other
              </div>
            </div>
          </div>
          <OverlayTrigger
            overlay={this.state.stile}
            trigger="focus"
            placement="bottom"
          >
            <button
              className="f5 fr link dim br3 ph4 pv2 mb2 mv3 mr2 dib white bg-purple"
              type="button"
              value="SIGN UP"
              onClick={() =>
                this.PopoverStil(
                  this.props.history,
                  this.state.RegPassword,
                  this.state.RegRepeatPassword
                )
              }
            >
              Register
            </button>
          </OverlayTrigger>
        </form>
      </div>
    );
  }
}

const LoginAndRegistration = (props) => {
  console.log(props.history);
  return (
    <>
      <div className={styles.formContainer}>
        <Login history={props.history} RenderAll={props.RenderAll} />
        <Register history={props.history} RenderAll={props.RenderAll} />
      </div>
    </>
  );
};

export default withRouter(LoginAndRegistration);
