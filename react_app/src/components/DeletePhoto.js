import React, { useEffect } from 'react';
import axios from 'axios';

function DeletePhoto({id}) {

    useEffect(() => {
    }, [])

    const deletePhoto = async () => {
      try {
        const response = await axios.delete(`http://localhost:8000/api/delete-photo/${id}/`, {
            headers: {
                Authorization: `Token ${localStorage.getItem('auth_token')}`,
                'Content-Type': 'application/json' 
            }
        });
        console.log(response)
        alert("Фотография отправлена в корзину.")
      } catch (error) { 
        console.error('Ошибка:', error);
      }
    };
  
    const question = () => {
        const result = window.confirm("Вы уверены что хотите удалить фото?");
        if (result) deletePhoto();
    }

  return (
        <input 
            type="button" 
            onClick={question} 
            value="Удалить фото"
        />
  );
}

export default DeletePhoto;