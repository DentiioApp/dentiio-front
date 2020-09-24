import axios from "axios";

const PATHOLOGIES =
  process.env.REACT_APP_BACK_API_URL + process.env.REACT_APP_PATHOLOGIES;

const fetchPathologiesData = () => {
  const reponses = axios
    .get(PATHOLOGIES)
    .then((res) => ({
      message: "OK",
      datas: res.data["hydra:member"],
    }))
    .catch((e) => JSON.stringify(e));
  return reponses;
};

export default fetchPathologiesData;
