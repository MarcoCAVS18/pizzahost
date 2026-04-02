// components/pages/Wishlist.jsx

import Wait from "../components/common/Wait";
import React from "react";

import { usePageLoader } from "../hooks/usePageLoader";

const Wishlist = ({setIsLoading}) => {
  usePageLoader(setIsLoading);

  return (
    <div>
      <Wait /> 
    </div>
      );
};

export default Wishlist;
