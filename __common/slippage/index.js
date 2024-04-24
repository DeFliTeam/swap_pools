import React from "react";
import styles from "./button.module.scss";
import btnImage from "../../Assests/rocket.svg";

function Button({ primary, children, onClick }) {
  return (
    <>
      {primary ?
        <button
          onClick={onClick}
          type="button"
          className="min-w-[80px] bg-[#CE6CF7] dark:bg-[#CE6CF7] border border-[#CE6CF7] text-center text-sm text-white px-3 py-2 rounded"
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

          className="min-w-[80px] dark:bg-[#1C2024] border border-[#CE6CF7] text-sm dark:text-white text-[#4594CD] bg-transparent px-3 py-2 rounded"
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
