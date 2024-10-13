import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SortPhotoList from '../components/SortPhotoList';
import SearchPhotoList  from '../components/SearchPhotoList'
import PhotoList from '../components/PhotoList';
import Header from '../components/Header';
import Notifications from '../components/Notifications';

function Photos() {
  const [photos, setPhotos] = useState([]);
  const [sortPhotos, setSortPhotos] = useState({ 
    publicatedAt: { active: true, up: true }, 
    comments: { active: false, up: true }, 
    voices: { active: false, up: true } 
  });
  const [searchQuery, setSearchQuery] = useState(""); 
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState({ page: 1, total_count: 1 });
  useEffect(() => {

    fetchPhotos();
  }, [sortPhotos, searchQuery, page]);

  const fetchPhotos = async () => {
    try {
      let headersData = {}
      if (localStorage.getItem('auth_token')){
        headersData={
        Authorization: `Token ${localStorage.getItem('auth_token')}`,
        'Content-Type':'application/json'
      }}
      const response = await axios.get('http://localhost:8000/api/photos', {
        headers : headersData,
        params: {
          search: searchQuery,
          sort: getSortParameter(),
          current_page: page
        }
      });
      setPhotos(response.data['photos']);
      setPagination(response.data['pagination'])
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
    setPage(1);
  };

  const handlePageChange = (num) => {
    setPage(num);
  };

  return (
    <>
      <Header />
      <Notifications/>
      <SearchPhotoList searchQuery={searchQuery} onSearchChange={searchChange} />
      <SortPhotoList sortPhotos={sortPhotos} onSortChange={setSortPhotos} />
      <PhotoList photos={photos} />
      <div>
        {Array.from({ length: pagination.total_pages }, (_, index) => (
          <button key={index + 1} onClick={() => handlePageChange(index + 1)}>
            {index + 1}
          </button>
        ))}
      </div>
      
    </>
  );
}

export default Photos;