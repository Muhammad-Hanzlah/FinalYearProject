import React, { useEffect, useState } from 'react';
import './Recommendations.css';
import Item from '../Item/Item';

const Recommendations = () => {
    const [recommended, setRecommended] = useState([]);

    useEffect(() => {
        fetch('https://fluttering-christiana-muhammadhanzalah-eb04cdbe.koyeb.app/recommendations', {
            method: 'GET',
            headers: {
                'auth-token': `${localStorage.getItem('auth-token')}`,
                'Content-Type': 'application/json',
            },
        })
        .then((res) => res.json())
        .then((data) => setRecommended(data));
    }, []);

    return (
        <div className='recommendations'>
            <h1>RECOMMENDED FOR YOU</h1>
            <hr />
            <div className="recommendations-item">
                {recommended.map((item, i) => {
                    return <Item key={i} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price} />
                })}
            </div>
        </div>
    );
};

export default Recommendations;