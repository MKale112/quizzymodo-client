import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "./quizzes.css";
import Scroll from "../Scroll";

const QuizCard = ({ id, name, description }) => {
  return (
    <div
      key={id}
      className="w-100 w-80-m w-100-ns mv2 br3 pa2 pa3-ns ba bg-white b--black-10 cards"
    >
      <div>
        <h4 className="f5 f4-ns">{name}</h4>
        <h5 className="f6 f5-ns silver">{description}</h5>
      </div>

      <Link
        to={{
          pathname: `/quiz/${id}`,
          query: { value: id },
        }}
      >
        <button
          className="f4 link dim br3 ph4 pv2 mb2 dib white bg-light-purple"
          type="button"
        >
          Play
        </button>
      </Link>
    </div>
  );
};

const Rules = () => {
  return (
    <div className="rulesContainer f4 mv4 ">
      <h1>RULES</h1>
      <div>
        <h3>1.</h3>
        <p>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s.
        </p>
      </div>
      <div>
        <h3>2.</h3>
        <p>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum.
        </p>
      </div>
      <div>
        <h3>3.</h3>
        <p>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s.
        </p>
      </div>
      <div>
        <h3>4.</h3>
        <p>Lorem Ipsum is simply dummy text</p>
      </div>
    </div>
  );
};

export class ListQuizes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      quizzes: [],
    };
  }

  componentDidMount = () => {
    axios.get("/v1").then((response) => {
      let { data } = response.data;
      this.setState({ quizzes: data });
    });
    document.cookie = "username=John Doe";
  };

  render() {
    let arrayOfQuizzes = this.state.quizzes.map((quiz, index) => (
      <QuizCard
        key={quiz._id}
        id={quiz._id}
        name={quiz.name}
        description={quiz.description}
      />
    ));

    return (
      <div className="tc componentContainer mv4">
        <h1 className="mt5 pa3">Here you can browse quizzes!</h1>
        <Scroll height={500}>
          <div className="cardContainer">{arrayOfQuizzes}</div>
        </Scroll>
        <div className="pa3 br3 ba bg-white mv5 b--near-white cardContainer">
          <Rules />
        </div>
      </div>
    );
  }
}
