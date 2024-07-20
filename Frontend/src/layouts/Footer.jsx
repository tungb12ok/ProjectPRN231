import {
  faFacebook,
  faInstagram
} from "@fortawesome/free-brands-svg-icons";
import { faEnvelope, faLocationDot, faPhone } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Typography } from "@material-tailwind/react";
import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <div className="bg-gray-200 h-full">
      <div className="bg-footer bg-cover bg-center flex justify-center items-center">
        <h1 className="text-3xl py-20 text-gray-700 font-rubikmonoone drop-shadow-md">
          Follow us on
          <Link to="/" className="underline underline-offset-2 pl-8 text-blue-600">
            Facebook
          </Link>
        </h1>
      </div>

      <div className="flex justify-between items-center py-10 space-x-5">
        {/* left side */}
        <div className="pl-20 space-y-5 w-1/2 text-gray-700 font-poppins">
          <img
            src="/assets/images/Logo.png"
            alt="HighSport"
            className="max-w-sm max-h-12"
          />
          <p>
            All content on this website is protected by copyright and may not be
            used without permission from HighSport. For more information about our
            Privacy Policy, please contact our Support Center.
          </p>
          <p>Copyright © 2024 HighSport. All Rights Reserved.</p>
          <div>
            <p className="font-rubikmonoone ">Get Our Updates</p>
            <div className="flex w-2/3 bg-white border border-gray-400 rounded-full">
              <input
                className="flex-grow bg-transparent outline-none placeholder-gray-400 font-poppins pl-5"
                placeholder="Enter your email address ..."
                type="text"
              />
              <button className="bg-blue-500 text-white px-8 py-4 rounded-r-full">SUBSCRIBE</button>
            </div>
          </div>
        </div>
        {/* right side */}
        <div className="w-1/2 pb-5 pr-15">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 gap-x-8">
            <div className="space-y-4 text-gray-700 mr-10">
              <Typography
                variant="h6"
                className="text-gray-700 mb-4 text-3xl font-rubikmonoone"
              >
                Company
              </Typography>
              <Typography className="text-xl ">About Us</Typography>
              <Typography className="text-xl ">Testimonials</Typography>
              <Typography className="text-xl">FAQS</Typography>
              <Typography className="text-xl">Terms & Condition</Typography>
              <Typography className="text-xl ">Latest Update</Typography>
            </div>

            <div className="space-y-4 text-gray-700">
              <Typography
                variant="h6"
                className="text-gray-700 mb-4 text-3xl font-rubikmonoone"
              >
                Products
              </Typography>
              <Typography className="text-xl ">Men's Section</Typography>
              <Typography className="text-xl ">Women's Section</Typography>
              <Typography className="text-xl">Kid's Section</Typography>
              <Typography className="text-xl ">Shoes</Typography>
              <Typography className="text-xl">Apparel</Typography>
              <Typography className="text-xl ">Equipments</Typography>
            </div>

            <div className="space-y-4 text-gray-700">
              <Typography
                variant="h6"
                className="text-gray-700 mb-4 text-3xl font-rubikmonoone"
              >
                Support
              </Typography>
              <Typography className="text-xl ">Order Tracking</Typography>
              <Typography className="text-xl ">Payment Guide</Typography>
              <Typography className="text-xl">Help Centre</Typography>
              <Typography className="text-xl">Privacy Policy</Typography>
              <Typography className="text-xl">Return Policy</Typography>
              <Typography className="text-xl">Promo Codes</Typography>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-12 gap-x-8 mt-20">
            <div className="space-y-4 text-gray-700">
              <Typography className="text-xl">
                <FontAwesomeIcon icon={faLocationDot} className="pr-1" />
                Đại Học FPT, Hoà Lạc
              </Typography>
              <Typography className="text-xl">
                <FontAwesomeIcon icon={faPhone} className="pr-1" />
                +84 0972074620
              </Typography>
              <Typography className="text-xl">
                <FontAwesomeIcon icon={faEnvelope} className="pr-1" />
                tung020802@gmail.com
              </Typography>
            </div>

            <div className="space-y-4 text-gray-700">
              <Typography
                variant="h6"
                className="text-gray-700 mb-4 text-3xl font-rubikmonoone"
              >
                Contact
              </Typography>
              <Typography className="text-xl">
                <FontAwesomeIcon icon={faFacebook} className="pr-1 text-blue-600" />
                Facebook
              </Typography>
              <Typography className="text-xl">
                <FontAwesomeIcon icon={faInstagram} className="pr-1 text-pink-600" />
                Instagram
              </Typography>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
