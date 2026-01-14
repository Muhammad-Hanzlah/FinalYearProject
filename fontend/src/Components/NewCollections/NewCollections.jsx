// import { memo } from 'react';
// import './NewCollections.css';
// import new_collections from '../Assets/new_collections';
// import Item from '../Item/Item';
// const NewCollections = () => {




//   return (
//     <div className='new-collections'>
//         <h1>NEW COLLECTIONS</h1>
//         <hr />
//         <div className='collections'>
//             {new_collections.map((item,i)=>{
//                 return <Item key={i} id={item.id} name={item.name} image = {item.image} new_price={item.new_price} old_price={item.old_price}/>
//             })}
//         </div>
//     </div>
//   );
// };

// export default memo(NewCollections);
















// import { memo, useState, useEffect } from 'react'; // Fix: Added useState and useEffect imports
// import './NewCollections.css';
// import Item from '../Item/Item';

// const NewCollections = () => {

//     // Logic: Initialize state to store the fetched "New Collection"
//     const [new_collection, setNew_collection] = useState([]);

//     // The Logic Injection: Fetching the 8 newest products from your backend
//     useEffect(() => {
//         fetch('https://fluttering-christiana-muhammadhanzalah-eb04cdbe.koyeb.app/newcollections')
//             .then((response) => response.json())
//             .then((data) => {
//                 // Logic: "Training" the component state with the actual backend data
//                 setNew_collection(data);
//             })
//             .catch((err) => console.log("Fetch Error: ", err));
//     }, []); // Empty dependency array ensures this "Smart Brain" only searches once on load

//     return (
//         <div className='new-collections'>
//             <h1>NEW COLLECTIONS</h1>
//             <hr />
//             <div className='collections'>
//                 {/* The Fix: We now map over 'new_collection' (the state variable) 
//                   instead of the old static 'new_collections' import.
//                 */}
//                 {new_collection.map((item, i) => {
//                     return (
//                         <Item 
//                             key={i} 
//                             id={item.id} 
//                             name={item.name} 
//                             image={item.image} 
//                             new_price={item.new_price} 
//                             old_price={item.old_price} 
//                         />
//                     );
//                 })}
//             </div>
//         </div>
//     );
// };

// export default memo(NewCollections);





















import { memo, useState, useEffect } from 'react';
import './NewCollections.css';
import Item from '../Item/Item';

const NewCollections = () => {
    const [new_collection, setNew_collection] = useState([]);

    useEffect(() => {
        fetch('https://fluttering-christiana-muhammadhanzalah-eb04cdbe.koyeb.app/newcollections')
            .then((response) => response.json())
            .then((data) => {
                setNew_collection(data);
            })
            .catch((err) => console.log("Fetch Error: ", err));
    }, []);

    return (
        <div className='new-collections'>
            <h1>NEW COLLECTIONS</h1>
            <hr />
            <div className='collections'>
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