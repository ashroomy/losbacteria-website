import React from 'react';

const Footer: React.FC = () => {
    return (
        <footer className='text-[15px] container   max-w-xl m-auto  '>
            <div>
            <div className='flex xs:flex-col md:flex-row sm:items-center items-center md:justify-center uppercase  text-primary   xs:gap-3 md:gap-6  md:mb-[20px] xs:mb-[30px] pt-[71px] xs:mx-[20px] md:mx-0'>
                <a href="https://www.instagram.com/ideascontagiosas/" className='hover:text-red underline font-kiffoM' target="_blank" rel="noopener noreferrer">
                    @ideascontagiosas
                </a>
                <a href="mailto:infectados@losbacteria.com" className='hover:text-red underline font-kiffoM' rel="noopener noreferrer">
                infectados@losbacteria.com
                </a>
                <p className='md:hidden xs:block uppercase no-underline text-white font-kiffoR text-[15px] text-center  sm:px-8 sm:pb-[100px] md:pb-[20px]'>Bacteria es una pulpería creativa que combina arte, diseño y creatividad para ayudar a las marcas a destacar en su categoría. Todos los derechos reservados, 2026</p>

            </div>
            <p className='md:block xs:hidden uppercase no-underline text-white font-kiffoR text-[15px] text-center  sm:px-8 sm:pb-[100px] md:pb-[20px]'>Bacteria es una pulpería creativa que combina arte, diseño y creatividad para ayudar a las marcas a destacar en su categoría. Todos los derechos reservados, 2026</p>
            </div>


        </footer>
    );
};

export default Footer;