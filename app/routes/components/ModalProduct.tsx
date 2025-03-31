import React, { useEffect, useRef } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  const modalRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50">
      <div ref={modalRef} className="px-[12px] py-[17px] relative modal-style border border-white md:w-[440px]  sm:w-full   xs:w-[400px] z-90">
        <h2 className="text-primary uppercase text-[35px] pb-[10px] font-kiffoB">
          ¡contagiate completamente gratis!
        </h2>

        <div className="flex flex-col space-y-4">
          <p className="uppercase text-[20px] pr-[15px] ">
            envíanos un{" "}
            <a
              href="mailto:infectados@losbacteria.com"
              className="hover:text-red underline"
              rel="noopener noreferrer"
            >
              correo{" "}
            </a>
            o escríbenos por{" "}
            <a
              href="https://wa.me/50671236326"
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold underline hover:text-red" 
            >
              whatsapp
            </a>{" "}
            para entender mejor qué necesitás y poder ayudarte.{" "}
          </p>

          <div className="flex justify-between text-[15px]  hover:text-primary font-kiffoB">
            <button onClick={onClose} className="uppercase text-white">
              Cerrar
            </button>
          </div>

          {/* <a href="https://wa.me/1234567890" target="_blank" rel="noopener noreferrer" className="text-green-500 underline">
            WhatsApp Us
          </a> */}
        </div>
      </div>
    </div>
  );
};

export default Modal;
