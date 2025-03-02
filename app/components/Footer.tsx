import React from 'react';

const Footer: React.FC = () => {
    return (
        <footer className='text-[15px] container   max-w-xl m-auto sm:wax-w-[400px]  '>
            <div className='flex sm:flex-col md:flex-row sm:items-center items-center md:justify-center uppercase font-kiffoM text-primary  underline sm:gap-3 md:gap-6  md:mb-[20px] sm:mb-[26px] pt-[71px]'>
                <a href="https://www.instagram.com/ideascontagiosas/" className='hover:text-red' target="_blank" rel="noopener noreferrer">
                    @ideascontagiosas
                </a>
                <a href="mailto:infectados@losbacteria.com" className='hover:text-red' rel="noopener noreferrer">
                infectados@losbacteria.com
                </a>
            </div>
            <div className='mt-auto'>

            </div>
            <p className='uppercase text-center  sm:px-8 sm:pb-[100px] md:pb-[20px]'>bacteria es un colectivo creativo que utiliza el arte, diseño, mercadeo y publicidad para crear y potenciar marcas que generen impacto cultural y comercial. Todos los derechos reservados, 2024.</p>

        </footer>
    );
};

export default Footer;