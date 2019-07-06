import axios from "axios";

const baseURL = process.env.REACT_APP_API_URL;

const api = axios.create({
  baseURL,
  headers: {}
});


export default class SchubertApi {
  constructor(token) {
    this.token = token;
  }                                

  //Generic requests
  fetchData = (endpoint, params) => {
    api.defaults.headers.common["Authorization"] = this.token;
    return api
      .get(endpoint, params)
      .then(response => {
        return response;
      })
      .catch(err => {
        throw new Error(err.response);
      });
  };

  createData = ({ endpoint, params }) => {
    api.defaults.headers.common["Authorization"] = this.token;
    return api
      .post(endpoint, params)
      .then(response => {
        return response;
      })
      .catch(err => {
        throw new Error(err.response);
      });
  };

  //Generic request with Query string parameters
  /*
  fetchDataQS = ({ endpoint, params }) => {
    const paramsQs = qs.stringify(params);
    return api
      .get(`${endpoint}?${paramsQs}`)
      .then(response => {
        return response;
      })
      .catch(err => {
        return console.log(err.response);
      });
  };*/
}
