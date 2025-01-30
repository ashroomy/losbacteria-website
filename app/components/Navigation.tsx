import React, { useState } from "react";
import Logo from "./Logo";
import { Link } from "@remix-run/react";
import Modal from "./Modal";
const Navigation: React.FC<{back:boolean}> = () => {

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);
  return (
    <nav className="w-full flex justify-center px-3 py-4 fixed xs:px-1 ">
      <div className="flex  md:justify-between xs:justify-between container  max-w-3xl m-auto items-center	">
      <Logo  />

      <Link
        to={'..'}
        className="contact-cta"
        onClick={handleOpenModal}
      >

        <h3 className="uppercase">Contagiate</h3>
      </Link>
      </div>  
      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
      </Modal>
    </nav>
  );
};

export default Navigation;
