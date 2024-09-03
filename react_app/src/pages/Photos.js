import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SortPhotoList from './components/SortPhotoList';
import PhotoList from './components/PhotoList';

function Photos() {
  const [photos, setPhotos] = useState([]);
  const [sortPhotos, setSortPhotos] = useState({ 
    publicatedAt: { active: false, up: true }, 
    comments: { active: false, up: true }, 
    voices: { active: false, up: true } 
  });
  const [searchQuery, setSearchQuery] = useState(""); 

  useEffect(() => {

    fetchPhotos();
  }, [sortPhotos, searchQuery]);

  const fetchPhotos = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/photos', {
        params: { 
          sort: getSortParameter(),
          search: searchQuery
         }
      });
      setPhotos(response.data);
    } catch (error) { console.error('Ошибка загрузки:', error);}
  };

  const getSortParameter = () => {
    if (sortPhotos.publicatedAt.active) {
      return sortPhotos.publicatedAt.up ? 'publicated_at' : '-publicated_at';
    }
    if (sortPhotos.comments.active) {
      return sortPhotos.comments.up ? 'comments_count' : '-comments_count';
    }
    if (sortPhotos.voices.active) {
      return sortPhotos.voices.up ? 'voices_count' : '-voices_count';
    }
    return null;
  };

  const updateSortPhotos = (newSortPhotos) => {
    setSortPhotos(state => {
      return {
        publicatedAt: { ...state.publicatedAt, ...newSortPhotos.publicatedAt },
        comments: { active: false, up: true },
        voices: { active: false, up: true }
      };
    });
  };

  const searchChange = (query) => {
    setSearchQuery(query);
  };

  return (
    <>
      <SearchPhotoList searchQuery={searchQuery} onSearchChange={searchChange} />
      <SortPhotoList sortPhotos={sortPhotos} onSortChange={updateSortPhotos} />
      <PhotoList photos={photos} />
    </>
  );
}

export default Photos;