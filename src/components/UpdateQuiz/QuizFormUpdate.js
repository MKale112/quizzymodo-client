import React, { Component } from "react";
import Question from "./QuestionUpdate";

export const QuizName = ({ currentStep, handleChange, quizName }) => {
  if (currentStep !== 1) return null;

  return (
    <div className="mv3 pv4 black-80">
      <h3>What is the name of your Quiz?</h3>
      <input
        className="bb f6 f5-l input-reset b--black-80 bg-white pa3 lh-solid w-100 w-75-m w-80-ns br2-ns br--left-ns"
        name="quizName"
        type="text"
        placeholder="ex. The Unbeatable Quiz"
        value={quizName}
        onChange={handleChange}
      />
    </div>
  );
};

export const QuizCategory = ({ currentStep, handleChange, quizCategory }) => {
  if (currentStep !== 2) return null;

  return (
    <div className="mv3 pv4 black-80">
      <h3>Under what category does your Quiz belong? What is it about?</h3>
      <input
        className="bb f6 f5-l input-reset b--black-80 bg-white pa3 lh-solid w-100 w-75-m w-80-ns br2-ns br--left-ns"
        name="quizCategory"
        type="text"
        placeholder="ex. History"
        value={quizCategory}
        onChange={handleChange}
      />
    </div>
  );
};

export class QuizQuestions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentQuestion: 1,
      answers: [],
      question: "",
      answer1: "",
      answer2: "",
      answer3: "",
      answer4: "",
      correct: "",
      checked1: false,
      checked2: false,
      checked3: false,
      checked4: false,
    };
    this.baseState = this.state;
  }

  componentDidUpdate = () => {
    //dohvati trenutno pitanje/broj pitanja
    let i = this.state.currentQuestion;
    if (
      i >= 1 &&
      i <= 5 &&
      this.state.question === "" &&
      this.state.answer1 === "" &&
      this.state.answer2 === "" &&
      this.state.answer3 === "" &&
      this.state.answer4 === ""
    ) {
      let { question, answers, correct } = this.props.q_and_a[i - 1];

      this.setState({
        question: question,
        answer1: answers[0],
        answer2: answers[1],
        answer3: answers[2],
        answer4: answers[3],
      });

      if (correct === answers[0]) {
        this.setState({ checked1: !this.state.checked1, correct: answers[0] });
      }
      if (correct === answers[1]) {
        this.setState({ checked2: !this.state.checked2, correct: answers[1] });
      }
      if (correct === answers[2]) {
        this.setState({ checked3: !this.state.checked3, correct: answers[2] });
      }
      if (correct === answers[3]) {
        this.setState({ checked4: !this.state.checked4, correct: answers[3] });
      }
    }
  };

  _next = () => {
    let currQ = this.state.currentQuestion;
    if (currQ > 1 || currQ <= 5) currQ = currQ + 1;
    this.setState({ currentQuestion: currQ });
  };

  _prev = () => {
    let currQ = this.state.currentQuestion;
    // If the current step is 2 or 3, then subtract one on "previous" button click
    currQ = currQ <= 1 ? 1 : currQ - 1;
    this.setState({ currentQuestion: currQ });
  };

  // The "next" and "previous" button functions
  previousQuestion = () => {
    let currentQuestion = this.state.currentQuestion;

    // If the current step is not 1, then render the "previous" button
    if (currentQuestion !== 1) {
      // return (
      //   <button
      //     className="f6 link dim br3 ba ph3 pv2 mb2 dib light-purple fl distance"
      //     type="button"
      //     onClick={this._prev}
      //   >
      //     Previous Question
      //   </button>
      // );
      this._prev();
    }
    // don't render anything
    return null;
  };

  nextQuestion = () => {
    let currentQuestion = this.state.currentQuestion;

    let answers = [
      this.state.answer1,
      this.state.answer2,
      this.state.answer3,
      this.state.answer4,
    ];

    const { question, correct } = this.state;
    let objekt = { question, answers, correct };

    this.props.importQnA(objekt);
    this.setState(this.baseState);
    // this.setState(this.baseState);
    // this.setState({
    //   checked1: false,
    //   checked2: false,
    //   checked3: false,
    //   checked4: false,
    // });
    // this.transition();
    console.log("Stisnut add question, ispisi sljedece pitanje");
    console.log(this.state);

    if (currentQuestion <= 5) {
      // return (
      //   <button
      //     className="f6 link dim br3 ph3 pv2 mb2 dib white bg-light-purple distance"
      //     type="button"
      //     onClick={this._next}
      //   >
      //     Add Question
      //   </button>
      // );
      this._next();
    }
    // } else if (currentQuestion === 5) {
    //   return (
    //     <input
    //       className="f6 link dim br3 ph3 pv2 mb2 dib white bg-light-purple distance"
    //       type="button"
    //       value="Submit"
    //     />
    //   );
    // }
    // don't render anything
    return null;
  };

  transition = () => {
    // let i = this.state.currentQuestion;
    // let { question, answers, correct } = this.props.q_and_a[i - 1];
    // this.setState({
    //   question: question,
    //   answer1: answers[0],
    //   answer2: answers[1],
    //   answer3: answers[2],
    //   answer4: answers[3],
    // });
    // if (correct === answers[0]) {
    //   this.setState({ checked1: !this.state.checked1, correct: answers[0] });
    // }
    // if (correct === answers[1]) {
    //   this.setState({ checked2: !this.state.checked2, correct: answers[1] });
    // }
    // if (correct === answers[2]) {
    //   this.setState({ checked3: !this.state.checked3, correct: answers[2] });
    // }
    // if (correct === answers[3]) {
    //   this.setState({ checked4: !this.state.checked4, correct: answers[3] });
    // }
  };

  handleChange = (event) => {
    let { name, value } = event.target;
    this.setState({ [name]: value });

    if (event.target.type === "checkbox") {
      if (event.target.value === this.state.answer1)
        this.setState({ checked1: !this.state.checked1 });
      if (event.target.value === this.state.answer2)
        this.setState({ checked2: !this.state.checked2 });
      if (event.target.value === this.state.answer3)
        this.setState({ checked3: !this.state.checked3 });
      if (event.target.value === this.state.answer4)
        this.setState({ checked4: !this.state.checked4 });
    }
  };

  render() {
    const {
      currentQuestion,
      question,
      correct,
      answer1,
      answer2,
      answer3,
      answer4,
      checked1,
      checked2,
      checked3,
      checked4,
    } = this.state;
    const { currentStep } = this.props;

    if (currentStep !== 3) return null;
    // if (currentQuestion > 5) return null;
    if (currentQuestion > 5) return <h3>DONE! Submit your update!</h3>;

    return (
      <form className="center_column">
        <div className="w-100 ">
          <h3>Question {currentQuestion}</h3>
          <div>
            <Question
              currentQuestion={currentQuestion}
              question={question}
              answer1={answer1}
              answer2={answer2}
              answer3={answer3}
              answer4={answer4}
              correct={correct}
              checked1={checked1}
              checked2={checked2}
              checked3={checked3}
              checked4={checked4}
              handleChange={this.handleChange}
              addValue={this.addValue}
            />
          </div>
          <div className="center_row mv4">
            {/* <input
              className="f6 link dim br3 ph3 pv2 mb2 dib white bg-near-black distance"
              type="button"
              value="Previous Question"
              name="Previous Question"
              onClick={this.previousQuestion}
            /> */}
            <input
              className="f6 link dim br3 ph3 pv2 mb2 dib white bg-near-black distance"
              type="button"
              value="Add Question"
              name="Add Question"
              onClick={this.nextQuestion}
            />
          </div>
        </div>
      </form>
    );
  }
}
