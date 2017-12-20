import axios from 'axios'

// All this info came from here: https://alligator.io/vuejs/uploading-vue-picture-input/
export default function (url, file, jwt, name = 'avatar') {
  if (typeof url !== 'string') {
    throw new TypeError(`Expected a string, got ${typeof url}`)
  }

  // You can add checks to ensure the url is valid, if you wish

  const formData = new FormData()
  formData.append(name, file)
  const config = {
    headers: {
      'content-type': 'multipart/form-data',
      Authorization: `Bearer ${jwt}`
    }
  }
  return axios.post(url, formData, config)
}
