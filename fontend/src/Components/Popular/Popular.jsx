// import { memo } from 'react';
// import './Popular.css';
// import Item from '../Item/Item';
// import data_product from '../Assets/data';

// const Popular = () => {


  



//   return (
//     <div className='popular'>
//         <h1>POPULAR IN WOMEN</h1>
//         <hr />
//         <div className='popular-item'>
//             {data_product.map((item,i)=>{
//                 return <Item key={i} id={item.id} name={item.name} image = {item.image} new_price={item.new_price} old_price={item.old_price}/>
//             })}
//         </div>
//     </div>
//   );
// };

// export default memo(Popular);












// import { useState, useEffect } from 'react'; // Logic: Required for memory and fetching
// import './Popular.css';
// import Item from '../Item/Item';

// const Popular = () => {
//   // 1. Initialize state memory with an empty array to prevent mapping errors
//   const [popularProducts, setPopularProducts] = useState([]);

//   useEffect(() => {
//     // 2. Logic Injection: Fetching from the specific women's category endpoint
//     fetch('httpss://fluttering-christiana-muhammadhanzalah-eb04cdbe.koyeb.app/popularinwomen')
//       .then((response) => response.json())
//       .then((data) => setPopularProducts(data)) // Re-wiring the brain with data
//       .catch((err) => console.log("Fetch Error: ", err));
//   }, []); // Runs once on mount

//   return (
//     <div className='popular'>
//         <h1>POPULAR IN WOMEN</h1>
//         <hr />
//         <div className="popular-item">
//             {/* 3. Logic: Check if data exists before mapping to avoid white screen */}
//             {popularProducts.length > 0 ? (
//                 popularProducts.map((item, i) => {
//                     return <Item key={i} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price}/>
//                 })
//             ) : (
//                 <p>Loading Popular Items...</p> // Show a placeholder instead of white screen
//             )}
//         </div>
//     </div>
//   );
// };

// export default Popular;




















import { useState, useEffect } from 'react'; 
import './Popular.css';
import Item from '../Item/Item';

const Popular = () => {
  const [popularProducts, setPopularProducts] = useState([]);

 useEffect(() => {
  fetch('httpss://fluttering-christiana-muhammadhanzalah-eb04cdbe.koyeb.app/popularinwomen')
    .then((res) => {
      if(!res.ok) throw new Error("Network response was not ok");
      return res.json();
    })
    .then((data) => setPopularProducts(data))
    .catch((err) => console.log("Fetch Error: ", err));
}, []);

  return (
    <div className='popular'>
        <h1>POPULAR IN WOMEN</h1>
        <hr />
        <div className="popular-item">
            {popularProducts.length > 0 ? (
                popularProducts.map((item, i) => {
                    return <Item key={i} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price}/>
                })
            ) : (
                <p>Loading Popular Items...</p>
            )}
        </div>
    </div>
  );
};

export default Popular;