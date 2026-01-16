import React, { memo, useState, useEffect } from "react";
import "./RelatedProducts.css";
import Item from "../Item/Item";

const RelatedProducts = (props) => {
  const [related, setRelated] = useState([]);

  useEffect(() => {
    if (props.category) {
      // Changed to POST to ensure data is sent correctly to Koyeb
      fetch(
        `https://fluttering-christiana-muhammadhanzalah-eb04cdbe.koyeb.app/relatedproducts`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ category: props.category, id: props.id }),
        }
      )
        .then((res) => res.json())
        .then((data) => setRelated(data))
        .catch((err) => console.log("Related Products Error:", err));
    }
  }, [props.id, props.category]);

  return (
    <div className="relatedproducts">
      <h1>Related Products</h1>
      <hr />
      <div className="relatedproducts-item">
        {related.length > 0 ? (
          related.map((item, i) => (
            <Item
              key={i}
              id={item.id}
              name={item.name}
              image={item.image}
              new_price={item.new_price}
              old_price={item.old_price}
            />
          ))
        ) : (
          <p>Finding similar items...</p>
        )}
      </div>
    </div>
  );
};

export default memo(RelatedProducts);
