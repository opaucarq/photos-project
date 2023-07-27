import { API_URL } from "../../config";

export const postData = (formData) => {
  return fetch(`${API_URL}/posts`,{
    method: "POST",
    body: formData,
  })
  .then((res) => res.json())
  .then((data) => {
    console.log(data);
  })
  .catch((err) => console.log(err))
}

export const getImages = () => {
  // return fetch(`${API_URL}/posts/${postToGet.current.value}`)
  return fetch(`${API_URL}/posts`)
  .then((res) => res.json())
  .catch((err) => console.log(err))
}