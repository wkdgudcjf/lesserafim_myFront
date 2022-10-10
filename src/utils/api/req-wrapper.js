import axios from 'axios'
import { handle } from './res-handler'
import { getCookie} from './cookie'

const URI_PREPENDER = process.env.REACT_APP_EC2_URL
const wrap = (url) => `${URI_PREPENDER}${url}`
const appendAuth = (config) => {
  const token = getCookie(process.env.REACT_APP_USER_ID);
  if (!config) config = { headers: {} }
  if (token) {
    if (!config.headers) config.headers = {}
    config.headers.Authorization = `Bearer ${token}`
  }
  config.withCredentials = true
  return config
}

const appendAuthImage = (config) => {
  const token = getCookie(process.env.REACT_APP_USER_ID);
  if (!config) config = { headers: {} }
  if (token) {
    if (!config.headers) config.headers = {}
    config.headers.Authorization = `Bearer ${token}`
    config.headers.ContentType = `multipart/form-data`
  }
  config.withCredentials = true
  return config
}

export const get = (url, success, fail, config) => {
    axios.get(wrap(url), appendAuth(config))
      .then(handle(success))
      .catch(fail)
}
export const post = (url, body, success, fail, config) => {
    axios.post(wrap(url), body, appendAuth(config))
      .then(handle(success))
      .catch(fail)
}


export const getAsync = (url, success, fail, config) => {
  return axios.get(wrap(url), appendAuth(config));
}
export const postAsync = (url, body, success, fail, config) => {
   return axios.post(wrap(url), body, appendAuth(config),);
}

export const postImageAsync = (url, body, success, fail, config) => {
  axios.post(wrap(url), body, appendAuthImage(config))
  .then(handle(success))
  .catch(fail);
}


