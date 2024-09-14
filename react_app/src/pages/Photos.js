import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SortPhotoList from '../components/SortPhotoList';
import SearchPhotoList  from '../components/SearchPhotoList'
import PhotoList from '../components/PhotoList';
import NavLink from '../routes/NavLink';

function Photos() {
  const [photos, setPhotos] = useState([]);
  const [sortPhotos, setSortPhotos] = useState({ 
    publicatedAt: { active: true, up: true }, 
    comments: { active: false, up: true }, 
    voices: { active: false, up: true } 
  });
  const [searchQuery, setSearchQuery] = useState(""); 

  useEffect(() => {

    fetchPhotos();
  }, [sortPhotos, searchQuery]);

  const fetchPhotos = async () => {
    try {
      const sortParameter = getSortParameter();
      console.log("Параметры сортировки:", sortParameter);
      const response = await axios.get('http://localhost:8000/api/photos', {
        params: {
          search: searchQuery,
          sort: getSortParameter()
        }
      });
      setPhotos(response.data);
    } catch (error) {
      console.error('Ошибка загрузки:', error);
    }
  };
  
  const getSortParameter = () => {
    if (sortPhotos.publicatedAt.active) {
      return sortPhotos.publicatedAt.up ? 'publicated_at' : '-publicated_at';
    }
    if (sortPhotos.comments.active) {
      return sortPhotos.comments.up ? 'count_comments' : '-count_comments';
    }
    if (sortPhotos.voices.active) {
      return sortPhotos.voices.up ? 'count_voices' : '-count_voices';
    }
    return null;
  };

  const searchChange = (query) => {
    setSearchQuery(query);
  };

  return (
    <>
      <NavLink />
      <SearchPhotoList searchQuery={searchQuery} onSearchChange={searchChange} />
      <SortPhotoList sortPhotos={sortPhotos} onSortChange={setSortPhotos} />
      <PhotoList photos={photos} />
    </>
  );
}

export default Photos;