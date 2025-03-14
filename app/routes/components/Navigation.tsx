import React, { useState } from "react";
import Logo from "./Logo";
import { Link } from "@remix-run/react";
import Modal from "./Modal";

interface NavigationProps {
  onHandleContactClick: (e: React.MouseEvent) => void;    
}
const Navigation: React.FC<NavigationProps> = ({onHandleContactClick}) => {


  return (
    <nav className="w-full flex justify-center px-3 py-4 fixed xs:px-1 z-50">
      <div className="flex  md:justify-between xs:justify-between container  max-w-3xl m-auto items-center	">
      <Logo  />

      <button
        className="contact-cta"
        onClick={(e) => onHandleContactClick(e)}
      >
        <h3 className="uppercase">Contagiate</h3>
      </button>
      </div>  

    </nav>
  );
};

export default Navigation;
