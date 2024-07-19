import React from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { useDispatch } from "react-redux";
import { logout } from "../../redux/slices/authSlice";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { signOutUser } from "../../services/authService";

const Logout = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLogout = async () => {
        const token = window.localStorage.getItem('token');
        const refreshToken = window.localStorage.getItem('refreshToken');
        if (!token || !refreshToken) {
            console.error('Token or RefreshToken is missing!');
            return;
        }

        const data = {
            token: token,
            refreshToken: refreshToken
        };

        try {
            const response = await signOutUser(data);
            toast.success("You have signed out successfully");
            dispatch(logout());
            navigate('/');
        } catch (error) {
            console.error('There was an error making the request!', error);
            console.error('Response data:', error.response?.data);
            toast.error("There was an error signing out");
        }
    };

    return (
        <button onClick={handleLogout} className="">
            <FontAwesomeIcon className="pr-1" icon={faRightFromBracket} />
            Logout
        </button>
    );
};

export default Logout;
