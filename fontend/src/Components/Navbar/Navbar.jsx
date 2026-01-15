
// import  { memo , useState} from 'react';
// import './Navbar.css';
// import logo from '../Assets/logo.png';
// import cart_icon from '../Assets/cart_icon.png';
// import { Link } from 'react-router-dom';

// const Navbar = () => {
//   const [menu ,setMenu] = useState("shop");
//   return (
//     <div className='Navbar'>
//       <div className='nav-logo'>
//         <img src={logo} alt="Store logo" />
//         <p>Store</p>
//       </div>
//       <ul className='nav-menu'>
//         <li onClick={()=>{setMenu("shop")}}> <Link to="/">Shop</Link> {menu==="shop"? <hr/>:<></>}</li>
//         <li onClick={()=>{setMenu("mens")}}> <Link to="/mens">Men</Link> {menu==="mens"? <hr/>:<></>}</li>
//         <li onClick={()=>{setMenu("womens")}}> <Link to="/womens">Women</Link> {menu==="womens"? <hr/>:<></>}</li>
//         <li onClick={()=>{setMenu("kids")}}> <Link to="/kids">Kids</Link> {menu==="kids"? <hr/>:<></>}</li>
//       </ul>
//       <div className="nav-login-cart">
//         <Link to={"/login"}><button>Login</button></Link>
//         <Link to={"/cart"}><img src={cart_icon} alt="Cart" /></Link>
//         <div className="nav-cart-count">0</div>
//       </div>
//     </div>
//   );
// };

// export default memo(Navbar);
















import { memo, useContext, useRef, useState } from 'react';
import './Navbar.css';
import logo from '../Assets/logo.png';
import cart_icon from '../Assets/cart_icon.png';
import { Link, useNavigate } from 'react-router-dom';
import { ShopContext } from '../../Context/ShopContext';
import nav_dropdown from '../Assets/nav_dropdown.png';

const Navbar = () => {
  const [menu, setMenu] = useState("shop");
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  
  const { getTotalCartItems } = useContext(ShopContext);
  const menRef = useRef();

  const handleSearch = () => {
    if (searchTerm.trim()) {
      navigate(`/search/${searchTerm}`);
      // Close menu automatically after searching
      menRef.current.classList.remove('nav-manue-visible');
    }
  };

  const dropdown_toggle = (e) => {
    menRef.current.classList.toggle('nav-manue-visible');
    e.target.classList.toggle('open');
  };

  return (
    <div className='Navbar'>
      <div className='nav-logo'>
        <Link to='/' style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <img src={logo} alt="Store logo" />
          <p>Store</p>
        </Link>
      </div>

      <img className='nav-dropdown-icon' onClick={dropdown_toggle} src={nav_dropdown} alt="menu" />
      
      <ul ref={menRef} className='nav-menu'>
        {/* ROW 1: Search Bar (Full width in toggle) */}
        <li className="nav-search-wrapper">
          <div className="nav-search-container">
            <input 
              type="text" 
              placeholder="Search..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)} 
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            />
            <button onClick={handleSearch}>Search</button>
          </div>
        </li>

        {/* ROW 2: Horizontal Categories */}
        <div className="nav-categories-horizontal">
          <li onClick={() => { setMenu("shop") }}>
            <Link to="/" style={{ textDecoration: 'none' }}>Shop</Link>
            {menu === "shop" ? <hr /> : <></>}
          </li>
          <li onClick={() => { setMenu("mens") }}>
            <Link to="/mens" style={{ textDecoration: 'none' }}>Men</Link>
            {menu === "mens" ? <hr /> : <></>}
          </li>
          <li onClick={() => { setMenu("womens") }}>
            <Link to="/womens" style={{ textDecoration: 'none' }}>Women</Link>
            {menu === "womens" ? <hr /> : <></>}
          </li>
          <li onClick={() => { setMenu("kids") }}>
            <Link to="/kids" style={{ textDecoration: 'none' }}>Kids</Link>
            {menu === "kids" ? <hr /> : <></>}
          </li>
        </div>
      </ul>

      <div className="nav-login-cart">
        {localStorage.getItem('auth-token')
          ? <button onClick={() => { 
              localStorage.removeItem('auth-token'); 
              window.location.replace('/'); 
            }}>Logout</button>
          : <Link to="/login"><button>Login</button></Link>}
        <Link to="/cart"><img src={cart_icon} alt="Cart" /></Link>
        <div className="nav-cart-count">{getTotalCartItems()}</div>
      </div>
    </div>
  );
};

export default memo(Navbar);