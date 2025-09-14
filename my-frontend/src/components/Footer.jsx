// src/components/common/Footer.jsx
import React from "react";

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200 text-gray-600 text-center py-5 mt-auto text-sm md:text-base shadow-sm">
      <p className="font-medium">
        © {new Date().getFullYear()}{" "}
        <span className="text-blue-600 font-semibold hover:underline cursor-pointer">
          Event Management System
        </span>
        . All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
