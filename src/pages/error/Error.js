import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Error.css";

export default function Error({ responseCode, setResponseCode }) {
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (responseCode === 0) {
      setErrorMessage("Everithing should be fine!");
    }
    if (responseCode === 1) {
      setErrorMessage("There are not enought questions in the database!");
    }
    if (responseCode === 2) {
      setErrorMessage("Search criteria contains a invalid value! Try again!");
    }
    if (responseCode === 3) {
      setErrorMessage(
        "Session Token does not exist.Plase close the browser and reopen Fruitty Trivia!"
      );
    }
    if (responseCode === 4) {
      setErrorMessage(
        "You got all the questions from this category/difficulty combo, please try another combination!"
      );
    }
  }, [responseCode]);

  function handleError() {
    setResponseCode(null);
    navigate("/");
  }

  return (
    <div className="error">
      <h1 className="error__code">Error code: {`${responseCode}`}</h1>
      <h2 className="error__message">{errorMessage}</h2>
      <button className="error__button" onClick={handleError}>
        Go back
      </button>
    </div>
  );
}
