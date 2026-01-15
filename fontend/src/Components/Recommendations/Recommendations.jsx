import React, { useEffect, useState } from 'react'
import './Recommendations.css'
import Item from '../Item/Item' // Adjust this path to match your Item component location

const Recommendations = () => {
    const [recommended, setRecommended] = useState([]);

    useEffect(() => {
        // Fetch personalized products from the backend
        fetch('https://fluttering-christiana-muhammadhanzalah-eb04cdbe.koyeb.app/recommendations', {
            method: 'GET',
            headers: {
                'auth-token': `${localStorage.getItem('auth-token')}`, // Identifies the user
                'Content-Type': 'application/json',
            },
        })
        .then((response) => response.json())
        .then((data) => setRecommended(data))
        .catch((err) => console.log("Error fetching recommendations:", err));
    }, []);

    return (
        <div className='recommendations'>
            <h1>RECOMMENDED FOR YOU</h1>
            <hr />
            <div className="recommendations-item">
                {recommended.length > 0 ? (
                    recommended.map((item, i) => {
                        return <Item key={i} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price} />
                    })
                ) : (
                    <p>Browsing more products will help us find better recommendations for you!</p>
                )}
            </div>
        </div>
    )
}

export default Recommendations