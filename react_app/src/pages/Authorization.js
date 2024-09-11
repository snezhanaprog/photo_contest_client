import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AuthorizationForm from "../components/AuthorizationForm.js";
import NavLink from '../routes/NavLink.js';

function Authorization() {
  useEffect(() => {}, []);

  return (
    <>
      <AuthorizationForm/>
      <NavLink/>
    </>
  );
}

export default Authorization;