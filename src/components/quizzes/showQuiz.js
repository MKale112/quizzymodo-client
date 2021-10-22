import React, { Component } from "react";
import Axios from "axios";
import { Link } from "react-router-dom";
import { Card } from "react-bootstrap";
import { Modal } from "react-bootstrap";
import "./quizzes.css";

import congratulations from "../../images/congratulation.svg";
import fireCracker from "../../images/fire-cracker.svg";

const OneCard = ({ varij, index, handleChange }) => {
  return (
    <Card
      key={index}
      className="w-100 w-80-m w-100-ns mv2 br3 pa2 pa3-ns ba bg-white b--black-10"
    >
      <Card.Header>
        <h4>
          Question {index + 1}. {varij.question}
        </h4>
      </Card.Header>
      <Card.Body className="pa0">
        {varij.answers.map((answer, ansIndex) => {
          return (
            <div
              className="w-100 w-80-m w-100-ns mv2 br3 ba bg-white b--black-10 cards"
              key={ansIndex}
            >
              {/* <input
                className="mh2"
                type="checkbox"
                name={`questionCheckbox${index}`}
                value={answer}
                onChange={handleChange}
              />
              <label >{answer}</label> */}
              <input
                id={`questionCheckbox${index}${ansIndex}`}
                className="mh2 cheeky"
                type="checkbox"
                name={`questionCheckbox${index}`}
                value={answer}
                onChange={handleChange}
              />
              <label
                htmlFor={`questionCheckbox${index}${ansIndex}`}
                className="w-100 mv0 pv2 pl3 labelo"
              >
                {answer}
              </label>
            </div>
          );
        })}
      </Card.Body>
    </Card>
  );
};

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
        style={{
          background: `url(${congratulations})`,
          backgroundRepeat: "repeat",
          backgroundPosition: "right",
          backgroundSize: "20%",
          minHeight: "20px",
        }}
      >
        <Modal.Title id="contained-modal-title-vcenter">
          <h1 className="bg-white pa1 ">CONGRATULATIONS!</h1>
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
            <h3>Bravo! You solved </h3>
            <h4>
              {props.score} out of {props.total}
            </h4>
            <h3>questions correctly!</h3>
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
        <Link to="/listquizes">
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

export class ShowQuiz extends Component {
  constructor(props) {
    super(props);
    this.state = {
      quiz: [],
      Fetching: true,
      checkedItems: [],
      equalItems: 0,
      modalShow: false,
      score: 0,
      AllGood: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async fetchData() {
    try {
      this.setState({ Fetching: true });
      console.log(this.props.location.query.value);
      console.log(this.props.match.url); // try with this for reloading page

      Axios.get(`/v1/${this.props.location.query.value}`).then((response) => {
        let { data } = response.data;
        this.setState({ quiz: data, Fetching: false });
      });
    } catch (err) {
      this.setState({ Fetching: false });
      console.log(err);
    }
  }

  componentDidMount = () => {
    this.setState({ Fetching: true });
    this.fetchData();
  };

  componentWillUnmount = () => {
    // this.setState({  });
  };

  handleSubmit(event) {
    const { checkedItems, modalShow } = this.state;
    const { q_and_a } = this.state.quiz;
    this.setState({ modalShow: true });

    if (checkedItems.length === q_and_a.length) {
      const currentScore = this.state.quiz.q_and_a.filter((ans) => {
        return this.state.checkedItems.includes(ans.correct) ? "correct" : null;
      });
      this.setState({ score: currentScore.length });
      console.log(this.state.score);
    } else {
      // morali bi ovdi stavit da
      console.log("nema jednak broj odgovora");
    }
    event.preventDefault();
  }

  handleChange(event) {
    let isChecked = event.target.checked;
    let odgovor = event.target.value;
    let name = event.target.name;
    let index = name.substring(name.length - 1, name.length);

    let myCheckbox = document.getElementsByName(`questionCheckbox${index}`);
    Array.prototype.forEach.call(myCheckbox, function (el) {
      el.checked = false;
    });
    event.target.checked = true;

    // 1. Make a shallow copy of the items
    let checkedItems = [...this.state.checkedItems];
    // 2. Make a shallow copy of the item you want to mutate
    let item = { ...checkedItems[index] };
    // 3. Replace the property you're intested in
    item = odgovor;
    // 4. Put it back into our array. N.B. we *are* mutating the array here, but that's why we made a copy first
    checkedItems[index] = item;
    // 5. Set the state to our new copy
    this.setState({ checkedItems: checkedItems });

    // if (isChecked === true) {
    //   this.setState((previous) => ({
    //     checkedItems: [...previous.checkedItems, odgovor],
    //   }));
    //   console.log(odgovor);
    // } else {
    //   let array = [...this.state.checkedItems];
    //   let index = array.indexOf(event.target.value);
    //   if (index !== -1) {
    //     array.splice(index, 1);
    //     this.setState({ checkedItems: array });
    //   }
    // }
    console.log(this.state.checkedItems);
  }

  setToFalse = () => {
    this.setState({ modalShow: false });
  };

  render() {
    const { Fetching } = this.state;
    const { score } = this.state;
    const { quiz } = this.state;

    if (Fetching === true) {
      return <div>Fetching Quiz...</div>;
    } else {
      let pitanja = quiz.q_and_a.map((varij, index) => {
        return (
          <OneCard
            key={index}
            varij={varij}
            index={index}
            handleChange={this.handleChange}
            selectOnlyThis={this.selectOnlyThis}
          />
        );
      });

      return (
        <div className="mv4">
          <div className="mv6 componentContainer">
            <div className="cardContainer">{pitanja}</div>
            <input
              type="button"
              className="f4 link dim br3 ph4 pv2 mv3 mb2 dib white bg-light-purple b--light-gray"
              value="Submit"
              onClick={this.handleSubmit}
            />
          </div>

          <Results
            score={score}
            total={quiz.q_and_a.length}
            show={this.state.modalShow}
            onHide={this.setToFalse}
          />
        </div>
      );
    }
  }
}
