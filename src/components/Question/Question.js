import React from "react";
import "./Question.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Question({
  triviaData,
  score,
  setScore,
  currentQuestion,
  shuffledAnswersArray,
  setCurrentQuestion,
  handleNewGame,
}) {
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const handleSelect = (i) => {
    if (
      selectedAnswer === i &&
      selectedAnswer === triviaData[currentQuestion].correct_answer
    )
      return "select";
    else if (
      selectedAnswer === i &&
      selectedAnswer !== triviaData[currentQuestion].correct_answer
    )
      return "wrong";
    else if (i === triviaData[currentQuestion].correct_answer) return "select";
  };

  const handleAnswer = (answer) => {
    setSelectedAnswer(answer);
    setError(false);

    if (answer === triviaData[currentQuestion].correct_answer) {
      setScore(score + 1);
    }
  };

  const handleNextQuestion = () => {
    if (selectedAnswer === null) {
      setError(true);
    } else if (selectedAnswer !== null) {
      setError(false);
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
    }
    if (currentQuestion === triviaData.length - 1) {
      navigate("/results");
      setCurrentQuestion(0);
    }
  };

  return (
    <div className="question">
      <h2 className="question__question">
        {atob(triviaData[currentQuestion].question)}
      </h2>
      <div className="question__counter">
        <h3>
          Question {currentQuestion + 1} out of {triviaData.length}
        </h3>
        {error && <h3 className="queston__error">Please select a answer</h3>}
      </div>

      <div className="question__answer_array">
        {shuffledAnswersArray &&
          shuffledAnswersArray.map((answer, index) => (
            <button
              className={`answer  ${
                selectedAnswer && handleSelect(answer)
              } answer__${index} `}
              key={index}
              onClick={() => handleAnswer(answer)}
              disabled={selectedAnswer !== null}
            >
              {atob(answer)}
            </button>
          ))}
      </div>

      <div className="question__controls">
        <button className="question__controls--quit " onClick={handleNewGame}>
          Quit
        </button>
        <button onClick={handleNextQuestion}>
          {currentQuestion === triviaData.length - 1
            ? "Finish"
            : "Next Question"}
        </button>
      </div>
    </div>
  );
}
