import axios from "axios";

const JOBS = process.env.REACT_APP_BACK_API_URL + process.env.REACT_APP_JOBS;

export const fetchJobs = () => {
  let reponses = axios
    .get(JOBS)
    .then((res) => ({
      message: "OK",
      datas: res.data["hydra:member"],
    }))
    .catch((e) => JSON.stringify(e));

  return reponses;
};

export const tryJobs = () => {
  const fetchDatas = fetchJobs()

  if(fetchDatas.datas === undefined) {
    fetchDatas.datas = []
  }

  return fetchDatas
};
