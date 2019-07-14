import axios from "axios";
import { message } from "antd";

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
      .catch(errors => {
        this.handleHttpErros(errors.response)
      });
  };

  createData = (endpoint, params) => {
    api.defaults.headers.common["Authorization"] = this.token;
    return api
      .post(endpoint, params)
      .then(response => {
        return response;
      })
      .catch(errors => {
        this.handleHttpErros(errors.response)
      });
  };

  updateData = (endpoint, params) => {
    api.defaults.headers.common["Authorization"] = this.token;
    return api
      .put(endpoint, params)
      .then(response => {
        return response;
      })
      .catch(errors => {
        this.handleHttpErros(errors.response)
      });
  };

  handleHttpErros = (errors) => {
    switch(errors.status){
      case 400:
      case 500:
        message.error("Hubo un error y no se completo la solicitud");
      break;
      case 404:
        message.error("No se encontraron datos");
      break;
      default:
        message.warning("Sucedió un error desconocido y no se completo la solicitud")
    }
  }

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
