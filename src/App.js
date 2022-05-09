import "./App.css";
import React, { useState, useEffect } from "react";
import {
  Outlet,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
import axios from "axios";

import Dashboard from "./pages/dashboard/Dashboard";
import Trivia from "./pages/trivia/Trivia";
import Results from "./pages/results/Results";
import Error from "./pages/error/Error";

function App() {
  const sessionTokenURL = "https://opentdb.com/api_token.php?command=request";
  const categoryURL = "https://opentdb.com/api_category.php";

  const [sessionToken, setSessionToken] = useState(
    sessionStorage.getItem("sessionToken") || ""
  );

  const [categoriesData, setCategoriesData] = useState();
  const [triviaData, setTriviaData] = useState();
  const [responseCode, setResponseCode] = useState(null);

  const [score, setScore] = useState(0);
  const location = useLocation();
  const navigate = useNavigate();

  const [questionParameters, setQuestionParameters] = useState({
    amount: 6,
    category: { id: 9, name: "General Knowledge" },
    difficulty: "medium",
    type: "multiple",
  });

  useEffect(() => {
    if (location.pathname === "/") {
      navigate("/home");
    }
  }, [location.pathname, navigate]);

  useEffect(() => {
    if (!sessionToken) {
      axios.get(sessionTokenURL).then((res) => {
        setSessionToken(res.data.token);
        sessionStorage.setItem("sessionToken", res.data.token);
      });
    }

    axios.get(categoryURL).then((res) => {
      setCategoriesData(res.data.trivia_categories);
    });
  }, [sessionToken]);

  function handleChange(event) {
    setQuestionParameters((prevQuestionParamenters) => {
      return {
        ...prevQuestionParamenters,
        [event.target.name]: event.target.value,
      };
    });
  }

  function handleNewGame() {
    setScore(0);
    setTriviaData(null);
    navigate("/");
  }

  async function startQuiz(event) {
    event.preventDefault();
    await axios
      .get(
        `https://opentdb.com/api.php?amount=${
          questionParameters.amount
        }&category=${
          typeof questionParameters.category === "object"
            ? questionParameters.category.id
            : questionParameters.category
        }&difficulty=${questionParameters.difficulty}&type=${
          questionParameters.type
        }&token=${sessionToken}&encode=base64`
      )
      .then((res) => {
        setTriviaData(res.data.results);
        setResponseCode(res.data.response_code);
        if (res.data.response_code !== 0) {
          navigate("/error");
        } else {
          navigate("/trivia");
        }
      });
  }

  return (
    <div className="app__wrapper">
      <div className="app__wrapper__content">
        <Routes>
          <Route path="/" element={<Outlet />}>
            <Route
              path="/home"
              element={
                <Dashboard
                  questionParameters={questionParameters}
                  categoriesData={categoriesData}
                  handleChange={handleChange}
                  startQuiz={startQuiz}
                />
              }
            />
            <Route
              path="/error"
              element={
                <Error
                  responseCode={responseCode}
                  setResponseCode={setResponseCode}
                />
              }
            />

            <Route
              path="/trivia"
              element={
                <Trivia
                  triviaData={triviaData}
                  score={score}
                  setScore={setScore}
                  handleNewGame={handleNewGame}
                />
              }
            />
            <Route
              path="/results"
              element={
                <Results
                  score={score}
                  setScore={setScore}
                  setTriviaData={setTriviaData}
                  triviaData={triviaData}
                />
              }
            />
          </Route>
          <Route path="*" element={<Error />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
