import React, { Component } from "react";
import LoginAndRegistration from "../components/login_and_registration/login-and-registration";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { ListQuizes } from "../components/quizzes/listquizes";
import { ShowQuiz } from "../components/quizzes/showQuiz";
import ResetPassword from "../components/profile/resetpassword";
import Layout from "../components/layout/layout";
import { Profil } from "../components/profile/profile";
import "./App.css";
import MasterForm from "../components/CreateQuiz/MasterForm";
import Homepage from "../pages/homepage";
import MasterFormUpdate from "../components/UpdateQuiz/MasterFormUpdate";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = { variabla1: "" };
  }
  RenderAll = () => {
    this.setState({ variabla1: "smile" });
  };
  render() {
    return (
      <Layout>
        <Router>
          <div>
            <Switch>
              <Route exact path="/" component={Homepage} />
              <Route path="/listquizes" component={ListQuizes} />
              <Route path="/quiz/:id" component={ShowQuiz} />
              <Route path="/update/:id" component={MasterFormUpdate} />
              <Route
                path="/resetpassword/:resetToken"
                render={() => <ResetPassword RenderAll={this.RenderAll} />}
              />
              <Route
                path="/login"
                render={() => (
                  <LoginAndRegistration RenderAll={this.RenderAll} />
                )}
              />
              <Route
                path="/profile"
                render={() => {
                  let token = localStorage.getItem("token");
                  if (!token) {
                    return <Redirect to="/login" />;
                  } else {
                    return <Profil />;
                  }
                }}
              />
              {/* */}
              <Route
                path="/izmjena"
                render={() => {
                  let token = localStorage.getItem("token");
                  if (!token) {
                    return <Redirect to="/login" />;
                  } else {
                    return <MasterForm />;
                  }
                }}
              />
            </Switch>
          </div>
        </Router>
      </Layout>
    );
  }
}
