// import { memo, useContext } from 'react';
// import './ProductDisplay.css';
// import star_icon from '../Assets/star_icon.png';
// import star_dull_icon from '../Assets/star_dull_icon.png';
// import { ShopContext } from '../../Context/ShopContext';



// const ProductDisplay = (props) => {
//     const {product} = props;
//     const {addToCart} = useContext(ShopContext)
//   return (
//     <div className='productdisplay'>
//         <div className="productdisplay-left">
//             <div className="productdisplay-img-list">
//                 <img src={product.image} alt=''/>
//                 <img src={product.image} alt=''/>
//                 <img src={product.image} alt=''/> 
//                 <img src={product.image} alt='' />
//             </div>
//             <div className="productdisplay-img">
//                 <img className='productdisplay-main-img' src={product.image} alt=''/>
//             </div>
//         </div>
//         <div className="productdisplay-right">
//             <h1>{product.name}</h1>
//             <div className="productdisplay-right-stars">
//                 <img src={star_icon} alt="" />
//                 <img src={star_icon} alt="" />
//                 <img src={star_icon} alt="" />
//                 <img src={star_icon} alt="" />
//                 <img src={star_dull_icon} alt="" />
//                 <p>(122)</p>
//             </div>  
//             <div className="productdisplay-right-prices">
//                 <div className="productdisplay-right-price-old">${product.old_price}</div>
//                 <div className="productdisplay-right-price-new">${product.new_price}</div>
//             </div>
//             <div className="productdisplay-right-description"></div>
//             <div className="productdisplay-right-size">
//                 A light and soft cotton blend tee for ultimate comfort. Featuring a classic crew neck and short sleeves, it's perfect for everyday wear.
//                 <h1>Select Size</h1>
//                 <div className="productdisplay-right-sizes">
//                     <div>S</div>
//                     <div>M</div>
//                     <div>L</div>
//                     <div>XL</div>
//                     <div>XXL</div>
//                 </div>
//             </div>
//             <button onClick={()=>{addToCart(product.id)}}>Add to Cart</button>
//             <p className="productdisplay-right-category"><span>Category :</span>Women , T-Shirt, Crop Top</p>
//             <p className="productdisplay-right-category"><span>Tags :</span>Modern , Latest</p>
//         </div>
//     </div>
//   );
// };

// export default memo(ProductDisplay);

























// import { memo, useContext } from 'react';
// import './ProductDisplay.css';
// import star_icon from '../Assets/star_icon.png';
// import star_dull_icon from '../Assets/star_dull_icon.png';
// import { ShopContext } from '../../Context/ShopContext';

// const ProductDisplay = (props) => {
//     useEffect(() => {
//     // Only send if the user is logged in
//     if (localStorage.getItem('auth-token')) {
//         fetch('https://fluttering-christiana-muhammadhanzalah-eb04cdbe.koyeb.app/update-interests', {
//             method: 'POST',
//             headers: {
//                 'auth-token': `${localStorage.getItem('auth-token')}`,
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify({ category: product.category }),
//         });
//     }
// }, [product.category]); // Runs every time a user views a new product category
//     const {product} = props;
//     const {addToCart} = useContext(ShopContext)
//   return (
//     <div className='productdisplay'>
//         <div className="productdisplay-left">
//             <div className="productdisplay-img-list">
//                 <img src={product.image} alt=''/>
//                 <img src={product.image} alt=''/>
//                 <img src={product.image} alt=''/> 
//                 <img src={product.image} alt='' />
//             </div>
//             <div className="productdisplay-img">
//                 <img className='productdisplay-main-img' src={product.image} alt=''/>
//             </div>
//         </div>
//         <div className="productdisplay-right">
//             <h1>{product.name}</h1>
//             <div className="productdisplay-right-stars">
//                 <img src={star_icon} alt="" />
//                 <img src={star_icon} alt="" />
//                 <img src={star_icon} alt="" />
//                 <img src={star_icon} alt="" />
//                 <img src={star_dull_icon} alt="" />
//                 <p>(122)</p>
//             </div>  
//             <div className="productdisplay-right-prices">
//                 <div className="productdisplay-right-price-old">${product.old_price}</div>
//                 <div className="productdisplay-right-price-new">${product.new_price}</div>
//             </div>
//             <div className="productdisplay-right-description"></div>
//             <div className="productdisplay-right-size">
//                 A light and soft cotton blend tee for ultimate comfort. Featuring a classic crew neck and short sleeves, it's perfect for everyday wear.
//                 <h1>Select Size</h1>
//                 <div className="productdisplay-right-sizes">
//                     <div>S</div>
//                     <div>M</div>
//                     <div>L</div>
//                     <div>XL</div>
//                     <div>XXL</div>
//                 </div>
//             </div>
//             <button onClick={()=>{addToCart(product.id)}}>Add to Cart</button>
//             <p className="productdisplay-right-category"><span>Category :</span>Women , T-Shirt, Crop Top</p>
//             <p className="productdisplay-right-category"><span>Tags :</span>Modern , Latest</p>
//         </div>
//     </div>
//   );
// };

// export default memo(ProductDisplay);































// 1. Fixed Import: Added useEffect
import { memo, useContext, useEffect } from 'react'; 
import './ProductDisplay.css';
import star_icon from '../Assets/star_icon.png';
import star_dull_icon from '../Assets/star_dull_icon.png';
import { ShopContext } from '../../Context/ShopContext';

const ProductDisplay = (props) => {
    // 2. Fixed Order: Define product BEFORE using it in useEffect
    const { product } = props; 
    const { addToCart } = useContext(ShopContext);

    useEffect(() => {
        // Only send if the user is logged in
        if (localStorage.getItem('auth-token')) {
            fetch('https://fluttering-christiana-muhammadhanzalah-eb04cdbe.koyeb.app/update-interests', {
                method: 'POST',
                headers: {
                    'auth-token': `${localStorage.getItem('auth-token')}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ category: product.category }),
            })
            .then(res => res.json())
            .then(data => console.log("Interest Updated:", data))
            .catch(err => console.log("Interest Update Error:", err));
        }
    }, [product.category]); // Runs every time the user views a new category

    return (
        <div className='productdisplay'>
            <div className="productdisplay-left">
                <div className="productdisplay-img-list">
                    <img src={product.image} alt=''/>
                    <img src={product.image} alt=''/>
                    <img src={product.image} alt=''/> 
                    <img src={product.image} alt='' />
                </div>
                <div className="productdisplay-img">
                    <img className='productdisplay-main-img' src={product.image} alt=''/>
                </div>
            </div>
            <div className="productdisplay-right">
                <h1>{product.name}</h1>
                <div className="productdisplay-right-stars">
                    <img src={star_icon} alt="" />
                    <img src={star_icon} alt="" />
                    <img src={star_icon} alt="" />
                    <img src={star_icon} alt="" />
                    <img src={star_dull_icon} alt="" />
                    <p>(122)</p>
                </div>  
                <div className="productdisplay-right-prices">
                    <div className="productdisplay-right-price-old">${product.old_price}</div>
                    <div className="productdisplay-right-price-new">${product.new_price}</div>
                </div>
                <div className="productdisplay-right-description">
                     A light and soft cotton blend tee for ultimate comfort. Featuring a classic crew neck and short sleeves, it's perfect for everyday wear.
                </div>
                <div className="productdisplay-right-size">
                    <h1>Select Size</h1>
                    <div className="productdisplay-right-sizes">
                        <div>S</div>
                        <div>M</div>
                        <div>L</div>
                        <div>XL</div>
                        <div>XXL</div>
                    </div>
                </div>
                <button onClick={()=>{addToCart(product.id)}}>Add to Cart</button>
                <p className="productdisplay-right-category"><span>Category :</span>{product.category}</p>
                <p className="productdisplay-right-category"><span>Tags :</span>Modern , Latest</p>
            </div>
        </div>
    );
};

export default memo(ProductDisplay);