import { memo, useContext } from "react";
import { ShopContext } from "../Context/ShopContext";
import { useParams } from "react-router-dom";
import Breadcrum from "../Components/Breadcrums/Breadcrum";
import ProductDisplay from "../Components/ProductDisplay/ProductDisplay.jsx";
import DescriptionBox from "../Components/DescriptionBox/DescriptionBox.jsx";
import RelatedProducts from "../Components/RelatedProducts/RelatedProducts.jsx";

const Product = () => {
  const { all_product } = useContext(ShopContext);
  const { productId } = useParams();
  const product = all_product.find((e) => e.id === Number(productId));

  if (!product)
    return (
      <div style={{ padding: "100px", textAlign: "center" }}>Loading...</div>
    );

  return (
    <div>
      <Breadcrum product={product} />
      <ProductDisplay product={product} />
      <DescriptionBox />
      {/* Pass props to enable Dynamic AI Recommendations */}
      <RelatedProducts id={product.id} category={product.category} />
    </div>
  );
};

export default memo(Product);
