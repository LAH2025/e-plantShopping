import React, { useState, useEffect } from 'react';
import './ProductList.css';
import { useDispatch } from 'react-redux';
import { addItem } from './CartSlice'; // Adjust the path as necessary
import CartItem from './CartItem';
function ProductList() {
    const [view, setView] = useState('home'); // 'home', 'plants', or 'cart'
    const [addedToCart, setAddedToCart] = useState({});
    const dispatch = useDispatch();  // Don't forget to initialize dispatch
    const handleAddToCart = (product) => {
        dispatch(addItem(product));
        setAddedToCart((prevState) => ({
            ...prevState,
            [product.name]: true, // Set the product name as key and value as true to indicate it's added to cart
        }));
    };
    const plantsArray = [
        // Your plants data
    ];
    const styleObj = {
        backgroundColor: '#4CAF50',
        color: '#fff!important',
        padding: '15px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        fontSize: '20px',
    };
    const styleObjUl = {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '1100px',
    };
    const styleA = {
        color: 'white',
        fontSize: '30px',
        textDecoration: 'none',
    };
    const handleCartClick = (e) => {
        e.preventDefault();
        setView('cart'); // Correcting the view to 'cart' for switching views
    };
    const handlePlantsClick = (e) => {
        e.preventDefault();
        setView('plants'); // Switching to 'plants' view
    };
    const handleContinueShopping = (e) => {
        e.preventDefault();
        setView('plants'); // Resetting view to plants when continuing shopping
    };
    const handleViewChange = (newView) => {
        setView(newView);
    };
    return (
        <div>
            <div className="navbar">
                <div className="tag">
                    <div className="luxury">
                        <img
                            src="https://cdn.pixabay.com/photo/2020/08/05/13/12/eco-5465432_1280.png"
                            alt=""
                        />
                        <a href="/" onClick={() => handleViewChange('home')}>
                            <div className="tag_home_link">
                                <h3>Paradise Nursery</h3>
                                <i>Where Green Meets Serenity</i>
                            </div>
                        </a>
                    </div>
                </div>
                <div className="ul" style={styleObjUl}>
                    <div>
                        <a href="/plants" onClick={(e) => { e.preventDefault(); handleViewChange('plants'); }}>Plants</a>
                    </div>
                    <div>
                        <a href="/cart" onClick={(e) => { e.preventDefault(); handleViewChange('cart'); }}>
                            <h1 className='cart'>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 256 256"
                                    id="IconChangeColor"
                                    height="68"
                                    width="68"
                                >
                                    <rect width="156" height="156" fill="none"></rect>
                                    <circle cx="80" cy="216" r="12"></circle>
                                    <circle cx="184" cy="216" r="12"></circle>
                                    <path
                                        d="M42.3,72H221.7l-26.4,92.4A15.9,15.9,0,0,1,179.9,176H84.1a15.9,15.9,0,0,1-15.4-11.6L32.5,37.8A8,8,0,0,0,24.8,32H8"
                                        fill="none"
                                        stroke="#faf9f9"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        stroke-width="2"
                                        id="mainIconPathAttribute"
                                    ></path>
                                </svg>
                                <div className='cart_quantity_count'>{addedToCart}</div>
                            </h1>
                        </a>
                    </div>
                </div>
            </div>
            {view === 'plants' && (
                <div className="product-grid">
                    {plantsArray.map((category, index) => (
                        <div key={index}>
                            <h1 className='plantname_heading'>
                                <div className="plant_heading">{category.category}</div>
                            </h1>
                            <div className="product-list">
                                {category.plants.map((plant, plantIndex) => (
                                    <div className="product-card" key={plantIndex}>
                                        <div className="product-title">{plant.name}</div>
                                        <img className="product-image" src={plant.image} alt={plant.name} />
                                        <div className="product-price">{plant.cost}</div>
                                        <div className="product-description"><i>{plant.description}</i></div>
                                        <button
                                            className={`product-button ${addedToCart[plant.name] ? 'added-to-cart' : ''}`}
                                            onClick={() => handleAddToCart(plant)}
                                            disabled={addedToCart[plant.name]}
                                        >
                                            {addedToCart[plant.name] ? "Added to Cart" : "Add to Cart"}
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            )}
            {view === 'cart' && (
                <CartItem onContinueShopping={() => handleViewChange('plants')} />
            )}
        </div>
    );
}
export default ProductList;
 
 