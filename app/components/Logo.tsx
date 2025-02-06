import React, { useState, useEffect } from 'react';
import { Link } from "@remix-run/react";
import Bacteria from '../assets/img/bacteria-logo-full.svg'
import BacteriaHover from '../assets/img/bacteria-logo-full-hover.svg'	
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'motion/react';

const Logo: React.FC = () => {
	const [active, setActive] = useState(false);
	const { scrollY } = useScroll()

useMotionValueEvent(scrollY, "change", (latest: any) => {
	latest>88 ? setActive(true) : setActive(false)
})

	return (
		<h1 className='min-w-[255px] logo-header'>
			<AnimatePresence initial={false} >
			<Link to='/' className='block z-10 '>
				{!active ? 

				<motion.img  key="logo" src={Bacteria} alt="Logo bacteria" initial={{  opacity:0 }} animate={{  opacity:1 }} exit={{ opacity: 0 }}   transition={{ duration: 0.3, ease: ["easeIn"] }} />
 				: 

				 <motion.img key="logo-hover" src={BacteriaHover} alt="Logo bacteria" initial={{opacity:0}} animate={{opacity:1 } }   transition={{  duration: 0.15, ease: ["easeOut"] }} />
				}
			</Link>	
			</AnimatePresence>

		</h1>
	);
};

export default Logo;
