import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from 'react-modal';

function UpdateComment({id}) {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [content, setContent ] = useState("");

    useEffect(() => {
    }, [])
  
    const openModal = () => {
      setModalIsOpen(true);
      getComment();
    };
  
    const closeModal = () => {
      setModalIsOpen(false);
    };

    const getComment = async () => {
        try {
        const response = await axios.get('http://localhost:8000/api/comment/'+id, {
            headers: {
                Authorization: `Token ${localStorage.getItem('auth_token')}`,
                'Content-Type':'application/json'
            }
          });
          setContent(response.data['content']);
        } catch (error) { 
          console.error('Ошибка загрузки:', error);
          alert("Проверьте корректность полей и попробуйте снова.")
        }
      };
  
    const updateComment = async () => {
        try {
        const formData = new FormData();
        formData.append('content', content);
        const response = await axios.put('http://localhost:8000/api/update-comment/'+id, formData,{
            headers: {
                Authorization: `Token ${localStorage.getItem('auth_token')}`,
                'Content-Type': 'multipart/form-data' 
            }
          });
          console.log(response.data)
          alert("Сообщение изменено")
          setContent("");
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
              value="Редактировать"
          />
        <Modal 
          isOpen={modalIsOpen} 
          onRequestClose={closeModal}
          ariaHideApp={false}
        >
          <div>
              <label>Содержание</label>
                  <input type="text" value={content} onChange={(evt) => setContent(evt.target.value)}/>
              <button onClick={updateComment}>Изменить</button>
              <button onClick={closeModal}>Закрыть</button>
          </div>
        </Modal>
      </>
    );
}

export default UpdateComment;