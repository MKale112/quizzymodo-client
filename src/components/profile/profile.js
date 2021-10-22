import React, { Component } from "react";
import { Link } from "react-router-dom";
import Scroll from "../Scroll";
import axios from "axios";
import styles from "../profile/login.module.css";
import "../quizzes/quizzes.css";

const QuizzCardProfile = ({ id, name, description, DeleteQuiz }) => {
  return (
    <div
      key={id}
      className="w-100 w-80-m w-100-ns mv2 br3 pa2 pa3-ns ba bg-white b--black-10 cards"
    >
      <div>
        <h4 className="f5 f4-ns">{name}</h4>
        <h5 className="f6 f5-ns silver">{description}</h5>
      </div>

      <div className="myQuizzes">
        <div>
          <button
            className="f4 link dim br3 ba ph4 pv2 mb2 dib light-purple distance"
            type="button"
            value="delete"
            onClick={() => DeleteQuiz(id)}
          >
            Delete
          </button>
        </div>

        <Link to={{ pathname: `update/${id}` }}>
          <button
            className="f4 link dim br3 ph4 pv2 mb2 dib white bg-light-purple"
            type="button"
          >
            Update
          </button>
        </Link>
      </div>
    </div>
  );
};

//Has change password and  forgot/reset password
export class Profil extends Component {
  constructor(props) {
    super(props);
    this.state = {
      OldPassword: "",
      NewPassword: "",
      name: "",
      email: "",
      UserId: "",
      quizzes: [],
      Fetching: true,
    };
  }

  updateFormValue = (event) => {
    this.setState({ [event.target.name]: event.target.value });
    console.log(event.target.value);
    console.log(`Old password: ${this.state.OldPassword}`);
    console.log(`New password: ${this.state.NewPassword}`);
    console.log(`New email: ${this.state.email}`);
    console.log(`New name: ${this.state.name}`);
  };

  //Change password axios call
  ChangePassword = () => {
    let token = localStorage.getItem("token");
    console.log(token);

    let constData = {
      currentPassword: this.state.OldPassword,
      newPassword: this.state.NewPassword,
    };
    axios
      .put("/v1/auth/updatepassword", constData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "content-type": "application/json",
        },
      })
      .then((response) => {
        console.log(response);
        console.log(response.data.token);
        localStorage.setItem("token", response.data.token);
        this.setState({ OldPassword: "", NewPassword: "" });
      })
      .catch((err) => console.log(err));
  };

  //Change user details name and email
  ChangeUserDetails = () => {
    let token = localStorage.getItem("token");
    console.log(token);
    let constData = {
      email: this.state.email,
      name: this.state.name,
    };

    axios
      .put("/v1/auth/updatedetails", constData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "content-type": "application/json",
        },
      })
      .then((response) => {
        console.log(response);
        this.setState({ name: "", email: "" });
      })
      .catch((err) => console.log(err));
  };

  //Get all quizes so that you can search for user ones
  componentDidMount = () => {
    this.FetchData();
  };

  FetchData = () => {
    console.log("hej");
    //////////INFO QUIZ//////////
    //Get all quizes
    let token = localStorage.getItem("token");
    axios.get("/v1").then((response) => {
      let { data } = response.data;
      this.setState({ quizzes: data });
      console.log(this.state.quizzes);
    });

    //get user info
    axios
      .get("/v1/auth/me", {
        headers: {
          Authorization: `Bearer ${token}`,
          "content-type": "application/json",
        },
      })
      .then((response) => {
        //console log user id
        console.log(response.data.data._id);
        this.setState({ UserId: response.data.data._id });
        console.log(this.state.UserId);
      })
      .catch((err) => console.log(err));
  };

  DeleteQuiz = (data) => {
    console.log("delete");
    console.log(data);

    let token = localStorage.getItem("token");
    console.log(token);
    let constData = {
      type: "delete",
    };
    axios
      .delete(`/v1/${data}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "content-type": "application/json",
        },
      })
      .then((response) => {
        console.log(response);
        this.FetchData();
      });
  };

  UpdateQuiz = (data) => {
    console.log(this.props.match.url);
  };

  render() {
    let listQuizes = this.state.quizzes.map((quiz, index) => {
      if (quiz.user === this.state.UserId) {
        return (
          <QuizzCardProfile
            key={quiz._id}
            id={quiz._id}
            name={quiz.name}
            description={quiz.description}
            DeleteQuiz={this.DeleteQuiz}
          />
        );
      } else return null;
    });

    return (
      <>
        <div
          className={styles.formContainer}
          style={{
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        >
          <div className={styles.formBox}>
            <form
              className={styles.formBlock}
              style={{
                p: 30,
                maxWidth: "400px",
              }}
            >
              <h2 style={{ fontSize: 28 }}>Change password </h2>{" "}
              {/* ovo je bilo "sx" */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  maxWidth: "200px",
                  maxHeight: "500px",
                }}
              >
                <input
                  style={{ fontSize: 12, marginTop: 5 }}
                  type="password"
                  name="OldPassword"
                  value={this.state.OldPassword}
                  placeholder="OldPassword"
                  onChange={this.updateFormValue}
                />
                <input
                  style={{ fontSize: 12, marginTop: 5 }}
                  type="password"
                  name="NewPassword"
                  value={this.state.NewPassword}
                  placeholder="NewPassword"
                  onChange={this.updateFormValue}
                />
                <div className={styles.btnContainer}>
                  <input
                    className="f4 link dim br3 ph4 pv2 mv3 mr2 dib white bg-purple tc "
                    type="button"
                    value="Change"
                    onClick={this.ChangePassword}
                  />
                </div>
              </div>
            </form>
          </div>

          {/* Change user details (name and email) */}
          <div className={styles.formBox}>
            <form
              className={styles.formBlock}
              style={{
                p: 30,
                maxWidth: "400px",
              }}
            >
              <h2 style={{ fontSize: 28 }}>Change name and email </h2>{" "}
              {/* ovo je bilo "sx" */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  maxWidth: "200px",
                  maxHeight: "500px",
                }}
              >
                <input
                  style={{ fontSize: 12, marginTop: 5 }}
                  type="text"
                  name="name"
                  value={this.state.name}
                  placeholder="NewName"
                  onChange={this.updateFormValue}
                />
                <input
                  style={{ fontSize: 12, marginTop: 5 }}
                  type="text"
                  name="email"
                  value={this.state.email}
                  placeholder="NewEmail"
                  onChange={this.updateFormValue}
                />
                <div className={styles.btnContainer}>
                  <input
                    className="f4 link dim br3 ph4 pv2 mv3 mr2 dib white bg-purple tc "
                    type="button"
                    value="Change"
                    onClick={this.ChangeUserDetails}
                  />
                </div>
              </div>
            </form>
          </div>
        </div>
        <div>
          <div className="componentContainer mv3 pb5">
            <h1 className="mt3 pa3">My Quizzes:</h1>
            <Scroll height={300}>
              <div className="cardContainer ">{listQuizes}</div>
            </Scroll>
          </div>
        </div>
      </>
    );
  }
}
