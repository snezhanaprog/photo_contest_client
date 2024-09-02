import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Photos(id) {
  let [photo, setPhoto] = useState([])

  useEffect(() => {
        getPhotos()
    }, [])

  let getPhotos = () => {
      axios.get('http://localhost:8000/api/photos/'+str(id))
      .then((response) => {
        console.log(response.data);
        setPhoto(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
    }

  return (
    <>
      <h1>photo.title</h1>
        <div>
            <p>photo.description</p>
            <p>photo.author</p>
        </div>
    </>
  );
}

export default Photos;