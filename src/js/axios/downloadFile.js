import axios from "axios";
import {basicAuth} from "./auth";

export const downloadFile = (urlFile, name) => {
  axios.get(`${urlFile}`,{
    headers: {
      'Content-Type': 'application/json'
    },
    responseType: 'blob',
    auth: {
      username: basicAuth.name,
      password: basicAuth.password
    }
  }).then((response) => {
    const href = URL.createObjectURL(response.data);
    const link = document.createElement('a');
    link.href = href;
    link.setAttribute('download', `${name}`); //or any other extension
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(href);
  }).catch(function (error) {
    console.log(error);
  })
}