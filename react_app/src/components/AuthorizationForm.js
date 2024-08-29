import React, { useState, useEffect } from 'react';
import axios from 'axios';

function AuthorizationForm() {
  useEffect(() => {}, []);

  const handleFormSubmit = event => {
    event.preventDefault();
    axios
      .post('http://localhost:8000/api/login/', {
        username: event.target.username.value,
        password: event.target.password.value,
      })
      .then(response => {
        alert('Успешная  авторизация');
        console.log(response);
        sessionStorage.setItem('auth_token', response.data['auth_token']);
        console.log(sessionStorage.getItem('auth_token'));
      })
      .catch(error => alert('Имя или пароль неверны'));
  };

  return (
    <>
      <h1>Авторизация</h1>
      <form onSubmit={handleFormSubmit}>
        <input type="text" placeholder="Имя" name="username" required />
        <input type="text" name="password" placeholder="Пароль" required />
        <button type="submit">Войти</button>
      </form>
    </>
  );
}

export default AuthorizationForm;