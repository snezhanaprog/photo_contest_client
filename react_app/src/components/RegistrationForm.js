import React, { useState, useEffect } from 'react';
import axios from 'axios';

function RegistrationForm() {
  useEffect(() => {}, []);

  const handleFormSubmit = event => {
    event.preventDefault();
    axios
      .post('http://localhost:8000/api/register/', {
        username: event.target.username.value,
        email: event.target.email.value,
        password: event.target.password.value,
      })
      .then(response => {
        alert('Успешная регистрация');
        localStorage.setItem('auth_token', response.data['auth_token']);
      })
      .catch(error => {
        console.error('Ошибка при отправке данных:', error);
        alert("Ошибка при отправке данных");
      });
  };

  return (
    <>
      <h1>Регистрация</h1>
      <form onSubmit={handleFormSubmit}>
        <input type="text" placeholder="Имя" name="username" required />
        <input type="email" placeholder="Почта" name="email" required />
        <input type="password" placeholder="Пароль" name="password" required />
        <button type="submit">Создать аккаунт</button>
      </form>
    </>
  );
}

export default RegistrationForm;