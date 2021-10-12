import React from "react";

const Footer = () => {
  return (
    <footer className="flex justify-center bg-base mt-20 px-4 text-gray-100 ">
      <div className="container py-6">
        <h1 className="text-center text-lg font-bold lg:text-2xl">
          join the coffee community
        </h1>

        <div className="flex justify-center mt-6">
          <div className="bg-white rounded-lg">
            <div className="flex flex-wrap justify-between md:flex-row">
              <input
                type="email"
                className="m-1 p-2 appearance-none text-gray-700 text-sm focus:outline-none"
                placeholder="Enter your email"
              />
              <button className="w-full m-1 p-2 text-sm bg-gray-800 rounded-lg font-semibold uppercase lg:w-auto">
                subscribe
              </button>
            </div>
          </div>
        </div>

        <hr className="h-px mt-6 bg-gray-700 border-none" />

        <div className="flex flex-col items-center justify-between mt-6 md:flex-row">
          <div>
            <h2> WaysBuck</h2>
          </div>
          <div className="flex mt-4 md:m-0">
            <div className="-mx-4"></div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
