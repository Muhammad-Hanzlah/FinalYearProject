import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Item from '../Item/Item'; // Reuse your existing Item component
import './SearchResults.css';

const SearchResults = () => {
    const { key } = useParams(); // Get the word from the URL
    const [searchData, setSearchData] = useState([]);

    useEffect(() => {
        fetch(`https://fluttering-christiana-muhammadhanzalah-eb04cdbe.koyeb.app/search/${key}`)
            .then((res) => res.json())
            .then((data) => setSearchData(data));
    }, [key]); // Re-fetch only when the search word changes

    return (
        <div className='search-results-page'>
            <h1>Results for: {key}</h1>
            <div className="search-items-container">
                {searchData.length > 0 ? (
                    searchData.map((item, i) => <Item key={i} {...item} />)
                ) : (
                    <p className="no-results">No products found matching your search.</p>
                )}
            </div>
        </div>
    );
};

export default SearchResults;