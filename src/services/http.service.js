import axios from "axios";

const httpService = axios.create({
  headers: {
    "Content-type": "application/json",
  },
});

httpService.interceptors.response.use(
  (response) => {    
    console.log(response);
    return response;
  },
  (error) => {
    // loguear el error
    console.log("error en axios response ", error);
    return Promise.reject(error);
   
  }
);

export default httpService;
