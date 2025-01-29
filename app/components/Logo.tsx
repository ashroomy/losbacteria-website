import React, { useState, useEffect } from 'react';
import { Link } from "@remix-run/react";
import logo from '../assets/img/bacteria-logo.svg'
import logoHover from '../assets/img/bacteria-logo-hover.svg'	
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'motion/react';

const Logo: React.FC = () => {
	const [active, setActive] = useState(false);
	const { scrollY } = useScroll()

useMotionValueEvent(scrollY, "change", (latest: any) => {
	latest>88 ? setActive(true) : setActive(false)
})

	return (
		<h1 className='min-w-[255px]'>
			<AnimatePresence initial={false} >
			<Link to='/' className='block z-index-[9999] '>
				{!active ? 
				<motion.img  key="logo" src={logo} alt="Logo bacteria" initial={{  opacity:0 }} animate={{  opacity:1 }} exit={{ opacity: 0 }}   transition={{ duration: 0.3, ease: ["easeIn"] }} />
 				: 
				<motion.img key="logo-hover" src={logoHover} alt="Logo bacteria" initial={{opacity:0}} animate={{opacity:1 } }   transition={{  duration: 0.15, ease: ["easeOut"] }} />
				}
			</Link>	
			</AnimatePresence>

		</h1>
	);
};

export default Logo;
