import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Voice({photo_id, is_liked}) {
  const [statusVoice, setStatusVoice] = useState(is_liked);

    useEffect(() => {
      console.log(is_liked)
      setStatusVoice(is_liked)
    }, [is_liked])

    const changeStatusVoice = async () => {
      let urlPart = statusVoice ? "delete-voice" : "create-voice"; 
        try {  
          const response = await axios.post(`http://localhost:8000/api/${urlPart}/`,
            {
                photo_id: photo_id,
            },
            {
                headers: {
                    Authorization: `Token ${localStorage.getItem('auth_token')}`,
                }
            });
          setStatusVoice( response.status == 200 ? true : false);
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