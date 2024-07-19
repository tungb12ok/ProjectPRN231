import React from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { useDispatch } from "react-redux";
import { logout } from "../../redux/slices/authSlice";
import "react-toastify/dist/ReactToastify.css";
import { signOutUser } from "../../services/authService";

const Logout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = async () => {
    console.log("log 1-------> first token");
    const token = window.localStorage.getItem('token');
    const refreshToken = window.localStorage.getItem('refreshToken');
    if (!token || !refreshToken) {
      console.error('Token or RefreshToken is missing!');
      toast.error('Token or RefreshToken is missing!'); // Display error toast
      return;
    }

    const data = {
      token: token,
      refreshToken: refreshToken
    };

    console.log("log 1-------> second");
    try {
      console.log("log 1-------> first");
      const response = await signOutUser(data);
      console.log("Logout ::::::::");
      dispatch(logout());
      navigate('/');
      toast.success('Successfully logged out!'); // Display success toast
    } catch (error) {
      console.error('There was an error making the request!', error);
      console.error('Response data:', error.response?.data);
      toast.error("There was an error signing out"); // Display error toast
    }
  };

  return (
    <div>
      <button onClick={handleLogout} className="">
        <FontAwesomeIcon className="pr-1" icon={faRightFromBracket} />
        Logout
      </button>
    </div>
  );
};

export default Logout;
