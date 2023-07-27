import { useState } from 'react'
import './App.css'
import { useRef } from 'react';

const API_URL = "http://localhost:3000"

function App() {
  const [images, setImages] = useState([]);
  const imagesRef = useRef([])
  const postToGet = useRef(1)

  const handleUpload = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("post[title]","Test")
    for (let i= 0; i< imagesRef.current.files.length;i++){
      formData.append("post[images][]", imagesRef.current.files[i])
    }
    postData(formData)
  }

const postData = (formData) => {
  fetch(`${API_URL}/posts`,{
    method: "POST",
    body: formData,
  })
  .then((res) => res.json())
  .then((data) => {
    console.log(data);
    getImages();
  })
  .catch((err) => console.log(err))
}

const getImages = () => {
  fetch(`${API_URL}/posts/${postToGet.current.value}`)
  .then((res) => res.json())
  .then((data) => {
    console.log(data);
    setImages(data.images);
  })
  .catch((err) => console.log(err))
}

  return (
    <>
      <div className='App'>
        <form action="">
          <input type="file" name="image" multiple ref={imagesRef} />
          <button type='button' onClick={handleUpload}>
            Submit
          </button>
        </form>
        <div>
          <input type="numer" ref={postToGet} placeholder="ID to retrieve"/>
          <button onClick={getImages}>GetImages</button>
        </div>

        <div className='images'>
          {images.map((image,index) => (
            <img 
              key={index}
              src={image}
              alt="uploades"
              style={{width:"200px", height: "200px"}}
            />
          ))}
        </div>
        
      </div>

    </>
  )
}

export default App
