import axios from 'axios';

export const CARD_STATUS = process.env.REACT_APP_BACK_API_URL + process.env.REACT_APP_CLINICAL_CASES

export const SaveCard = (user) => {
  return axios.post(CARD_STATUS, user)
    .then(res => res.statusText)
    .catch(console.warning)
}
