import React, { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import AddComment from './AddComment';
import DeleteComment from './DeleteComment';
import UpdateComment from './UpdateComment';

function Comment({ comment, photo_id }) {
    const [isOpen, setIsOpen] = useState(false);
    const [subComments, setSubComments] = useState([]);

    const toggleComments = () => {
        setIsOpen(prev => !prev);
    };

    useEffect(() => {
        getSubComments();
    }, []);

    const getSubComments = async () => {
        let headersData = {}
        if (localStorage.getItem('auth_token')){
          headersData={
          Authorization: `Token ${localStorage.getItem('auth_token')}`,
          'Content-Type':'application/json'
        }}
        try {
            const response = await axios.get('http://localhost:8000/api/comments/', {
                headers: headersData,
                params: { 
                    parent: comment.id,
                    photo_id: photo_id
                }
            });
            setSubComments(response.data);
        } catch (error) {
            console.error('Ошибка загрузки подкомментариев:', error);
        }
    };

    return (
        <div>
            <div>
                <strong>{comment.id} {comment.author}: {comment.content}</strong>
                {subComments.length !== 0 && (
                    <button onClick={toggleComments}>
                        {isOpen ? 'Скрыть комментарии' : 'Показать комментарии'}
                    </button>
                )}
            </div>
            {isOpen && subComments && subComments.map(subComment => (
                <div key={subComment.id}>
                    <Comment comment={subComment} photo_id={photo_id} />
                    <AddComment photo_id={photo_id} text={"Ответить"} parent_id={subComment.id} />
                </div>
            ))}
            {comment.is_change && (
                <div>
                    <UpdateComment id={comment.id} />
                    <DeleteComment id={comment.id} />
                </div>
            )}
        </div>
    );
}

export default Comment;