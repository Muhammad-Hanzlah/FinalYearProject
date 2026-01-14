// import { useEffect } from "react";
// import { createContext, useState } from "react";

// export const ShopContext = createContext(null);

// const getDefaultCart = () => {
//     let cart = {};
//     for (let index = 0; index < 300 + 1; index++) {
//         cart[index] = 0;
//     }
//     return cart;
// }

// const ShopContextProvider = (props) => {

//     const[all_product,setAll_Product] = useState([]);


//     const [cartItems, setCartItems] = useState(getDefaultCart());


//     useEffect(() => {
//     if(localStorage.getItem('auth-token')){
//         fetch('http://localhost:4000/getcart', {
//             method: 'POST',
//             headers: {
//                 Accept: 'application/form-data',
//                 'auth-token': `${localStorage.getItem('auth-token')}`,
//                 'Content-Type': 'application/json',
//             },
//             body: "",
//         })
//         .then((response) => response.json())
//         .then((data) => setCartItems(data)); // Re-wiring local memory with DB memory
//     }
// }, []);



//     useEffect(()=>{
//         fetch('http://localhost:4000/allproducts')
//         .then((response)=>response.json())
//         .then((data)=>setAll_Product(data))
//     },[])

//     // const addToCart = (itemId) => {
//     //     setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
//     //     if(localStorage.getItem('auth-token')){
//     //         fetch('http://localhost:4000/addtocart',{
//     //             method:'POST',
//     //             headers:{
//     //                 Accept:'application/form-data',
//     //                 'auth-token':`${localStorage.getItem('auth-token')}`,
//     //                 'content-type':'application/json',
//     //             },
//     //             body:JSON.stringify({"itemId":itemId}),
//     //         })
//     //         .then((response)=>response.json())
//     //         .then((data)=>console.log(data));
//     //     }
//     // };



//     const addToCart = (itemId) => {
//     setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 })); // Local update
//     if(localStorage.getItem('auth-token')){ // Logic Injection: Only sync if logged in
//         fetch('http://localhost:4000/addtocart', {
//             method: 'POST',
//             headers: {
//                 Accept: 'application/form-data',
//                 'auth-token': `${localStorage.getItem('auth-token')}`,
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify({ "itemId": itemId }),
//         })
//         .then((response) => response.json())
//         .then((data) => console.log(data));
//     }
// };


// const removeFromCart = (itemId) => {
//     setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
//     if(localStorage.getItem('auth-token')){
//         fetch('http://localhost:4000/removefromcart', {
//             method: 'POST',
//             headers: {
//                 Accept: 'application/form-data',
//                 'auth-token': `${localStorage.getItem('auth-token')}`,
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify({ "itemId": itemId }),
//         })
//         .then((response) => response.json())
//         .then((data) => console.log(data));
//     }
// };

//     const getTotalCartAmount = () => {
//         let totalAmount = 0;
//         for ( const item in cartItems)
//         {
//            if(cartItems[item]>0)
//            {
//              let itemInfo = all_product.find((product) =>product.id===Number(item))
//              totalAmount += itemInfo.new_price * cartItems[item];
//            }
//         }
//         return totalAmount;
//     }


//     const getTotalCartItems = () => {
//         let totalItem = 0;
//         for (const item in cartItems){
//             if(cartItems[item]>0){
//                 totalItem += cartItems[item];
//             }
//         }
//         return totalItem;
//     }

//     const contextValue = { getTotalCartItems,getTotalCartAmount, all_product, cartItems, addToCart, removeFromCart };

//     return (
//         <ShopContext.Provider value={contextValue}>
//             {props.children}
//         </ShopContext.Provider>
//     )
// }

// export default ShopContextProvider;











import React, { useEffect, createContext, useState } from "react";

export const ShopContext = createContext(null);

const getDefaultCart = () => {
    let cart = {};
    for (let index = 0; index < 301; index++) { cart[index] = 0; }
    return cart;
}

const ShopContextProvider = (props) => {
    const [all_product, setAll_Product] = useState([]);
    const [cartItems, setCartItems] = useState(getDefaultCart());

    useEffect(() => {
        fetch('http://localhost:4000/allproducts').then((res) => res.json()).then((data) => setAll_Product(data));
        const token = localStorage.getItem('auth-token');
        if (token) {
            fetch('http://localhost:4000/getcart', {
                method: 'POST',
                headers: { 'auth-token': token, 'Content-Type': 'application/json' },
                body: "",
            }).then((res) => res.json()).then((data) => setCartItems(data));
        }
    }, []);

    const addToCart = (itemId) => {
        setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
        if (localStorage.getItem('auth-token')) {
            fetch('http://localhost:4000/addtocart', {
                method: 'POST',
                headers: { 'auth-token': localStorage.getItem('auth-token'), 'Content-Type': 'application/json' },
                body: JSON.stringify({ "itemId": itemId }),
            });
        }
    };

    const removeFromCart = (itemId) => {
        setCartItems((prev) => ({ ...prev, [itemId]: Math.max(prev[itemId] - 1, 0) }));
        if (localStorage.getItem('auth-token')) {
            fetch('http://localhost:4000/removefromcart', {
                method: 'POST',
                headers: { 'auth-token': localStorage.getItem('auth-token'), 'Content-Type': 'application/json' },
                body: JSON.stringify({ "itemId": itemId }),
            });
        }
    };

    const clearCart = () => { setCartItems(getDefaultCart()); };
    const getTotalCartAmount = () => {
        let total = 0;
        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                let info = all_product.find((p) => p.id === Number(item));
                if (info) total += info.new_price * cartItems[item];
            }
        }
        return total;
    };
    const getTotalCartItems = () => {
        let total = 0;
        for (const item in cartItems) { if (cartItems[item] > 0) total += cartItems[item]; }
        return total;
    };

    const contextValue = { getTotalCartItems, getTotalCartAmount, all_product, cartItems, addToCart, removeFromCart, clearCart };
    return <ShopContext.Provider value={contextValue}>{props.children}</ShopContext.Provider>
}
export default ShopContextProvider;