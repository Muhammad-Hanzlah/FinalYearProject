import { useState, memo } from 'react';
import './AddProduct.css';
import upload_area from '../../assets/upload_area.svg';

const AddProduct = () => {
    const [image, setImage] = useState(false);
    const [productDetails, setProductDetails] = useState({
        name: '',
        image: '',
        category: 'women',
        new_price: '',
        old_price: ''
    });

    const changeHandler = (e) => {
        setProductDetails({ ...productDetails, [e.target.name]: e.target.value });
    };

    const imageHandler = (e) => {
        setImage(e.target.files[0]);
    };

    const Add_Product = async () => {
        console.log("Starting Product Upload...", productDetails);
        
        let responseData;
        let product = { ...productDetails }; // Create a fresh copy

        // Validation: Ensure an image is selected
        if (!image) {
            alert("Please select a product image");
            return;
        }

        let formData = new FormData();
        formData.append('product', image);

        try {
            // STEP 1: Upload Image to Server
            // Fixed the URL (added colon) and changed method to uppercase POST
            const uploadResponse = await fetch('http://localhost:4000/upload', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    // Note: Do NOT set Content-Type for FormData, browser does it automatically
                },
                body: formData,
            });

            responseData = await uploadResponse.json();

            if (responseData.success) {
                // STEP 2: If image upload is successful, add the URL to product object
                product.image = responseData.image_url;
                console.log("Image Uploaded Successfully. Final Object:", product);

                // STEP 3: Save the complete product to the Database
                const addResponse = await fetch('http://localhost:4000/addproduct', {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(product),
                });

                const addData = await addResponse.json();

                if (addData.success) {
                    alert("Product Added Successfully!");
                    // Optional: Reset form here
                    window.location.reload(); 
                } else {
                    alert("Failed to save product to database.");
                }
            } else {
                alert("Image upload failed. Check backend.");
            }
        } catch (error) {
            console.error("Critical Error:", error);
            alert("Could not connect to the server. Is your backend running on port 4000?");
        }
    };

    return (
        <div className='add-product'>
            <div className="addproduct-itemfield">
                <p>Product Title</p>
                <input value={productDetails.name} onChange={changeHandler} type="text" name='name' placeholder='Type here' />
            </div>
            <div className="addproduct-price">
                <div className="addproduct-itemfield">
                    <p>Price</p>
                    <input value={productDetails.old_price} onChange={changeHandler} type="text" name='old_price' placeholder='Type Here' />
                </div>
                <div className="addproduct-itemfield">
                    <p>Offer Price</p>
                    <input value={productDetails.new_price} onChange={changeHandler} type="text" name='new_price' placeholder='Type Here' />
                </div>
            </div>
            <div className="addproduct-itemfield">
                <p>Product Category</p>
                <select value={productDetails.category} onChange={changeHandler} name="category" className='add-product-selector'>
                    <option value="women">Women</option>
                    <option value="men">Men</option>
                    <option value="kid">Kid</option>
                </select>
            </div>
            <div className="addproduct-itemfield">
                <label htmlFor="file-input">
                    <img 
                        src={image ? URL.createObjectURL(image) : upload_area} 
                        className='addproduct-thumbnail-img' 
                        alt="Preview" 
                    />
                </label>
                <input onChange={imageHandler} type="file" name='image' id='file-input' hidden />
            </div>
            <button onClick={Add_Product} className='addproduct-btn'>ADD</button>
        </div>
    );
};

export default memo(AddProduct);