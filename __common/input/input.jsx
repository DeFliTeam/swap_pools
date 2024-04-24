import React from "react";
import classNames from "classnames";
import styles from "./input.module.scss";

const Input = (props) => {
  let {
    heading,
    rightSuffix,
    config,
    placeholder,
    error,
    validationError,
    swap,
    value,
    modalSwap,
    leftprefix,
    disabled,
  } = props;
  const toSpread = config && config ? config : props;
  return (
    <>
      <div className={styles.container}>
        {heading && <label>{heading}</label>}
        <div
          className={classNames(
            swap === true
              ? styles.inputWrapperswap
              : modalSwap === true
                ? styles.modalSwap
                : styles.inputWrapper
          )}
        // style={swap ? { background: "transparent" } : undefined}
        >
          {leftprefix ? (
            <span className={styles.lefticon}>
              <img
                src="./icons/searchicon.svg"
                alt="no-icon"
                width={16}
                height={16}
              // className=" w-[] sm:w-[12.3px] sm:h-[12.3px]"
              />
            </span>
          ) : null}

          <input
            value={value}
            required={true}
            type={modalSwap ? "text" : "number"}
            {...toSpread}
            placeholder={placeholder}
            style={error ? { color: "red" } : undefined}
            disabled={disabled}
          />
          {rightSuffix && (
            <span className="mr-[10px] flex flex-row">
              {rightSuffix ? rightSuffix : ""}
            </span>
          )}
        </div>
        {validationError ? (
          <div className={styles.error}>{validationError}</div>
        ) : null}
      </div>
    </>
  );
};

export default Input;
