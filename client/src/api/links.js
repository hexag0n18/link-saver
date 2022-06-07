import axios from "axios"

const server = 'http://localhost:4000'

export const getLinksAPI = async () => await axios.get('/links')
export const getLinkAPI = async (id) => await axios.get('/links/' + id)
export const createLinkAPI = async (data) => {
  const form = new FormData()
  for (let key in data){
    form.append(key, data[key])
  }
  return await axios.post('/links', form, {
    headers: {
      "Content-Type": "multipart/form-data"
    }
  })
}
export const deleteLinkAPI = async (id) => await axios.delete('/links/' + id)
export const updateLinkAPI = async (id, data) => await axios.put('/links/' + id, data)