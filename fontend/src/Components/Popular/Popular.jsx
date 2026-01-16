import { useState, useEffect } from "react";
import "./Popular.css";
import Item from "../Item/Item";

const Popular = () => {
  const [popularProducts, setPopularProducts] = useState([]);

  useEffect(() => {
    fetch(
      "https://fluttering-christiana-muhammadhanzalah-eb04cdbe.koyeb.app/popularinwomen"
    )
      .then((res) => {
        if (!res.ok) throw new Error("Network response was not ok");
        return res.json();
      })
      .then((data) => setPopularProducts(data))
      .catch((err) => console.log("Fetch Error: ", err));
  }, []);

  return (
    <div className="popular">
      <h1>POPULAR IN WOMEN</h1>
      <hr />
      <div className="popular-item">
        {popularProducts.length > 0 ? (
          popularProducts.map((item, i) => {
            return (
              <Item
                key={i}
                id={item.id}
                name={item.name}
                image={item.image}
                new_price={item.new_price}
                old_price={item.old_price}
              />
            );
          })
        ) : (
          <p>Loading Popular Items...</p>
        )}
      </div>
    </div>
  );
};

export default Popular;
