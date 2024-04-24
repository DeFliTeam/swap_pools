import React from "react";
import styles from "./button.module.scss";
import btnImage from "../../Assests/rocket.svg";
import { Bars } from "react-loader-spinner";

function Button({ primary, children, onClick }) {
  return (
    <>
      {primary ?
        <button
          onClick={onClick}
          type="button"

          style={{ backgroundImage: "linear-gradient(to right, #ce6cf7, #5860cb)", zIndex: 40 }}
          className="w-full min-w-[80px]  text-center text-sm text-white px-3 py-2 rounded"
        >
          <div className="flex justify-center">

            {children}

          </div>
        </button>
        :
        <button
          onClick={onClick}
          type="button"
          style={{ backgroundImage: "linear-gradient(to right, #ce6cf7, #5860cb)", zIndex: 40 }}

          className="min-w-[80px] border border-[#CE6CF7] text-sm text-white px-3 py-2 rounded"
        >
          <div className="flex justify-center">
            <img
              alt="button"
              src={btnImage}
              className="mr-2 object-contain"
              height="12px"
              width="17px"
            />
            {children}
          </div>
        </button>
      }
    </>
  );
}

export default Button;


export const SlippageButton = ({ primary, children, onClick }) => {
  return (
    <>
      {primary ?
        <button
          onClick={onClick}
          type="button"
          className="min-w-[20px]  bg-[#CE6CF7] dark:bg-[#CE6CF7] border border-[#CE6CF7] text-center text-black text-xs dark:text-white px-1 py-1 rounded"
        >
          {children}
        </button>
        :
        <button
          onClick={onClick}
          type="button"
          className="min-w-[20px] dark:bg-[#1C2024] border border-[#CE6CF7] text-xs dark:text-white text-black bg-transparent px-1 py-1 rounded"
        >
          {children}
        </button>
      }
    </>
  );
}

export const AbsoluteButton = ({ primary, children, onClick }) => {
  return (
    <>
      {primary ?
        <button
          onClick={onClick}
          type="button"
          style={{ backgroundImage: "linear-gradient(to right,#ce6cf7,#5860cb)", }}
          className="min-w-[80px] absolute top-[25%] left-0 z-[100]  text-center text-sm text-white px-3 py-2 rounded"
        >
          <div className="flex justify-center">
            <img
              alt="button"
              src={btnImage}
              className="mr-2 object-contain"
              height="12px"
              width="17px"
            />
            {children}
          </div>
        </button>
        :
        <button
          onClick={onClick}
          type="button"
          className="min-w-[80px] absolute top-[25%] left-0 z-[100] dark:bg-[#1C2024] border border-[#CE6CF7] text-sm dark:text-white text-gray-400 bg-transparent px-3 py-2 rounded"
        >
          <div className="flex justify-center">
            <img
              alt="button"
              src={btnImage}
              className="mr-2 object-contain"
              height="12px"
              width="17px"
            />
            {children}
          </div>
        </button>
      }
    </>
  );
}