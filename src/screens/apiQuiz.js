import axios from "axios";
import { useState,useEffect } from "react";



const [data, setData] = useState([]);
console.log(data);
const ApiData = () => {
  axios
    .get(
      "https://the-trivia-api.com/api/questions?categories=general_knowledge&limit=20&difficulty=hard"
    )
    .then((succ) => {
      console.log(succ.data);
      setData(succ.data);
    })
    .catch((err) => {
      console.log(err);
    });
};

useEffect(() => {
  apiData();
}, []);

return data.map((e, i) => {
  return (
    <div>
      <p>{e.category}</p>
      <p>{e.question}</p>
    </div>
  );
});

export default ApiData