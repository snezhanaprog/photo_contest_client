import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from 'react-modal';

function UpdatePhoto({id}) {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [image, setImage ] = useState();
  const [title, setTitle ] = useState("");
  const [description, setDescription] = useState("");
  const [newImage, setNewImage] = useState();

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

    useEffect(() => {
        getPhoto();
    }, [])

    let getPhoto = () => {
        axios.get(`http://localhost:8000/api/photo/`+id,{
          headers: {
            Authorization: `Token ${localStorage.getItem('auth_token')}`,
            'Content-Type':'application/json'
          }
        })
        .then((response) => {
          setImage(response.data['image']);
          setTitle(response.data['title'])
          setDescription(response.data['description'])
        })
        .catch((error) => {
          console.log(error);
        });
      }

    const updatePhoto = () => {
      try {
        const formData = new FormData();
        if (newImage) formData.append('image', newImage, newImage.name);
        formData.append('title', title);
        formData.append('description', description);
        
        const response = axios.put('http://localhost:8000/api/update-photo/'+id, formData, {
            headers: {
                Authorization: `Token ${localStorage.getItem('auth_token')}`,
                'Content-Type': 'multipart/form-data' 
            }
        });
        alert("Обновления загружены и отправлены на модерацию.")
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
            value="Редактировать фото"
        />
      <Modal 
        isOpen={modalIsOpen} 
        onRequestClose={closeModal}
        ariaHideApp={false}
      >
        <div>
            <p>При обновлении файла фотографии данные отпраляются на повторную модерацию!</p>
            <label>Название</label>
                <input type="text" value={title} onChange={(evt) => setTitle(evt.target.value)}/>
            <label>Описание</label>
                <input type="text" value={description} onChange={(evt) => setDescription(evt.target.value)}/>
            <img src={image}/>
            <label>Изображение</label>
                <input type="file" onChange={(evt) => setNewImage(evt.target.files[0])}/>
            <button onClick={updatePhoto}>Обновить</button>
            <button onClick={closeModal}>Закрыть</button>
        </div>
      </Modal>
    </>
  );
}

export default UpdatePhoto;