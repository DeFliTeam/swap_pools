import styles from "./layout.module.scss";
// import Navigation from "../../__common/Navbar"
const Layout = ({ children }) => {
  return (
    <div className={styles.light}>
      <div className=" ">{children}</div>
    </div>
  );
};

export default Layout;
