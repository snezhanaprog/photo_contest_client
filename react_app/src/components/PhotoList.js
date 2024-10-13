import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Modal from 'react-modal';
import PhotoDetail from '../pages/PhotoDetail';

function PhotoList({ photos }) {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedPhotoId, setSelectedPhotoId] = useState(null);

  const openModal = (id) => {
    setSelectedPhotoId(id);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedPhotoId(null);
  };

  const selectedPhoto = photos.find(photo => photo.id === selectedPhotoId);

  return (
    <div className='row justify-content-center'>
      {photos.length === 0 ? (
        <p>Нет фотографий для отображения.</p>
      ) : (
        photos.map(photo => (
          <div key={photo.id} className="card p-4 m-3 col-3">
            <button onClick={() => openModal(photo.id)} className="card-title">{photo.title}</button>
            <img src={photo.image} alt={photo.title} className='card-image-top'/>
            <p className='card-text'>{photo.description}</p>
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
  );
}

export default PhotoList;