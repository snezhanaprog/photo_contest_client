import React, { useState, useEffect } from 'react';

function SortPhotoList({ sortPhotos, onSortChange }) {

     useEffect(() => {
    }, [])

    const sortPublicatedAt = () => {
        onSortChange(state => {
          const newState = !sortPhotos.publicatedAt.active 
            ? { active: true, up: true }
            : { active: true, up: !sortPhotos.publicatedAt.up };
          return { 
            ...sortPhotos, 
            publicatedAt: newState, 
            comments: { active: false, up: true }, 
            voices: { active: false, up: true } 
          };
        });
      };

      const sortComments = () => {
        onSortChange(state => {
            const newState = !sortPhotos.comments.active 
                ? { active: true, up: true }
                : { active: true, up: !sortPhotos.comments.up };
          
            return { 
                ...sortPhotos, 
                comments: newState, 
                publicatedAt: { active: false, up: true }, 
                voices: { active: false, up: true } 
            };
        });
    };

      const sortVoices = () => {
        onSortChange(state => {
          const newState = !sortPhotos.voices.active 
            ? { active: true, up: true }
            : { active: true, up: !sortPhotos.voices.up };
          
          return { 
            ...sortPhotos, 
            voices: newState, 
            publicatedAt: { active: false, up: true }, 
            comments: { active: false, up: true } 
          };
        });
      };


      const resetSorting = () => {
        onSortChange({ 
          publicatedAt: { active: false, up: true }, 
          comments: { active: false, up: true }, 
          voices: { active: false, up: true } 
        });
      };
    

  return (
    <>
        <div>
            <input 
            type="button" 
            onClick={sortPublicatedAt} 
            value={sortPhotos.publicatedAt.up ? "По дате публикации (вверх)" : "По дате публикации (вниз)"} 
            />

            <input 
            type="button" 
            onClick={sortComments} 
            value={sortPhotos.comments.up ? "По количеству комментариев (вверх)" : "По количеству комментариев (вниз)"} 
            />

            <input 
            type="button" 
            onClick={sortVoices} 
            value={sortPhotos.voices.up ? "По количеству голосов (вверх)" : "По количеству голосов (вниз)"} 
            />

            <input 
            type="button" 
            onClick={resetSorting} 
            value="Сбросить" 
            />
        </div>

    </>
  );
}

export default SortPhotoList;