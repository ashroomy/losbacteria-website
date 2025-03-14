import React, { useEffect, useRef, useState } from 'react';
import { FormField } from './FormField';
import { Form, useActionData } from '@remix-run/react';
import { ActionFunction, json } from '@remix-run/node';
// import { action } from '~/routes/_index';
import { serverOnly$ } from "vite-env-only/macros"
import { action } from '../_index';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const validateEmail = (email: string): string | undefined => {
  var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  if (!email.length || !validRegex.test(email)) {
    return "El correo que escribiste no es válido. Intentalo de nuevo."
  }
}



const Modal: React.FC<ModalProps> = ({  isOpen, onClose }) => {
  const data = useActionData<typeof action>();
  const firstLoad = useRef(true)
  const [errors, setErrors] = useState(data?.errors || {})
  const [formError, setFormError] = useState(data?.error || '')
  const modalRef = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState({
    email: '',
  })
  
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>, field: string) => {
    setFormData(form => ({ ...form, [field]: event.target.value }))
  }

  useEffect(() => {
    // Clear the form if we switch forms
    if (!firstLoad.current) {
      const newState = {
        email: ''
      }
      setErrors(newState)
      setFormError('')
      setFormData(newState)
    }
  }, [])

  useEffect(() => {
    if (!firstLoad.current) {
      setFormError('')
    }
  }, [formData])

  useEffect(() => {
    firstLoad.current = false
  }, [data])

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
    <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50 overflow-hidden">
      <div className="px-[12px] py-[17px] relative modal-style border border-white md:w-[550px]  sm:w-full xs:w-[400px] z-50">
      <h2 className='text-primary text-[35px] pb-[10px] font-kiffoB'>¡ADVERTENCIA!</h2>
        
        <div className="flex flex-col space-y-4">
          <p className="uppercase text-[20px] pr-[15px] ">
          Si estás leyendo esto, oficialmente has sido infectado. Ya no hay vuelta atrás. Lo único que te queda, es seguirnos en <a href='https://www.instagram.com/ideascontagiosas/' className='text-white underline hover:text-red'>Instagram</a>, <a href='' className='text-white underline  hover:text-red'>tiktok</a> o dejarnos tu correo:
          </p>
          <Form navigate={false} fetcherKey="contact" method="post" className="flex flex-col gap-2 pb-[55px]">
          <FormField
            type='email'
            htmlFor='email'
            label='Tu correo aquí'
            value={formData.email}
            onChange={e => handleInputChange(e, 'email')}
            error={errors?.email}
            />
            <div className="text-xs font-semibold text-center tracking-wide text-red-500 w-full ">
                {formError}
              </div>
          </Form>
          <div className='flex justify-between text-[15px]  font-kiffoB'> 
          <button type="submit"  className="text-primary hover:text-red w-fit	 leading-6	underline uppercase cursor-pointer	" >contagiarme</button>
          
          <button onClick={onClose} className="underline uppercase text-white hover:text-primary ">
          Cerrar
        </button>
          </div>

        </div>

      </div>
    </div>
  );
};

export default Modal;