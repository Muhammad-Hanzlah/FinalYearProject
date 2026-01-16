import { memo } from "react";
import "./Item.css";
import { Link } from "react-router-dom";

const Items = (props) => {
  return (
    <div className="item">
      <Link to={`/product/${props.id}`}>
        <img
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          src={props.image}
          alt={props.name}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "https://placehold.co/350x450?text=No+Image";
          }}
        />
      </Link>
      <p>{props.name}</p>
      <div className="item-prices">
        <div className="item-price-new">${props.new_price}</div>
        <div className="item-price-old">${props.old_price}</div>
      </div>
    </div>
  );
};

export default memo(Items);
