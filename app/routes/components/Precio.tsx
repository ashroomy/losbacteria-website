import React from 'react';

interface PrecioProps {
	precio: number;
}

const Precio: React.FC<PrecioProps> = ({ precio }) => {
	return (
		<div className={`price-bg border-black border-4  min-w-[130px] text-black h-[100px] w-fit text-center relative bg-[#FF4E00] rounded-[50%] md:py-[4px] md:px-[15px] xs:py-[2px] xs:px-[10px] rotate-[12.303deg] z-[-1]`}>
			<div className='text-center flex-col'>
				<b className='xs:pt-[15px] md:pt-0 block font-kiffoB md:text-[51px] xs:text-[40px] md:leading-[66px]  xs:leading-[40px] '>${precio}</b>
				<span className="block md:text-[24px]  xs:text-[20px] md:leading-[5px] xs:leading-normal">+ IVA</span>
			</div>
		</div>
	);
};

export default Precio;