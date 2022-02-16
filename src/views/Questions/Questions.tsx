import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import Typography from "@mui/material/Typography";

const Questions = () => {
  const { state } = useLocation();
  const [userData, setUserData] =
    useState<{ user: string; difficulty: string }>();
  const [questions, setQuestions] = useState<any[]>([]);
  const [questionNumber, setQuestionNumber] = useState(0);
  const prizes = [10000, 9000, 8000, 7000, 6000, 5000, 4000, 3000, 2000, 1000];
  const options2 = { currency: "USD" };
  const numberFormat2 = new Intl.NumberFormat("en-US", options2);

  useEffect(() => {
    const data: any = state;
    setUserData(data);
    axios
      .get(
        `https://opentdb.com/api.php?amount=10&category=${data.category}&difficulty=${data.difficulty}&type=multiple`
      )
      .then((res) => {
        setQuestions(res.data.results);
        console.log(res.data.results);
      });
  }, []);

  return (
    <div className="vh-100">
      <div
        className="d-flex justify-content-between border-bottom border-dark p-2"
        style={{ height: "8%" }}
      >
        <Typography variant="h5" component="div">
          Player Name: {userData?.user}
        </Typography>
        <Typography variant="h5" component="div">
          Difficulty: {userData?.difficulty}
        </Typography>
        <Typography variant="h5" component="div">
          Earnings: 0$
        </Typography>
      </div>
      <div className="row m-0" style={{ height: "92%" }}>
        <div className="col-9">
          {
            <Typography variant="h6" component="div">
              {questionNumber !== undefined && questions.length > 0
                ? questions[questionNumber].question.replace(/&quot;/g, '"')
                : "This category does not have questions, please return to the previous screen and select another difficulty or category"}
            </Typography>
          }
        </div>
        <div className="col-3 p-5 border-start border-dark">
          {prizes.map((prize, index, prizes) => (
            <Typography variant="h5" component="div">
              {`${prizes.length - index} $${numberFormat2.format(prize)}`}
            </Typography>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Questions;
