import React, { useState, useEffect } from 'react';
import axios from 'axios';
import RegistrationForm from "../components/RegistrationForm.js";
import NavLink from '../routes/NavLink.js';

function Registration() {
  useEffect(() => {}, []);

  return (
    <>
      <RegistrationForm/>
      <NavLink/>
    </>
  );
}

export default Registration;