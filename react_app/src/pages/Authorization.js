import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AuthorizationForm from "../components/AuthorizationForm.js";
import Header from '../components/Header.js';
import VKButton from '../components/VKButton';

function Authorization() {
  useEffect(() => {}, []);

  return (
    <>
      <Header />
      <AuthorizationForm/>
    </>
  );
}

export default Authorization;