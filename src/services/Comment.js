import axios from "axios";
import jwtDecode from "jwt-decode";

const COMMENT =
  process.env.REACT_APP_BACK_API_URL + process.env.REACT_APP_COMMENT;

export const sendComments = (comment, clinicalCaseOmnipratique) => {
  const details = jwtDecode(localStorage.getItem("authToken"));
  const item = {
    comment: comment,
    createdAt: new Date().toISOString(),
    user: `/api/users/${details.userId}`,
    clinicalCase: null,
    clinicalCaseOmnipratique: clinicalCaseOmnipratique,
  };

  return axios
    .post(COMMENT, item)
    .then((res) => ({
      message: "OK",
      datas: res.data,
    }))
    .catch((e) => JSON.stringify(e));
};
