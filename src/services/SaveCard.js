import axios from 'axios'
//import {ftpClient} from 'basic-ftp'
import CP  from 'child_process'
const USERS = process.env.REACT_APP_BACK_API_URL + process.env.REACT_APP_USERS

const config = {
  host: process.env.REACT_APP_FTP_HOST,
  user: process.env.REACT_APP_FTP_USER,
  password: process.env.REACT_APP_FTP_PASSWORD,
  secure: true
}

const sendFtp = (data) =>{
  //const FTP = ftpClient.Client();
  //FTP.ftp.verbose = true
  //FTP.access(config)
  //FTP.uploadFrom("../README.md", "README_FTP.md")
   
  //FTP.close()


  var spawn = CP.spawn
  var process = spawn('python',["../hello.py", config] ); 
  console.log('process :', process)
    // Takes stdout data from script which executed 
    // with arguments and send this data to res object 
    process.stdout.on('data', function(data) { 
        console.log(data.toString()); 
    } ) 
}

export const SaveCard = (userData) => {
  //sendFtp(userData)
  return axios.put(USERS, userData)
    .then(res => res.statusText)
    .catch(console.warning)
}
