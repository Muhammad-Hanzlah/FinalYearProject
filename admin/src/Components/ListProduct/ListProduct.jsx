// import { memo, useEffect, useState } from 'react';
// import './ListProduct.css'
// import cross_icon from '../../assets/cross_icon'

// const ListProduct = () => {

//   const[allproducts, setAllProducts] = useState([]);
//   const fetchInfo = async() =>{
//     await fetch('http://localhost:4000/allproducts')
//     .then((res) =>res.json())
//     .then((data)=>{setAllProducts(data)});
//   }


//   useEffect(()=>{
//     fetchInfo();
//   },[])

//   return (
//     <div className='list-product'>
//       <h1>All Product List</h1>
//       <div className="listproduct-format-main">
//         <p className="">Product</p>
//         <p className="">Title</p>
//         <p className="">Old Price</p>
//         <p className="">New Price</p>
//         <p className="">Category</p>
//         <p className="">Remove</p>
//       </div>
//       <div className="listproduct-allproducts">
//         <hr />
//         {allproducts.map((product,index)=>{
//           return <div key={index} className="listproduct-format-main listproduct-format">
//             <img className='listproduct-product-icon' src={product.image} alt="" />
//             <p>{product.name}</p>
//             <p>${product.old_price}</p>
//             <p>${product.new_price}</p>
//             <p>{product.cagtegory}</p>
//             <img className='listproduct-remove-icon' src={cross_icon} alt="" />
//           </div>
//         })}
//       </div>
//     </div>
//   );
// };

// export default memo(ListProduct);

















import { memo, useEffect, useState } from 'react';
import './ListProduct.css';
import cross_icon from '../../assets/cross_icon.png'; // 1. Added file extension

const ListProduct = () => {
  const [allproducts, setAllProducts] = useState([]);

  // 2. Optimized Fetch Logic
  const fetchInfo = async () => {
    try {
      const res = await fetch('http://localhost:4000/allproducts');
      const data = await res.json();
      setAllProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  // 3. Logic to Remove Product
  const remove_product = async (id) => {
    await fetch('http://localhost:4000/removeproduct', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id: id })
    });
    await fetchInfo(); // Refresh the list after deletion
  };

  useEffect(() => {
    fetchInfo();
  }, []);

  return (
    <div className='list-product'>
      <h1>All Product List</h1>
      {/* Table Header */}
      <div className="listproduct-format-main">
        <p>Product</p>
        <p>Title</p>
        <p>Old Price</p>
        <p>New Price</p>
        <p>Category</p>
        <p>Remove</p>
      </div>
      
      <div className="listproduct-allproducts">
        <hr />
        {allproducts.map((product, index) => {
          return (
            <div key={index}>
              <div className="listproduct-format-main listproduct-format">
                <img className='listproduct-product-icon' src={product.image} alt="" />
                <p>{product.name}</p>
                <p>${product.old_price}</p>
                <p>${product.new_price}</p>
                <p>{product.category}</p> {/* 4. Fixed spelling from "cagtegory" */}
                <img 
                  onClick={() => { remove_product(product.id) }} 
                  className='listproduct-remove-icon' 
                  src={cross_icon} 
                  alt="remove" 
                />
              </div>
              <hr />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default memo(ListProduct);