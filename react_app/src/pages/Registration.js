import React, { useState, useEffect } from 'react';
import axios from 'axios';
import RegistrationForm from "../components/RegistrationForm.js";
import Header from '../components/Header';

function Registration() {
  useEffect(() => {}, []);

  return (
    <>
    <Header />
      <RegistrationForm/>
    </>
  );
}

export default Registration;