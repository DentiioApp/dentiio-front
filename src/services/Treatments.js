import axios from "axios";

const TREATMENTS =
  process.env.REACT_APP_BACK_API_URL + process.env.REACT_APP_TREATMENTS;

const fetchTreatmentsData = () => {
  const reponses = axios
    .get(TREATMENTS)
    .then((res) => ({
      message: "OK",
      datas: res.data["hydra:member"],
    }))

      .catch((e) => JSON.stringify(e));
  return reponses;
};
export default fetchTreatmentsData;
