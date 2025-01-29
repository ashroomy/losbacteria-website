import { useScroll } from "motion/react";
import Footer from "./Footer"
import  Navigation from "./Navigation"


export function Layout({ children, back=false }: { children: React.ReactNode, back?: boolean }) {

	return <div className="relative min-h-screen">
		<Navigation back={back} />
		
		<div className="z-1 md:pt-[160px] xs:pt-[153px]">
			{children}
		</div>
		<Footer/>
	</div>
}