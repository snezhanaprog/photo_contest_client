import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from 'react-modal';

function UploadPhoto() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [image, setImage ] = useState();
  const [title, setTitle ] = useState("");
  const [description, setDescription] = useState("");

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };


    useEffect(() => {
    }, [])

    const uploadPhoto = async () => {
      try {
        const formData = new FormData();
        formData.append('image', image, image.name);
        formData.append('title', title);
        formData.append('description', description);
        
        const response = await axios.post('http://localhost:8000/api/upload-photo/', formData, {
            headers: {
                Authorization: `Token ${localStorage.getItem('auth_token')}`,
                'Content-Type': 'multipart/form-data' 
            }
        });
        console.log(response.data)
        alert("Фотография загружена и отправлена на модерацию.")
        closeModal();
      } catch (error) { console.error('Ошибка загрузки:', error);}
    };
  

  return (
    <>
        <input 
            type="button" 
            onClick={openModal} 
            value="Загрузить фото"
        />
      <Modal 
        isOpen={modalIsOpen} 
        onRequestClose={closeModal}
        ariaHideApp={false}
      >
        <div>
            <label>Название</label>
                <input type="text" value={title} onChange={(evt) => setTitle(evt.target.value)}/>
            <label>Описание</label>
                <input type="text" value={description} onChange={(evt) => setDescription(evt.target.value)}/>
            <label>Изображение</label>
                <input type="file" onChange={(evt) => setImage(evt.target.files[0])}/>
            <button onClick={uploadPhoto}>Добавить</button>
            <button onClick={closeModal}>Закрыть</button>
        </div>
      </Modal>
    </>
  );
}

export default UploadPhoto;