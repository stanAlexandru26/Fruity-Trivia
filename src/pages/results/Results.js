import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Confetti from "react-confetti";
import "./Results.css";
import Button from "../../components/Button";

export default function Results({
  score,
  setScore,
  setTriviaData,
  triviaData,
}) {
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    if (score === 0) {
      setMessage("You didn't get any questions right. Try again!");
    } else if (score === triviaData.length) {
      setMessage("Nice,You got all the questions right! Great job!");
    } else {
      setMessage(
        "You got " +
          score +
          " out of " +
          triviaData.length +
          " questions right. Keep trying!"
      );
    }
  }, [score, triviaData]);

  const handleNewGame = () => {
    setScore(0);
    setTriviaData(null);
    setMessage("");
    navigate("/");
  };

  return (
    <div className="results">
      {score === triviaData.length && (
        <Confetti width={window.innerWidth} height={window.innerHeight} />
      )}
      <h2 className="result__message">{message}</h2>

      <Button className="result__button" onClick={handleNewGame}>
        New Game
      </Button>
    </div>
  );
}
