import React from "react";
import styles from "./loading.module.scss";
import LoadingImage from "../../Assests/Group 2.png"
import { Wave } from "../../__common/loader/Loader";
const LoadingScreen = () => {

  return (
    <div className={styles.container}>
      <div className={styles.loaderWrapper}>
        {/* <div className={styles.logo}>
          <img src={LoadingImage} alt="logos" />
        </div> */}
        <div className="w-full flex justify-center items-center">
          <Wave />
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;
