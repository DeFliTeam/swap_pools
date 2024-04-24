import React, { useCallback, useEffect, useRef } from "react";
import OutsideClickHandler from "react-outside-click-handler";
import cn from "classnames";
import styles from "./modal.module.scss";


export default function Modal({ visible, onClose, children, btn, outerStyle, btnStyle, width, showModal2, togglepopup }) {
  const escFunction = useCallback(
    (e) => {
      if (e.type === "click") {
        e.preventDefault();
      }
      if (e.keyCode === 27) {
        onClose();
      }
    },
    [onClose]
  );

  const handleScrollHidden = async () => {
    const width = ((window.innerWidth) - (document.documentElement.clientWidth));
    if (visible) {
      // document.body.style.background = "#171717";
      document.body.style.overflow = "hidden";
      document.body.style.marginRight = `${width}px`;
    } else {
      // document.body.style.background = "black";
      document.body.style.overflow = "unset";
      document.body.style.marginRight = "0px";
    }
  }
  useEffect(() => {
    handleScrollHidden()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible, togglepopup])

  useEffect(() => {
    document.addEventListener("keydown", escFunction, false);
    document.removeEventListener("click", escFunction, false);
    return () => {
      document.removeEventListener("keydown", escFunction, false);
      document.removeEventListener("click", escFunction, false);
    };
  }, [escFunction]);

  const scrollRef = useRef(null);


  useEffect(() => {

  }, [visible]);
  if (visible) {
    return (
      <div className={`${showModal2 ? styles.modal2 : styles.modal}`} ref={scrollRef}  >
        <div className={width ? styles.outerr : cn(styles.outer)} style={outerStyle}>
          <OutsideClickHandler onOutsideClick={onClose}>

            {btn && (
              <button className={styles.close} onClick={onClose} style={btnStyle}>
                close
              </button>
            )}

            {children}
          </OutsideClickHandler>
        </div>
      </div>
    );
  } else {
    return null;
  }
}
