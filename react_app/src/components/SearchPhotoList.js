import React, { useState, useEffect } from 'react';

function SearchPhotoList({ searchQuery, onSearchChange }) {

    const searchChange = (event) => {
        onSearchChange(event.target.value);
    };

    return (
        <div>
            <input 
                type="text" 
                onChange={searchChange} 
                value={searchQuery}    
                placeholder="Поиск фотографий..."
            />
        </div>
    );
}

export default SearchPhotoList;