import React, { Component } from "react";
import { QuizName, QuizCategory, QuizQuestions } from "./QuizForm";
import { Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./createQuizz.css";
import fireCracker from "../../images/fire-cracker.svg";
import Axios from "axios";

const Results = (props) => {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      className="tc"
    >
      <Modal.Header
        closeButton
        // style={{
        //   background: `url(${congratulations})`,
        //   backgroundRepeat: "repeat",
        //   backgroundPosition: "right",
        //   backgroundSize: "20%",
        //   minHeight: "20px",
        // }}
      >
        <Modal.Title id="contained-modal-title-vcenter">
          <h1 className="bg-white pa1 ">NICE JOB!</h1>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="tc">
        <div className="cards">
          <div
            className="bg-white h3 h4-ns w-30 w-40-m w-30-ns"
            style={{
              background: `url(${fireCracker})`,
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
              backgroundSize: "20%",
              backgroundSize: "contain",
              minHeight: "20px",
            }}
          ></div>
          <div>
            <h3>Congratulations, you successfully created </h3>
            <h4>{props.quizName}!</h4>
          </div>
          <div
            className="bg-white h3 h4-ns w-30 w-40-m w-30-ns"
            style={{
              background: `url(${fireCracker})`,
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
              backgroundSize: "20%",
              backgroundSize: "contain",
              minHeight: "20px",
            }}
          ></div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Link to="/profile">
          <button
            className="f4 link dim br3 ph4 pv2 mb2 dib white bg-light-purple"
            onClick={props.onHide}
          >
            Return to Quizzes!
          </button>
        </Link>
      </Modal.Footer>
    </Modal>
  );
};

class MasterForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentStep: 1,
      quizName: "",
      quizCategory: "",
      q_and_a: [],
      modalShow: false,
    };
  }

  _next = () => {
    let currStep = this.state.currentStep;
    // If the current step is 1 or 2, then add one on "next" button click
    currStep = currStep >= 2 ? 3 : currStep + 1;
    this.setState({ currentStep: currStep });
  };

  _prev = () => {
    let currStep = this.state.currentStep;
    // If the current step is 2 or 3, then subtract one on "previous" button click
    currStep = currStep <= 1 ? 1 : currStep - 1;
    this.setState({ currentStep: currStep });
  };

  // The "next" and "previous" button functions
  get previousButton() {
    let currentStep = this.state.currentStep;

    // If the current step is not 1, then render the "previous" button
    if (currentStep !== 1) {
      return (
        <button
          className="f6 link dim br3 ba ph3 pv2 mb2 dib light-purple fl distance"
          type="button"
          onClick={this._prev}
        >
          Previous
        </button>
      );
    }
    // don't render anything
    return null;
  }

  get nextButton() {
    let currentStep = this.state.currentStep;

    // If the current step is not 3, then render the "next" button
    if (currentStep < 3) {
      return (
        <button
          className="f6 link dim br3 ph3 pv2 mb2 dib white bg-light-purple distance "
          type="button"
          onClick={this._next}
        >
          Next
        </button>
      );
    }
    // don't render anything
    return null;
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  // ISPIS KVIZA U KONZOLU
  handleSubmit = (event) => {
    this.setState({ modalShow: true });

    event.preventDefault();
    const { quizName, quizCategory, q_and_a } = this.state;

    //API to databse
    let token = localStorage.getItem("token");
    console.log(token);
    let constData = {
      name: quizName,
      description: quizCategory,
      q_and_a: q_and_a,
    };

    Axios.post("/v1", constData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "content-type": "application/json",
      },
    }).then((response) => {
      console.log(response);
    });
  };

  importQnA = (newElement) => {
    // this.setState({ q_and_a: [...currentQnA, newElement] });
    // this.setState({
    //   q_and_a: [...this.state.q_and_a, ...newElement],
    // });
    this.setState({
      q_and_a: [...this.state.q_and_a, newElement],
    });

    console.log(this.state.q_and_a);
  };

  setToFalse = () => {
    this.setState({ modalShow: false });
  };

  render() {
    const { currentStep, quizName, quizCategory, emptyObj } = this.state;

    return (
      <form className="center_column mw-8 mv6" onSubmit={this.handleSubmit}>
        <div className="br3 ba b--black-10 mv4 pv3 w-90 w-50-m w-70-ns mw6 shadow-5 center_column tac bg-near-white">
          <div className="mw9 w-80-m w-80-ns ">
            <h1 className="pa3">Create your Quiz here!</h1>
            <h3 className="pa2">STEP {this.state.currentStep}</h3>
            <div>
              <QuizName
                currentStep={currentStep}
                quizName={quizName}
                handleChange={this.handleChange}
              />

              <QuizCategory
                currentStep={currentStep}
                quizCategory={quizCategory}
                handleChange={this.handleChange}
              />

              <QuizQuestions
                currentStep={currentStep}
                emptyObj={emptyObj}
                importQnA={this.importQnA}
              />
            </div>
          </div>
        </div>
        <div className="center_row mv4">
          {this.previousButton}
          <input
            className="f6 link dim br3 ph3 pv2 mb2 dib white bg-near-black distance"
            type="button"
            value="Submit"
            name="Submit"
            onClick={this.handleSubmit}
          />
          {this.nextButton}
          <Results
            show={this.state.modalShow}
            onHide={this.setToFalse}
            quizName={quizName}
          />
        </div>
      </form>
    );
  }
}

export default MasterForm;
