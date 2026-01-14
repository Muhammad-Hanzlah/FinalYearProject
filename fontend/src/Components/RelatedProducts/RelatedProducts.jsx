// import { memo } from 'react';
// import './RelatedProducts.css'
// import data_product from '../Assets/data'
// import Item from '../Item/Item'

// const RelatedProducts = () => {
//   return (
//     <div className='relatedproducts'>
//         <h1>Related Products</h1>
//         <hr />
//         <div className="relatedproducts-item">
//             {data_product.map((item,i)=>{
//                 return <Item key={i} id={item.id} name={item.name} image = {item.image} new_price={item.new_price} old_price={item.old_price}/>
//             })}
//         </div>
//     </div>
//   );
// };

// export default memo(RelatedProducts);

















import React, { memo, useState, useEffect } from 'react';
import './RelatedProducts.css'
import Item from '../Item/Item'

const RelatedProducts = (props) => {
  const [related, setRelated] = useState([]);

  useEffect(() => {
    if(props.id && props.category) {
        fetch(`https://fluttering-christiana-muhammadhanzalah-eb04cdbe.koyeb.app/relatedproducts/${props.id}/${props.category}`)
        .then((res) => res.json())
        .then((data) => setRelated(data))
        .catch((err) => console.log("AI Error:", err));
    }
  }, [props.id, props.category]);

  return (
    <div className='relatedproducts'>
        <h1>Related Products</h1>
        <hr />
        <div className="relatedproducts-item">
            {related.length > 0 ? (
                related.map((item, i) => (
                    <Item key={i} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price}/>
                ))
            ) : (
                <p>Finding similar items...</p>
            )}
        </div>
    </div>
  );
};

export default memo(RelatedProducts);