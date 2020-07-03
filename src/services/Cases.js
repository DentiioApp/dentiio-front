import axios from "axios";

const CLINICAL_CASES =
  process.env.REACT_APP_BACK_API_URL + process.env.REACT_APP_CLINICAL_CASES;

export const fetchCases = (signal) => {
  const reponses = axios
    .get(CLINICAL_CASES, { signal: signal })
    .then((res) => ({
      message: "OK",
      datas: res.data["hydra:member"],
    }))
    .catch((e) => JSON.stringify(e));
  return reponses;
};

export const tryCases = () => {
  const fetchDatas = fetchCases();

  if (fetchDatas.datas === undefined) {
    fetchDatas.datas = [];
  }

  return fetchDatas;
};



export const addFavCase = (oItem) => {
  const reponses = axios
    .post(CLINICAL_CASES, { favorite: oItem })
    .then((res) => ({
      message: "OK",
      datas: res.data["hydra:member"],
    }))
    .catch((e) => JSON.stringify(e));
  return reponses;
}
