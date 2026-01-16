import { memo, useState, useEffect } from "react";
import "./NewCollections.css";
import Item from "../Item/Item";

const NewCollections = () => {
  const [new_collection, setNew_collection] = useState([]);

  useEffect(() => {
    fetch(
      "https://fluttering-christiana-muhammadhanzalah-eb04cdbe.koyeb.app/newcollections"
    )
      .then((response) => response.json())
      .then((data) => {
        setNew_collection(data);
      })
      .catch((err) => console.log("Fetch Error: ", err));
  }, []);

  return (
    <div className="new-collections">
      <h1>NEW COLLECTIONS</h1>
      <hr />
      <div className="collections">
        {new_collection.length > 0 ? (
          new_collection.map((item, i) => {
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
          <p>Loading New Collections...</p>
        )}
      </div>
    </div>
  );
};

export default memo(NewCollections);
