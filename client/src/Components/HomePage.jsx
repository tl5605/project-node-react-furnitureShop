import React, { useState, useEffect } from "react";
import useAuth from "./Hooks/useAuth";
import { useAddFurnitureForBasketMutation } from "../Store/basketApiSlice";
import { useNavigate } from "react-router-dom";
import '../CSS/HomePage.css';

const HomePage = () => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const images = ["homePage3.png", "homePage1.png", "homePage2.png", "homePage4.png"];
    const Navigate = useNavigate()
    const { _id, role } = useAuth();
    const [addFurnitureFunc] = useAddFurnitureForBasketMutation();
    const basket = JSON.parse(localStorage.getItem('basket')) || [];
    let flag = false;

    const handleAdd = () => {
        if (role === 'customer') {
            basket.map(f => {
                addFurnitureFunc({ user: _id, furniture: f.furniture, quantity: f.quantity });
            });
        }
        localStorage.removeItem("basket");
    };


    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImageIndex(prevIndex => (prevIndex + 1) % images.length);
        }, 2000);

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        if (_id) {
            if (basket && !flag) {
                flag = true
                handleAdd()
            }
        }
    }, [_id])

    return (
        <>
            <div className="homepage-container">
                <div id="header">חנות רהיטים – ריהוט לבית וסלון</div>
                <div id="image-container" className="furniture-container">
                    <div className="furniture-overlay">
                        <span>בואו להנות מחווית עיצוב בחנות שלנו</span>
                        <img id="arrow" onClick={() => { role === 'manager' ? Navigate("/shopManager") : Navigate("/shop") }} src={'arrow.svg'} />
                    </div>
                    <img src={images[currentImageIndex]} alt="Furniture" />
                </div>
            </div>
        </>
    );
};

export default HomePage;
