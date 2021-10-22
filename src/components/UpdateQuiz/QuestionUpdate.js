import React from "react";

const Question = ({
  currentQuestion,
  question,
  correct,
  checked1,
  checked2,
  checked3,
  checked4,
  answer1,
  answer2,
  answer3,
  answer4,
  handleChange,
  addValue,
}) => {
  if (currentQuestion > 5) return null;
  console.log(currentQuestion);

  return (
    <div className="pa2 black-80">
      <div className="pa2">
        <input
          className="bb f6 f5-l input-reset b--black-80 bg-white pa3 lh-solid w-100 w-75-m w-80-ns br2-ns br--left-ns"
          type="text"
          name="question"
          value={question}
          onChange={handleChange}
        />
      </div>
      {/* /////////////////////////////////// ANSWERS /////////////////////////////////// */}
      <h3>Update your Answers:</h3>
      <div className="pa2 center-row">
        <input
          className="bb f6 f5-l input-reset b--black-80 bg-white pa3 lh-solid w-60-m w-80-ns br2-ns br distance"
          type="text"
          name="answer1"
          value={answer1}
          onChange={handleChange}
        />
        <input
          type="checkbox"
          onChange={handleChange}
          name="correct"
          value={answer1}
          checked={checked1}
        />
      </div>

      <div className="pa2 center-row">
        <input
          className="bb f6 f5-l input-reset b--black-80 bg-white pa3 lh-solid w-60-m w-80-ns br2-ns br distance"
          type="text"
          name="answer2"
          value={answer2}
          onChange={handleChange}
        />
        <input
          type="checkbox"
          onChange={handleChange}
          name="correct"
          value={answer2}
          checked={checked2}
        />
      </div>

      <div className="pa2 center-row">
        <input
          className="bb f6 f5-l input-reset b--black-80 bg-white pa3 lh-solid w-60-m w-80-ns br2-ns br distance"
          type="text"
          name="answer3"
          value={answer3}
          onChange={handleChange}
        />
        <input
          type="checkbox"
          onChange={handleChange}
          name="correct"
          value={answer3}
          checked={checked3}
        />
      </div>

      <div className="pa2 center-row">
        <input
          className="bb f6 f5-l input-reset b--black-80 bg-white pa3 lh-solid w-60-m w-80-ns br2-ns br distance"
          type="text"
          name="answer4"
          value={answer4}
          onChange={handleChange}
        />
        <input
          type="checkbox"
          onChange={handleChange}
          name="correct"
          value={answer4}
          checked={checked4}
        />
      </div>
    </div>
  );
};

export default Question;
