import React from "react";
import Button from "../../components/Button";
import Header from "../../components/Header";
import "./Dashboard.css";

export default function Dashboard({
  questionParameters,
  categoriesData,
  startQuiz,
  handleChange,
}) {
  return (
    <div className="dashboard">
      <Header className="dashboard_welcome">Welcome to Fruitty Trivia!</Header>
      <div>
        <form className="dashboard__form" onSubmit={startQuiz}>
          <div className="form__input">
            <label htmlFor="amount">Question Amount:</label>
            <input
              type="number"
              placeholder="How many questions?"
              onChange={handleChange}
              name="amount"
              value={questionParameters.amount}
              min="4"
              max="10"
              id="amount"
            />
          </div>
          <div className="form__input">
            <label htmlFor="category">Question Category:</label>
            <select
              type="text"
              placeholder="category"
              onChange={handleChange}
              name="category"
              value={questionParameters.category}
              id="category"
            >
              {categoriesData ? (
                categoriesData.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))
              ) : (
                <option>{questionParameters.category.name}</option>
              )}
            </select>
          </div>
          <div className="form__input">
            <label htmlFor="difficulty">Difficulty:</label>
            <select
              type="text"
              placeholder="difficulty"
              id="difficulty"
              onChange={handleChange}
              name="difficulty"
              value={questionParameters.difficulty}
            >
              <option value={"easy"}>Easy</option>
              <option value={"medium"}>Medium</option>
              <option value={"hard"}>Hard</option>
            </select>
          </div>

          <Button className="form__button" onClick={startQuiz}>
            Start Playing
          </Button>
        </form>
      </div>
    </div>
  );
}
