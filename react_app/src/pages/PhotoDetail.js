import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Comments from '../components/Comments';
import Voice from '../components/Voice';

const isAuthenticated = () => {
  const token = localStorage.getItem('auth_token');
  return token !== null;
};


function PhotoDetail({id}) {
  const authenticated = isAuthenticated();
  let [photo, setPhoto] = useState({
    'title':'',
    'description':'',
    'publicated_at':'',
    'author':''
  })


  useEffect(() => {
        getPhotos()
    }, [])

  let getPhotos = () => {
      axios.get(`http://localhost:8000/api/photos/${id}/`)
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
        <>
          <h1>{photo.title}</h1>
            <div>
              <p>{photo.description}</p>
              <p>{photo.author}</p>
            </div>
        <Comments photo_id={id}/>
        {authenticated ? (
        <Voice photo_id={id}/>
        ):(
          <></>
        )}
        </>
    </>
  );
}

export default PhotoDetail;