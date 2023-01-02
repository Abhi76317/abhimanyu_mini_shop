import { default as axi } from "axios";
import { isEmpty, isNull, values } from "lodash";
import { store } from '../redux/store'
import { showError } from "../redux/slice/alertSlice";
export const baseURL = process.env.REACT_APP_NODE_SERVER;

const axios = axi.create({
  baseURL: baseURL + "/api",
  withCredentials: "local" == 'production' ? true : false
});

axios.interceptors.request.use(function (config) {
  const token = store.getState().localUserState?.token;
  if (!isNull(token)) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, function (error) {
  return Promise.reject(error);
});

axios.interceptors.response.use(
  response => {
    const data = response.data;
    if (data.status == "error") {
      let errorMessage = data.message;
      if (errorMessage == "") {
        if (!isEmpty(data.errors)) {
          let erros = values(data.errors)
          errorMessage = erros.join(",")
        }
      }
      store.dispatch(showError({message:errorMessage}))
      return Promise.reject(data);
    }
    return data
  },
  (err) => {
    const { data } = err.response;
    let errorMessage = "Something went wrong!";
    if (!data.success) {
      errorMessage = data.message;
      if (!isEmpty(data.errors)) {
        let erros = values(data.errors)
        erros = erros.map((error) => {
          if ('message' in error) {
            return error.message;
          } else {
            return error
          }
        })
        errorMessage = erros.join(",")
      }
    }
    store.dispatch(showError({message:errorMessage}))
    return Promise.reject(data);
  }
);

export default axios;
