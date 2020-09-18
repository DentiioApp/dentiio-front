import axios from 'axios'

const KEYWORDS =
  process.env.REACT_APP_BACK_API_URL + process.env.REACT_APP_KEYWORDS


 const fetchKeywords = (signal) => {
  const reponses = axios
    .get(KEYWORDS, { signal: signal })
    .then((res) => ({
      message: "OK",
      datas: res.data["hydra:member"],
    }))
    .catch((e) => JSON.stringify(e));
  return reponses;
};

export const tryKeywords = () => {
  const fetchDatas = fetchKeywords()

  if (fetchDatas.datas === undefined) {
    fetchDatas.datas = []
  }

  return fetchDatas
}


