import React from 'react';
import { FormField } from './FormField';
import { Form } from '@remix-run/react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center">
      <div className="px-[12px] py-[17px] relative modal-style border border-white md:w-[550px]   xs:w-[400px]">
      <h2 className='text-primary text-[35px] pb-[10px] font-kiffoB'>¡ADVERTENCIA!</h2>
        
        <div className="flex flex-col space-y-4">
          <p className="uppercase text-[20px] pr-[15px] ">
          Si estás leyendo esto, oficialmente has sido infectado. Ya no hay vuelta atrás. Lo único que te queda, es seguirnos en <a href='https://www.instagram.com/ideascontagiosas/' className='text-white underline'>Instagram</a>, <a href='' className='text-white underline '>tiktok</a> o dejarnos tu correo:
          </p>
          <Form reloadDocument method="post" className="flex flex-col gap-2 pb-[55px]">
          <FormField
            type='email'
            htmlFor='email'
            label='tu correo aquí'
            value={'tu correo aquí'}
            />
          </Form>
          <div className='flex justify-between text-[15px]  font-kiffoB'> 
          <button type="submit" name="_action" value="register" className="text-primary w-fit	 leading-6	underline uppercase	" >contagiarme</button>
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