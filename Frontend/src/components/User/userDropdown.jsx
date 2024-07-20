import { useSelector } from "react-redux";
import { selectUser } from "../../redux/slices/authSlice";
import { motion } from "framer-motion";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/slices/authSlice";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRightFromBracket, faCaretDown, faUser } from '@fortawesome/free-solid-svg-icons'
import Logout from "../Auth/Logout";

const itemVariants = {
    open: {
        opacity: 1,
        y: 0,
        transition: { type: "spring", stiffness: 300, damping: 24 }
    },
    closed: { opacity: 0, y: 20, transition: { duration: 0.2 } }
};
export default function UserDropdown() {
    const user = useSelector(selectUser);
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleManageAccount = () => {
        navigate("/manage-account/profile");
    }

    const handleLogout = () => {
        document.cookie = "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
        document.cookie = "refreshToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
        dispatch(logout());
        navigate("/");
    };

    function closeDropModal() {
        setIsOpen(false)
    }

    return (
        <motion.nav
            initial={false}
            animate={isOpen ? "open" : "closed"}
            className="menu"
        >
            <motion.button
                whileTap={{ scale: 0.97 }}
                onClick={() => setIsOpen(!isOpen)}
                className="justify-between flex text-left items-center"
            >
                <FontAwesomeIcon icon={faUser} className="pr-1" />
                Hi! {user.FullName}
                <motion.div
                    variants={{
                        open: { rotate: 180 },
                        closed: { rotate: 0 }
                    }}
                    transition={{ duration: 0.2 }}
                >
                    <FontAwesomeIcon icon={faCaretDown} className="pl-2" />
                </motion.div>
            </motion.button>
            <motion.ul
                className="absolute"
                variants={{
                    open: {
                        clipPath: "inset(0% 0% 0% 0% round 10px)",
                        transition: {
                            type: "spring",
                            bounce: 0,
                            duration: 0.7,
                            delayChildren: 0.3,
                            staggerChildren: 0.05
                        }
                    },
                    closed: {
                        clipPath: "inset(10% 50% 90% 50% round 10px)",
                        transition: {
                            type: "spring",
                            bounce: 0,
                            duration: 0.3
                        }
                    }
                }}
                style={{ pointerEvents: isOpen ? "auto" : "none" }}
            >

                <motion.li
                    variants={itemVariants}
                    className="bg-white p-3 text-black"
                    onClick={handleManageAccount}
                >
                    <button>
                        <FontAwesomeIcon icon={faUser} className="pr-1" />
                        Manage My Account
                    </button>
                </motion.li>
                <motion.li
                    variants={itemVariants}
                    className="bg-white p-3 text-black"
                >
                    <Link
                        to="/manage-account/shipment"
                        className={({ isActive }) => isActive ? "text-orange-500" : "text-zinc-800"}
                    >
                        <FontAwesomeIcon icon={faUser} className="pr-1" />
                        Address Book
                    </Link>
                </motion.li>
                <motion.li
                    variants={itemVariants}
                    className="bg-white p-3 text-black"
                >
                    <Link
                        to="/my-orders"
                        className={({ isActive }) => isActive ? "text-orange-500" : "text-zinc-800"}
                    >
                        <FontAwesomeIcon icon={faUser} className="pr-1" />
                        My Order
                    </Link>
                </motion.li>
                <motion.li
                    variants={itemVariants}
                    className="bg-white p-3 text-black"
                onClick={handleLogout}
                >

                    <button><FontAwesomeIcon className="" icon={faRightFromBracket} /> Logout</button>
                </motion.li>
            </motion.ul>
        </motion.nav>
    )
}

