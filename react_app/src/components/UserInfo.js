import React, { useState, useEffect } from 'react';
import axios from 'axios';

function UserInfo() {

    const [info, setInfo] = useState({
      'user':{
        'username': ""
      }
    });

     useEffect(() => {
      getUser()
    }, [])

    const getUser = async () => {
      try {
        console.log(`Token ${localStorage.getItem('auth_token')}`)
        const response = await axios.get('http://localhost:8000/api/user-info', {
          headers: {
            Authorization: `Token ${localStorage.getItem('auth_token')}`,
            'Content-Type':'application/json'
          }
        });
        setInfo(response.data);
        console.log(response.data)
        console.log(info)
      } catch (error) { console.error('Ошибка загрузки:', error);}
    };
  

  return (
    <>
        <div>

            <p>{info.user.username}</p>

        </div>
    </>
  );
}

export default UserInfo;