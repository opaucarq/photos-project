import { useEffect, useRef, useState } from 'react'

import GridPhotos from './components/GridPhotos';

import { postData, getImages } from './services/service-image';

function App() {
  const [data, setData] = useState([]);
  const imagesRef = useRef([])

  const handleUpload = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("post[title]","Test")
    for (let i= 0; i< imagesRef.current.files.length;i++){
      formData.append("post[images][]", imagesRef.current.files[i])
    }
    postData(formData).then(() => {
      fetchData(); 
      imagesRef.current.value = "";
    });
  }

  const fetchData = () => {
    getImages()
      .then((data) => {        
        console.log(data)

        setData(data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchData();
  }, []);
  
  return (
    <>
      <div className='App'>
        <form action=''>
          <input type='file' name='image' multiple ref={imagesRef}  required/>
          <button type='button' onClick={handleUpload}>
            Submit
          </button>
        </form>

        <hr />
        <div>
          <GridPhotos data={data}/>
        </div>
      </div>
    </>
  );
}

export default App
