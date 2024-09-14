import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Comments from '../components/Comments';
import Voice from '../components/Voice';
import AddComment from '../components/AddComment';

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
        getPhoto()
    }, [])

  let getPhoto = () => {
    console.log({id})
      axios.get(`http://localhost:8000/api/photo/`+id,{
        headers: {
          Authorization: `Token ${localStorage.getItem('auth_token')}`,
          'Content-Type':'application/json'
        }
      })
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
        {authenticated ? (
        <Voice photo_id={id} is_liked={photo.is_liked}/>
        ):(
          <></>
        )}
          <AddComment photo_id={id} text={"Добавить комментарий"}/>
          <Comments photo_id={id}/>
        </>
    </>
  );
}

export default PhotoDetail;