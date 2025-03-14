import React from 'react';
import { Link } from 'react-router-dom';
import Cart from '../assets/img/cart.png'
import { useCart } from '~/CartContext';

const CartIcon: React.FC = () => {
	const { cart } = useCart();
	const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
	return (
		<Link to="/checkout" aria-label="Cart">
			<div className='relative'>
				{totalItems > 0 &&
					<span className="absolute top-0 right-0 bg-red-500 text-black rounded-full font-kiffoB  text-[20px] bg-[#FF4E00] py-[2px] px-[7px] index-0">
						{totalItems < 9 ? `0${totalItems}` : `${totalItems}`}
					</span>
				}
				<img width={'60px'} height={'52px'} src={Cart} alt="Cart Icon" className='z-10' />

			</div>

		</Link>
	);
};

export default CartIcon;