// import { memo, useContext } from 'react';
// import './CartItems.css';
// import { ShopContext } from '../../Context/ShopContext';
// import remove_icon from '../Assets/cart_cross_icon.png';
// import { useNavigate } from 'react-router-dom'; // 1. Import this

// const CartItems = () => {
//     // Destructured cartItems with lowercase 'c' to match ShopContext
//     const {getTotalCartAmount, all_product, cartItems, removeFromCart } = useContext(ShopContext);
//     const navigate = useNavigate(); // 2. Initialize it

//     return (
//         <div className='cartitems'>
//             <div className="cartitems-format-main">
//                 <p>Products</p>
//                 <p>Title</p>
//                 <p>Price</p>
//                 <p>Quantity</p>
//                 <p>Total</p>
//                 <p>Remove</p>
//             </div>
//             <hr />
//             {all_product.map((e) => {
//                 if (cartItems[e.id] > 0) {
//                     return (
//                         <div key={e.id}>
//                             <div className="cartitems-format cartitems-format-main">
//                                 <img src={e.image} alt="" className='carticon-product-icon' />
//                                 <p>{e.name}</p>
//                                 <p>${e.new_price}</p>
//                                 <button className='cartitems-quantity'>{cartItems[e.id]}</button>
//                                 <p>${e.new_price * cartItems[e.id]}</p>
//                                 <img 
//                                     className='cartitems-remove-icon' 
//                                     src={remove_icon} 
//                                     onClick={() => { removeFromCart(e.id) }} 
//                                     alt="Remove icon" 
//                                 />
//                             </div>
//                             <hr />
//                         </div>
//                     );
//                 }
//                 return null;
//             })}
//             <div className="cartitems-down">
//                 <div className="cartitems-total">
//                     <h1>Cart Totals</h1>
//                     <div>
//                         <div className="cartitems-total-item">
//                             <p className="">Subtatle</p>
//                             <p className="">${getTotalCartAmount()}</p>
//                         </div>
//                         <hr />
//                         <div className="cartitems-total-item">
//                             <p className="">Shipping fee</p>
//                             <p className="">Free</p>
//                         </div>
//                         <hr />
//                         <div className="cartitems-total-items">
//                             <h3>Total</h3>
//                             <h3>${getTotalCartAmount()}</h3>
//                         </div>
//                     </div>
//                     <button>Proceed To CheckOut</button>
//                 </div>
//                 <div className="cartitems-promocode">
//                     <p>if you have promo code enter here</p>
//                     <div className="cartitems-promobox">
//                         <input type="text"  placeholder='promo code'/>
//                         <button>Submit</button>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default memo(CartItems);











import { memo, useContext } from 'react';
import './CartItems.css';
import { ShopContext } from '../../Context/ShopContext';
import remove_icon from '../Assets/cart_cross_icon.png';
import { useNavigate } from 'react-router-dom'; // 1. Import this

const CartItems = () => {
    // Destructured cartItems with lowercase 'c' to match ShopContext
    const {getTotalCartAmount, all_product, cartItems, removeFromCart } = useContext(ShopContext);
    const navigate = useNavigate(); // 2. Initialize it

    return (
        <div className='cartitems'>
            <div className="cartitems-format-main">
                <p>Products</p>
                <p>Title</p>
                <p>Price</p>
                <p>Quantity</p>
                <p>Total</p>
                <p>Remove</p>
            </div>
            <hr />
            {all_product.map((e) => {
                if (cartItems[e.id] > 0) {
                    return (
                        <div key={e.id}>
                            <div className="cartitems-format cartitems-format-main">
                                <img src={e.image} alt="" className='carticon-product-icon' />
                                <p>{e.name}</p>
                                <p>${e.new_price}</p>
                                <button className='cartitems-quantity'>{cartItems[e.id]}</button>
                                <p>${e.new_price * cartItems[e.id]}</p>
                                <img 
                                    className='cartitems-remove-icon' 
                                    src={remove_icon} 
                                    onClick={() => { removeFromCart(e.id) }} 
                                    alt="Remove icon" 
                                />
                            </div>
                            <hr />
                        </div>
                    );
                }
                return null;
            })}
            <div className="cartitems-down">
                <div className="cartitems-total">
                    <h1>Cart Totals</h1>
                    <div>
                        <div className="cartitems-total-item">
                            <p className="">Subtatle</p>
                            <p className="">${getTotalCartAmount()}</p>
                        </div>
                        <hr />
                        <div className="cartitems-total-item">
                            <p className="">Shipping fee</p>
                            <p className="">Free</p>
                        </div>
                        <hr />
                        <div className="cartitems-total-items">
                            <h3>Total</h3>
                            <h3>${getTotalCartAmount()}</h3>
                        </div>
                    </div>
                    {/* FIXED: Added onClick to navigate to the checkout page */}
                    <button onClick={() => navigate('/checkout')}>Proceed To CheckOut</button>
                </div>
                <div className="cartitems-promocode">
                    <p>if you have promo code enter here</p>
                    <div className="cartitems-promobox">
                        <input type="text"  placeholder='promo code'/>
                        <button>Submit</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default memo(CartItems);


