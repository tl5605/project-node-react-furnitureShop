import React, { useEffect } from "react";
import useAuth from "./Hooks/useAuth";
import { useAddFurnitureForBasketMutation } from "../Store/basketApiSlice";
import { Link } from "react-router-dom";
import '../CSS/HomePage.css'


const HomePage = () => {

    const handleAdd = () => {
        console.log("1");
        basket.map(f => {
            addFurnitureFunc({ user: _id, furniture: f.furniture, quantity: f.quantity })
        })
        localStorage.removeItem("basket")
    }

    const { _id } = useAuth()
    const [addFurnitureFunc] = useAddFurnitureForBasketMutation()
    const basket = JSON.parse(localStorage.getItem('basket')) || []


    useEffect(() => {
        if (_id) {
            if (basket) {
                handleAdd()
            }
        }
    }, [_id])



    return (
        <>
            {/* <div id="sale">מבצעים חמים באתר</div> */}

            
            <Link to="/sofasCustomer">
                <div id="sofas" className="furniture-container">
                    <div className="furniture-overlay">ספות</div>
                    <img src="sofas.png" />
                </div>
            </Link>

            <Link to="/chairsCustomer">
                <div id="chairs" className="furniture-container">
                    <div className="furniture-overlay">כסאות</div>
                    <img src="chairs.png" />
                </div>
            </Link>

            <Link to="/armchairsCustomer">
                <div id="armchairs" className="furniture-container">
                    <div className="furniture-overlay">כורסאות</div>
                    <img src="armchairs.png" />
                </div>
            </Link>

            <Link to="/tablesCustomer">
                <div id="tables" className="furniture-container">
                    <div className="furniture-overlay">שולחנות</div>
                    <img src="tables.png" />
                </div>
            </Link>

            
        </>
    )
}

export default HomePage



