import "./App.css";
import Navbar from "./Components/Navbar/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Shop from "./Pages/Shop";
import ShopCategory from "./Pages/ShopCategory";
import Product from "./Pages/Product";
import Cart from "./Pages/Cart";
import LoginSignup from "./Pages/LoginSignup";
import Footer from "./Components/Footer/Footer";
import men_banner from "./Components/Assets/banner_mens.png";
import women_banner from "./Components/Assets/banner_women.png";
import kid_banner from "./Components/Assets/banner_kids.png";
import SearchResults from "./Components/SearchResults/SearchResults";
import ChatBot from "./Components/ChatBot/ChatBot";
import CheckOut from "./Components/CheckOut/CheckOut";

// Stripe Elements
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(
  "pk_test_51SnHBkCtxpb4SCTkqa7L4U0NTemhr7oETBUJri5uLk0X2Cysed6qQ8rSCsIJNkVpz90r1BVkvXR23gfCSegjGTjU00aTCD4xxA"
);

function App() {
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Shop />} />
          <Route
            path="/mens"
            element={<ShopCategory banner={men_banner} category="men" />}
          />
          <Route
            path="/womens"
            element={<ShopCategory banner={women_banner} category="women" />}
          />
          <Route
            path="/kids"
            element={<ShopCategory banner={kid_banner} category="kid" />}
          />
          <Route path="/product/:productId" element={<Product />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={<LoginSignup />} />
          <Route path="/search/:key" element={<SearchResults />} />

          <Route
            path="/checkout"
            element={
              <Elements stripe={stripePromise}>
                <CheckOut />
              </Elements>
            }
          />
        </Routes>
        <Footer />
        <ChatBot />
      </BrowserRouter>
    </div>
  );
}
export default App;
