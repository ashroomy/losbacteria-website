import React from 'react';

const Footer: React.FC = () => {
    return (
        <footer className='text-[15px] container  max-w-xl m-auto pt-[71px] pb-[200px] px-[20px]'>
            <div className='flex justify-center uppercase font-kiffoM text-primary underline gap-6 mb-[24px]'>
                <a href="https://www.instagram.com/ideascontagiosas/" target="_blank" rel="noopener noreferrer">
                    @ideascontagiosas
                </a>
                <a href="mailto:infectados@losbacteria.com" rel="noopener noreferrer">
                infectados@losbacteria.com
                </a>
            </div>
            <div className='mt-auto'>

            </div>
            <p className='uppercase text-center'>bacteria es un colectivo creativo que utiliza el arte, diseño, mercadeo y publicidad para crear y potenciar marcas que generen impacto cultural y comercial. Todos los derechos reservados, 2024.</p>

        </footer>
    );
};

export default Footer;