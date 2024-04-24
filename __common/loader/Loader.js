import { FillingBottle } from "react-cssfx-loading";
import Logo from "../../Assests/Group 2.png";
import Cart from "../../Assests/cart.svg";

import { Bars, ThreeDots } from "react-loader-spinner";
import { IoMdCheckmarkCircleOutline } from "react-icons/io"
import styles from "./loader.module.scss";
import { useSelector } from "react-redux";

export const Loader = () => {

  return (
    <div className={styles.loader}>
      <FillingBottle color="aqua" duration="2s" />
    </div>
  );
};
export const CompLoader = () => {
  // co
  // const titles = gsap.utils.toArray('p');
  // const tl = gsap.timeline();

  // titles.array.forEach(element => {
  //   let first = 'TIRED OF DOING EVERYTHING?'
  //   let second = 'JUST CHILL AND LEAVE IT TO US'

  // });
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        {/* <p>TIRED OF DOING EVERYTHING?</p>
        <p>JUST CHILL AND LEAVE IT TO US</p> */}
        <ThreeDots
          height="70"
          width="70"
          radius="9"
          color="blue"
          ariaLabel="three-dots-loading"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
        />
      </div>
    </div>
  )
}

export const BarLoader = ({ height, width }) => {
  return (
    <>
      <Bars
        height={height}
        width={width}
        color="#fff"
        ariaLabel="bars-loading"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
      />
    </>
  );
};

export const CommonButton = ({
  width,
  click,
  loading,
  title,
  type,
  Cartt,
  height,
  margin,
  isValidate,
  discountCode,
  disabled
}) => {
  const isActive = useSelector((state) => state.Layout.isActive);

  return (
    <button
      className={styles.Commonloader}
      onClick={click}
      type={type}
      disabled={loading ? true : disabled ? true : false}
    >
      {loading ? (
        <Bars
          height={width}
          width={width}
          color={isActive ? "white" : "black"}
          ariaLabel="bars-loading"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
        />
      ) : (
        <>
          {Cartt ? <img src={Cart} className="w-5 mx-2" alt="cart" /> : ""}

          {/* // <Ring color="white" duration="02s" width={width} height={height} /> */}
          {discountCode !== "" ? <p className={margin ? "mt-2" : "mt-0"}>{isValidate ? "Validate Code" : title}</p> : <>
            <p className={margin ? "mt-2" : "mt-0"}>{isValidate ? "Validated" : title}</p>
            {isValidate && <IoMdCheckmarkCircleOutline className="text-xl text-green-500" />}
          </>}

        </>
      )}
    </button>
  );
};

export const Wave = ({ width, height }) => {
  return (
    <div className={styles.barwave}>
      <img src={Logo} alt="logo" className="object-contain cursor-pointer" />
    </div>
  );
};

export const WaveDate = ({ width, height }) => {
  return (
    <div className={styles.barwaveDate}>
      <img src={Logo} alt="logo" className="object-contain cursor-pointer" />
    </div>
  );
};
