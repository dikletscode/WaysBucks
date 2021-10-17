import React, { ChangeEvent } from "react";
import { icon } from "../../../assets/assetsRegister";
import { ProfileType } from ".";

const Profile: React.FC<{
  user: ProfileType | null;
  handleImage: (e: ChangeEvent<HTMLInputElement>) => void;
}> = ({ user, handleImage }) => {
  let date = (db: Date) => {
    let dt = new Date(db);
    return dt.toDateString();
  };
  return (
    <>
      {user ? (
        <div className="bg-white p-3 border-t-4 mx-auto lg:mx-0 lg:w-1/3 border-gray-300">
          <div className=" overflow-hidden flex  justify-center">
            <div className="py-3 center mx-auto">
              <div className="bg-white px-4 py-5 rounded-lg shadow-lg text-center w-48">
                <div className="mb-4">
                  <img
                    className=" mx-auto rounded-full object-cover h-40 w-40 object-center"
                    src={
                      user?.profile.image
                        ? user?.profile.image
                        : icon.defaultProfile
                    }
                    alt="Avatar Upload"
                  />
                </div>
                <label className="cursor-pointer mt-6">
                  <span className="mt-2 leading-normal px-4 py-2 bg-blue-500 text-white text-sm rounded-full">
                    Select Avatar
                  </span>
                  <input
                    type="file"
                    className="hidden"
                    onChange={handleImage}
                  />
                </label>
              </div>
            </div>
            {/* <label className="border-2  inline-block  cursor-pointer bg-red-500  ">
              <input
                type="file"
                id="fullname"
                className="h-10 w-10 absolute opacity-0 "
                onChange={handleImage}
              />
              <img
                className="h-40 w-40 object-cover mx-auto"
               
                alt=""
              />
            </label> */}
          </div>
          <h1 className="text-gray-900 font-bold text-xl leading-8 my-1">
            {user.profile.fullname}
          </h1>
          <h3 className="text-gray-600 font-lg text-semibold leading-6">
            Customer
          </h3>

          <ul className="bg-gray-100 text-gray-600 hover:text-gray-700 hover:shadow py-2 px-3 mt-3 divide-y rounded shadow-sm">
            <li className="flex items-center py-3">
              <span>Status</span>
              <span className="ml-auto">
                <span className="bg-green-500 py-1 px-2 rounded text-white text-sm">
                  Active
                </span>
              </span>
            </li>
            <li className="flex items-center py-3">
              <span>Member since</span>
              <span className="ml-auto">{date(user.createdAt)}</span>
            </li>
          </ul>
        </div>
      ) : (
        <div>s</div>
      )}
    </>
  );
};
export default Profile;
