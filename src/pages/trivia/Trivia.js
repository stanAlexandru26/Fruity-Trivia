import React, { useState, useEffect } from "react";
import Question from "../../components/Question/Question";

export default function Trivia({ triviaData, score, setScore, handleNewGame }) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [shuffledAnswersArray, setShuffledAnswersArray] = useState();

  useEffect(() => {
    setShuffledAnswersArray(
      triviaData &&
        handleShuffle([
          triviaData[currentQuestion]?.correct_answer,
          ...triviaData[currentQuestion]?.incorrect_answers,
        ])
    );
  }, [currentQuestion, triviaData]);

  const handleShuffle = (array) => {
    return array.sort(() => Math.random() - 0.5);
  };

  return (
    <>
      <Question
        triviaData={triviaData}
        score={score}
        setScore={setScore}
        currentQuestion={currentQuestion}
        shuffledAnswersArray={shuffledAnswersArray}
        setCurrentQuestion={setCurrentQuestion}
        handleNewGame={handleNewGame}
      />
    </>
  );
}
