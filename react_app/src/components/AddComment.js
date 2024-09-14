import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from 'react-modal';

function AddComment({parent_id, photo_id, text}) {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [content, setContent ] = useState("");
  
    const openModal = () => {
      setModalIsOpen(true);
    };
  
    const closeModal = () => {
      setModalIsOpen(false);
    };
  
    const addComment = () => {
        try {
        const formData = new FormData();
        formData.append('content', content);
        formData.append('photo', photo_id);
        formData.append('parent', parent_id);
        const response = axios.post('http://localhost:8000/api/create-comment/', formData,{
            headers: {
                Authorization: `Token ${localStorage.getItem('auth_token')}`,
                'Content-Type': 'multipart/form-data' 
            }
          });
          console.log(response.data)
          alert("Сообщение отправлено")
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
              value={text}
          />
        <Modal 
          isOpen={modalIsOpen} 
          onRequestClose={closeModal}
          ariaHideApp={false}
        >
          <div>
              <label>Содержание</label>
                  <input type="text" value={content} onChange={(evt) => setContent(evt.target.value)}/>
              <button onClick={addComment}>Добавить</button>
              <button onClick={closeModal}>Закрыть</button>
          </div>
        </Modal>
      </>
    );
}

export default AddComment;