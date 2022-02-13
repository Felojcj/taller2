import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import Typography from "@mui/material/Typography";

const Questions = () => {
  const { state } = useLocation();
  const [userData, setUserData] = useState<{user: string, difficulty:string}>();

  useEffect(() => {
    const data: any = state;
    setUserData(data)
    if (data.difficulty !== "Any Difficulty") {
      axios
        .get(
          `https://opentdb.com/api.php?amount=10&category=${data.categorie}&difficulty=${data.difficulty}`
        )
        .then((res) => {
          console.log(res.data.results);
        });
    } else {
      axios
        .get(`https://opentdb.com/api.php?amount=10&category=${data.categorie}`)
        .then((res) => {
          console.log(res.data.results);
        });
    }
  }, []);

  return (
    <div>
      <div className="d-flex justify-content-between border border-dark p-2">
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
    </div>
  );
};

export default Questions;
