import React, { useEffect, useState } from "react";
import "./Recommendations.css";
import Item from "../Item/Item"; // Adjust this path to match your Item component location

const Recommendations = () => {
  const [recommended, setRecommended] = useState([]);

  useEffect(() => {
    const fetchRecommendations = async () => {
      const token = localStorage.getItem("auth-token");
      try {
        const response = await fetch(
          "https://fluttering-christiana-muhammadhanzalah-eb04cdbe.koyeb.app/recommendations",
          {
            method: "GET",
            headers: {
              "auth-token": token ? token : "", // Send token only if available
              "Content-Type": "application/json",
            },
          }
        );
        const data = await response.json();
        setRecommended(data);
      } catch (err) {
        console.log("Error fetching recommendations:", err);
      }
    };

    fetchRecommendations();
  }, []); // Runs once on mount

  return (
    <div className="recommendations">
      <h1>RECOMMENDED FOR YOU</h1>
      <hr />
      <div className="recommendations-item">
        {recommended.length > 0 ? (
          recommended.map((item, i) => {
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
          <p>
            Browsing more products will help us find better recommendations for
            you!
          </p>
        )}
      </div>
    </div>
  );
};

export default Recommendations;
