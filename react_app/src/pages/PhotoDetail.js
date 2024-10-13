import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Comments from '../components/Comments';
import Voice from '../components/Voice';
import AddComment from '../components/AddComment';
import UpdatePhoto from '../components/UpdatePhoto';
import DeletePhoto from '../components/DeletePhoto';
import RecoverPhoto from '../components/RecoverPhoto';

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
    'author':'',
    'is_liked':'',
    'is_change':'',
    'status':''
  })


  useEffect(() => {
        getPhoto()
    }, [])


    let getPhoto = () => {
      let headersData = {}
      if (localStorage.getItem('auth_token')){
        headersData={
        Authorization: `Token ${localStorage.getItem('auth_token')}`,
        'Content-Type':'application/json'
      }}
      axios.get(`http://localhost:8000/api/photo/`+id, {headers: headersData})
      .then((response) => {
        setPhoto(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
    }


  return (
    <>
        <>
        { photo.is_change ? (
          <>
            <UpdatePhoto id={photo.id}/>
            <DeletePhoto id={photo.id}/>
            { photo.status == "deleted" ? (<RecoverPhoto id={photo.id}/>):(<></>)}
          </>
        ):(<></>)}
          <h1>{photo.title}</h1>
            <div>
              <p>{photo.description}</p>
              <p>{photo.author}</p>
              <p>{photo.count_comments}, {photo.count_voices}</p>
              <p>{photo.publicated_at}</p>
            </div>
        {authenticated ? (
          <>
            <Voice photo_id={id} is_liked={photo.is_liked}/>
            <AddComment photo_id={id} text={"Добавить комментарий"}/>
          </>
        ):(<></>)}
          <Comments photo_id={id}/>
        </>
    </>
  );
}

export default PhotoDetail;