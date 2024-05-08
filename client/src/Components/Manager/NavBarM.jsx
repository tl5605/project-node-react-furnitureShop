
import React from "react";
import "primereact/resources/themes/lara-light-cyan/theme.css";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import '../../CSS/NavBar.css'
import 'primeicons/primeicons.css';
import { Menubar } from 'primereact/menubar';
import { removeToken } from "../../Store/authSlice";
import { useSelector } from "react-redux";
import { selectToken } from "../../Store/authSlice"
import { useDispatch } from 'react-redux';
import useAuth from "../Hooks/useAuth";


const NavBarM = () => {

    const { role } = useAuth()

    const dispatch = useDispatch()
    const token = useSelector(selectToken)
    const location = useLocation();
    const navigate = useNavigate();

    const handleLogout = () => {
        // Perform logout action here
        // For example, you can clear user session, remove tokens, etc.
        dispatch(removeToken()); // Assuming this removes the authentication token from the store
        // Then navigate to the desired route, for example, homePage

        navigate("/");
    };

    
    const items = [
        { label: <NavLink underline="none" to="/" className={location.pathname === "/" ? "active-link" : ""}>בית</NavLink>, url: "/" },
        { label: <NavLink underline="none" to="/tablesManager" className={location.pathname === "/tablesManager" ? "active-link" : ""}>שולחנות</NavLink>, url: "/tablesManager" },
        { label: <NavLink underline="none" to="/armchairsManager" className={location.pathname === "/armchairsManager" ? "active-link" : ""}>כורסאות</NavLink>, url: "/armchairsManager" },
        { label: <NavLink underline="none" to="/sofasManager" className={location.pathname === "/sofasManager" ? "active-link" : ""}>ספות</NavLink>, url: "/sofasManager" },
        { label: <NavLink underline="none" to="/chairsManager" className={location.pathname === "/chairsManager" ? "active-link" : ""}>כסאות</NavLink>, url: "/chairsManager" },
        { label: <span className="pi pi-user"></span>,items:[
            {label: <NavLink underline="none" to="/login" className={location.pathname === "/login" ? "active-link" : ""}>התחברות</NavLink>, url: "/login" },
            {label: <NavLink underline="none" to="/" className={location.pathname === "/" ? "active-link" : ""} onClick={handleLogout}>התנתקות</NavLink>, url: "/"},
           
        ]}  
    ];


    return (
        <>
            <div>
                <Menubar model={items} />
                {/* <TabMenu model={items} /> */}
            </div>
        </>
    )
}

export default NavBarM



