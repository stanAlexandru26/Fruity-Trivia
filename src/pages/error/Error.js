import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/Button";
import Header from "../../components/Header";
import "./Error.css";

export default function Error({ responseCode, setResponseCode }) {
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (responseCode === 0) {
      setErrorMessage("Everything should be fine!");
    }
    if (responseCode === 1) {
      setErrorMessage("There are not enoughs questions in the database!");
    }
    if (responseCode === 2) {
      setErrorMessage("Search criteria contains a invalid value! Try again!");
    }
    if (responseCode === 3) {
      setErrorMessage(
        "Session Token does not exist.Please close the browser and reopen Fruitty Trivia!"
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
    navigate("/home");
  }

  return (
    <div className="error">
      <Header className="error__code">
        {responseCode
          ? `Error code:${responseCode}`
          : "Sorry that page doesn't exist"}
      </Header>
      {errorMessage && <h2 className="error__message">{errorMessage}</h2>}
      <Button className="error__button" onClick={handleError}>
        Go back
      </Button>
    </div>
  );
}
