import axios from 'axios'

export const sendEmail = (email, pseudo) => {
  const item = {
    user_id: process.env.REACT_APP_EMAIL_USER_ID,
    service_id: process.env.REACT_APP_EMAIL_SERVICE_ID,
    template_id: process.env.REACT_APP_EMAIL_TEMPLATE_ID,
    template_params: {
      to_name: pseudo,
      to_mail: email
    }
  }
  const reponse = axios.post(process.env.REACT_APP_EMAIL_URL, item)
    .then((res) => (res))
    .catch((e) => JSON.stringify(e))
  return reponse
}
