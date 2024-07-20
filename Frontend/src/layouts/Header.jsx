import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faMagnifyingGlass,
    faLocationDot,
    faPhone,
    faEnvelope,
    faCaretDown,
    faUser,
    faCartShopping,
} from '@fortawesome/free-solid-svg-icons';
import GetCurrentLocation from "../components/GetCurrentLocation";
import { useTranslation } from "react-i18next";
import i18n from "i18next";
import { Switch } from '@headlessui/react'
import SignInModal from "../components/Auth/SignInModal";
import { motion, useScroll } from "framer-motion";

function Header() {
    const { scrollYProgress } = useScroll();
    const { t } = useTranslation("translation");
    const [enabled, setEnabled] = useState(false);

    const changeLanguage = () => {
        const languageValue = enabled ? 'eng' : 'vie';
        i18n.changeLanguage(languageValue);
    }

    return (
        <>
            <div className="w-full relative z-50">
                <div className="fixed top-0 left-0 right-0">
                    <div className="bg-white/90 shadow-md backdrop-blur-lg font-medium text-black flex justify-between items-center relative text-xs py-2">
                        <div className="flex pl-20 items-center space-x-2">
                            <FontAwesomeIcon icon={faLocationDot} className="text-gray-600" />
                            <GetCurrentLocation />
                            <Switch
                                checked={enabled}
                                onChange={() => {
                                    setEnabled(!enabled);
                                    changeLanguage();
                                }}
                                className={`${enabled ? 'bg-blue-200' : 'bg-blue-500'
                                    }  relative inline-flex h-5 w-10 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white/75`}
                            >
                                <span
                                    aria-hidden="true"
                                    className={`${enabled ? 'translate-x-0' : 'translate-x-5'
                                        } pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
                                />
                            </Switch>
                            <span className="text-blue-500">{enabled ? 'VI' : 'EN'}</span>
                        </div>
                        <div className="flex w-1/4 bg-white border-2 border-blue-500 rounded-full  p-2 mx-auto">
                            <input
                                className="flex-grow bg-transparent outline-none placeholder-gray-400"
                                placeholder="Enter your search keywords here"
                                type="text"
                            />
                            <FontAwesomeIcon icon={faMagnifyingGlass} className="items-center text-blue-500 font-medium pr-3" />
                        </div>
                        <div className="flex pr-20 items-center space-x-4">
                            <p><FontAwesomeIcon icon={faPhone} className="pr-1 text-gray-600" />+84 972-074-620</p>
                            <p><FontAwesomeIcon icon={faEnvelope} className="pr-1 text-gray-600" />tung020802@gmail.com</p>
                        </div>
                    </div>

                    <div className="bg-blue-800/80 backdrop-blur-lg text-white flex justify-between items-center text-base font-normal py-5 pr-20">
                        <div className="flex space-x-10 pl-20">
                            <Link to="/" className="hover:text-blue-200">
                                {t("header.home")}
                            </Link>
                            <Link to="/product" className="hover:text-blue-200">
                                {t("header.product")}
                                <FontAwesomeIcon icon={faCaretDown} className="pl-2" />
                            </Link>
                            <Link to="/" className="hover:text-blue-200">{t("header.blog")}</Link>
                            <Link to="/about-us" className="hover:text-blue-200">{t("header.about")}</Link>
                            <Link to="/contact-us" className="hover:text-blue-200">{t("header.contact")}</Link>
                        </div>
                        <div className="flex space-x-4">
                            <SignInModal />
                            <Link to="/cart" className="hover:text-blue-200">
                                <FontAwesomeIcon icon={faCartShopping} className="pr-1" /> {t("header.cart")}
                            </Link>
                        </div>
                    </div>
                    <motion.div
                        className="progress-bar"
                        style={{ scaleX: scrollYProgress }}
                    />
                </div>
            </div>
        </>
    )
}

export default Header;
