import { useScroll } from "motion/react";
import Footer from "./Footer"
import  Navigation from "./Navigation"
import Modal from "./Modal";
import { useState } from "react";


export function Layout({ children }: { children: React.ReactNode, back?: boolean }) {
	const [isModalOpen, setIsModalOpen] = useState(false);

	const handleOpenModal = () => setIsModalOpen(true);
	const handleCloseModal = () => setIsModalOpen(false);
	return <div className="relative min-h-screen">
		<Navigation onHandleContactClick={handleOpenModal} />
		
		<div className=" md:pt-[160px] xs:pt-[153px]">
			{children}
		</div>
		<Footer/>
		<Modal isOpen={isModalOpen} onClose={handleCloseModal}>
		</Modal>
	</div>
}