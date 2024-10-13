import React, { useState, useEffect } from 'react';
import axios from 'axios';

function DeleteComment({id}) {

    const deleteComment = async () => {
        if (!window.confirm("Удалить этот комментарий?")) return;
        try {
        const response = await axios.delete('http://localhost:8000/api/delete-comment/'+id, {
            headers: {
                Authorization: `Token ${localStorage.getItem('auth_token')}`,
                'Content-Type':'application/json'
            }
          });
          console.log(response.data)
        } catch (error) { 
          console.error('Ошибка загрузки:', error);
        }
      };
    
  
    return (
      <>
          <input 
              type="button" 
              onClick={deleteComment} 
              value="Удалить"
          />
      </>
    );
}

export default DeleteComment;