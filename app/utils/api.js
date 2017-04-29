import axios from 'axios'


function responseHandler(response) {
  const data = response.data
  
  if (!data.info.ok) {
    return Promise.reject(data.msg)
  }

  return data.data
}

/**
 * get
 *
 * @param {String} url - request url
 * @param {Object} options - request options
 */
export function get(url, options = {}) {
  return axios.get(url, options)
    .then(responseHandler)
}

/**
 * post
 *
 * @param {String} url - request url
 * @param {Object} data - request data, JSON object
 * @param {Object} options - request options
 */
export function post(url, data, options = {}) {
  // Since backend only support form data post,
  // we always convert data to `application/x-www-form-urlencoded format`
  return axios.post(url, data, options)
    .then(responseHandler)
}

