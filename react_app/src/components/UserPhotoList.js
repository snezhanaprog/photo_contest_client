import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import PhotoDetail from '../pages/PhotoDetail';

function UserPhotoList() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedPhotoId, setSelectedPhotoId] = useState(null);
  const [photos, setPhotos] = useState([]);
  const [status, setStatus] = useState("public");

  const openModal = (id) => {
    setSelectedPhotoId(id);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedPhotoId(null);
  };

  const selectedPhoto = photos.find(photo => photo.id === selectedPhotoId);

    useEffect(() => {
      getUserPhoto()
    }, [status])

    const getUserPhoto = async () => {
      try {
        console.log(`Token ${localStorage.getItem('auth_token')}`)
        const response = await axios.get('http://localhost:8000/api/users-photos', {
          headers: {
            Authorization: `Token ${localStorage.getItem('auth_token')}`,
            'Content-Type':'application/json'
          },
          params: { 
            status: status
           }
        });
        console.log(response.data)
        setPhotos(response.data);
      } catch (error) { console.error('Ошибка загрузки:', error);}
    };
  

  return (
    <>
        <div>
            <input 
            type="button" 
            onClick={() => setStatus("public")} 
            value="Опубликованные"
            />

            <input 
            type="button" 
            onClick={() => setStatus("deleted")} 
            value="В корзине"
            />

            <input 
            type="button" 
            onClick={() => setStatus("private")} 
            value="На модерации"
            />

            <input 
            type="button" 
            onClick={() => setStatus()} 
            value="Все" 
            />
        </div>
    <div>
      {photos.length === 0 ? (
        <p>Нет фотографий для отображения.</p>
      ) : (
        photos.map(photo => (
          <div key={photo.id}>
            <button onClick={() => openModal(photo.id)}>{photo.title}</button>
            <img src={photo.image} alt={photo.title} />
            <p>{photo.description}</p>
          </div>
        ))
      )}
      <Modal 
        isOpen={modalIsOpen} 
        onRequestClose={closeModal}
        ariaHideApp={false}
      >
        {selectedPhoto && (
          <div>
            <PhotoDetail id={selectedPhotoId} />
            <button onClick={closeModal}>Закрыть</button>
          </div>
        )}
      </Modal>
    </div>
    </>
  );
}

export default UserPhotoList;