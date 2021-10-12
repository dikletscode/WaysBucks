import React from "react";

const Footer = () => {
  return (
    <footer className="bg-base h-52 w-full    mt-36    ">
      <div className="grid  md:grid-cols-3 gap-48 px-32 py-10">
        <div className="text-white">
          <ul>
            <li>Customer Service</li>
            <li>Help Center</li>
            <li>Payment Method</li>
            <li>Return and Refund</li>
            <li>Contact us</li>
          </ul>
        </div>
        <div className="text-white">
          <ul>
            <li>Payment</li>
          </ul>
        </div>
        <div className="text-white">
          <ul>
            <li>Follow Us</li>
            <li>Instagram : @wuysback.coffee</li>
            <li>Twitter :@wuysback.com</li>
            <li>Whatsapp :092093237</li>
          </ul>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
