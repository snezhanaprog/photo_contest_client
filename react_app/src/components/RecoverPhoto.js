import React, { useEffect } from 'react';
import axios from 'axios';

function RecoverPhoto({id}) {

    useEffect(() => {
    }, [])

    const recoverPhoto = async () => {
      try {
        const response = await axios.post(`http://localhost:8000/api/recover-photo/${id}/`, {}, {
            headers: {
                Authorization: `Token ${localStorage.getItem('auth_token')}`,
                'Content-Type': 'application/json' 
            }
        });
        console.log(response)
        alert("Фотография отправлена на повторную модерацию.")
      } catch (error) { 
        console.error('Ошибка:', error);
      }
    };
  
    const question = () => {
        const result = window.confirm("Вы уверены что хотите восстановить фото?");
        if (result) recoverPhoto();
    }

  return (
        <input 
            type="button" 
            onClick={question} 
            value="Восстановить фото"
        />
  );
}

export default RecoverPhoto;