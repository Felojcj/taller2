import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import Typography from "@mui/material/Typography";

const Questions = () => {
  const { state } = useLocation();
  const [userData, setUserData] =
    useState<{ user: string; difficulty: string }>();
  const prizes = [10000, 9000, 8000, 7000, 6000, 5000, 4000, 3000, 2000, 1000];
  const options2 = { currency: "USD" };
  const numberFormat2 = new Intl.NumberFormat("en-US", options2);

  useEffect(() => {
    const data: any = state;
    setUserData(data);
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
    <div className="vh-100">
      <div className="d-flex justify-content-between border-bottom border-dark p-2" style={{ height: "8%" }}>
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
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus
            architecto quae doloribus fugiat quas praesentium, repellat facere
            veniam neque asperiores laboriosam id consectetur velit numquam
            cumque iste a, deleniti magnam!
          </p>
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
