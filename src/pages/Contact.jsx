// components/pages/Contact.jsx

import React from 'react';
import Wait from '../components/common/Wait';
import { usePageLoader } from '../hoks/usePageLoader';


const Contact = ({ setIsLoading }) => {
  usePageLoader(setIsLoading);

  return <Wait />;
};

export default Contact;
