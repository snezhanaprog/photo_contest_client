import React, { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';

function Comment ({ comment, photo_id }) {
    const [isOpen, setIsOpen] = useState(false);
    const [subComments, setSubComments] = useState([]);

    const toggleComments = () => {
        setIsOpen(prev => !prev);
    };

    useEffect(() => {
        getSubComments()
    }, [])

    let getSubComments = (parent_id) => {
        axios.get('http://localhost:8000/api/comments/', {
            params: { 
              parent: comment.id,
              photo: photo_id
             }
        }).then((response) => {
        setSubComments(response.data);
      }).catch((error) => {});
    }

    return (
        <div>
            <div>
                <strong>{comment.id}{comment.author}: {comment.content}</strong>
                {subComments.length > 0 && (
                    <button onClick={toggleComments}>
                        {isOpen ? 'Скрыть комментарии' : 'Показать комментарии'}
                    </button>
                )}
            </div>
            {isOpen && subComments && subComments.map(comment => (
                <Comment key={comment.id} comment={comment} photo_id={photo_id}/>
            ))}
        </div>
    );
};

export default Comment;