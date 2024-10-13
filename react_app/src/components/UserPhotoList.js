import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import PhotoDetail from '../pages/PhotoDetail';
import UpdatePhoto from './UpdatePhoto';
import PhotoList from './PhotoList';

function UserPhotoList() {
  const [photos, setPhotos] = useState([]);
  const [status, setStatus] = useState("public");
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState({ page: 1, total_pages: 1 });

    useEffect(() => {
      getUserPhoto()
    }, [status, page])

    const getUserPhoto = async () => {
      try {

        const response = await axios.get('http://localhost:8000/api/users-photos', {
          headers: {
            Authorization: `Token ${localStorage.getItem('auth_token')}`,
            'Content-Type':'application/json'
          },
          params: { 
            status: status,
            current_page: page
           }
        });
        setPhotos(response.data['photos']);
        setPagination(response.data['pagination']);
        console.log(response)
      } catch (error) { console.error('Ошибка загрузки:', error);}
    };

  
    const handlePageChange = (num) => {
      setPage(num);
    };
  

  return (
    <>
        <div>
            <input type="button" onClick={() => setStatus("public")} value="Опубликованные"/>
            <input type="button" onClick={() => setStatus("deleted")} value="В корзине"/>
            <input type="button" onClick={() => setStatus("private")} value="На модерации"/>
        </div>
    <PhotoList photos={photos}/>
    <div>
        {Array.from({ length: pagination.total_pages }, (_, index) => (
          <button key={index + 1} onClick={() => handlePageChange(index + 1)}>
            {index + 1}
          </button>
        ))}
      </div>
    </>
  );
}

export default UserPhotoList;