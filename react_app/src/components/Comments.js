import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Comment from './Comment'
import AddComment from './AddComment';

function Comments ({ photo_id }){

    let [comments, setComments] = useState([])

      useEffect(() => {
        getComments();
    }, [])

    let getComments = () => {
      const response = axios.get('http://localhost:8000/api/comments/', {
            params: { 
              photo: photo_id,
             }
      }).then((response) => {
              setComments(response.data);
            })
      .catch((error) => {
        console.log(error);
      });
    }
    return (
        <div>
            {comments.map(comment => (
              <div key={comment.id}>
                <Comment key={comment.id} comment={comment} photo_id={photo_id}/>
                <AddComment photo_id={photo_id} text={"Ответить"} parent_id={comment.id}/>
              </div>
            ))}
        </div>
    );
};

export default Comments;