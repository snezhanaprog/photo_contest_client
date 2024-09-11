import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Voice({photo_id}) {
  const [statusVoice, setStatusVoice] = useState(false);

    useEffect(() => {
        getStatusVoice();
    }, [])

    const getStatusVoice = async () => {
        try {  
        const response = await axios.post('http://localhost:8000/api/status-voice/',
            {
                photo_id: photo_id
            },
            {
                headers: {
                    Authorization: `Token ${localStorage.getItem('auth_token')}`,
                }
            });
        setStatusVoice(response.data['success'])
      } catch (error) { console.error('Ошибка загрузки:', error);}
    };
  
    const changeStatusVoice = async () => {
        try {  
          const response = await axios.post('http://localhost:8000/api/change-voice/',
            {
                photo_id: photo_id,
                status: statusVoice
            },
            {
                headers: {
                    Authorization: `Token ${localStorage.getItem('auth_token')}`,
                }
            });
          setStatusVoice(!statusVoice);
        } catch (error) { console.error('Ошибка загрузки:', error);}
      };

  return (
    <>
        <input 
        type="button" 
        onClick={changeStatusVoice} 
        value={statusVoice ? "Убрать лайк" : "Поставить лайк"} 
        />
    </>
  );
}

export default Voice;