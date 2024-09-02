import React, { useState, useEffect } from 'react';
import axios from 'axios';

function PhotoList() {
  let [photos, setPhotos] = useState([])

  useEffect(() => {
        getPhotos()
    }, [])

  let getPhotos = () => {
      axios.get('http://localhost:8000/api/photos/')
      .then((response) => {
        console.log(response.data);
        setPhotos(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
    }

  return (
    <>
      <h1>Все фото</h1>
        <div>
            {photos.map((photo, index) => (
                    <p>{photo.title}</p>
            ))}
        </div>
    </>
  );
}

export default PhotoList;