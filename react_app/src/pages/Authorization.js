import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AuthorizationForm from "../components/AuthorizationForm.js";

function Authorization() {
  useEffect(() => {}, []);

  return (
    <>
      <AuthorizationForm/>
    </>
  );
}

export default Authorization;