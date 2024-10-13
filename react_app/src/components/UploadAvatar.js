import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from 'react-modal';

function UploadAvatar() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [image, setImage ] = useState();

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

    useEffect(() => {
    }, [])

    const uploadAvatar = async () => {
      try {
        const formData = new FormData();
        formData.append('avatar', image, image.name);
        
        const response = await axios.post('http://localhost:8000/api/upload-avatar/', formData, {
            headers: {
                Authorization: `Token ${localStorage.getItem('auth_token')}`,
                'Content-Type': 'multipart/form-data' 
            }
        });
        console.log(response.data)
        alert("Фотография загружена")
        closeModal();
      } catch (error) { 
        console.error('Ошибка загрузки:', error);
        alert("Проверьте корректность полей и попробуйте снова.")
      }
    };
  

  return (
    <>
        <input 
            type="button" 
            onClick={openModal} 
            value="Загрузить аватар"
        />
      <Modal 
        isOpen={modalIsOpen} 
        onRequestClose={closeModal}
        ariaHideApp={false}
      >
        <div>
            <label>Аватар</label>
                <input type="file" onChange={(evt) => setImage(evt.target.files[0])}/>
            <button onClick={uploadAvatar}>Загрузить</button>
            <button onClick={closeModal}>Закрыть</button>
        </div>
      </Modal>
    </>
  );
}

export default UploadAvatar;