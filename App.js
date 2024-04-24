import React, { lazy, Suspense } from "react";
import "react-toastify/dist/ReactToastify.css";
import Layout from "./Components/__common/Layout";
import { useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import LoadingScreen from "./Components/__common/loadingScreen";
import { HelmetProvider } from "react-helmet-async";
import MobileUIWalletModal from "./Components/__common/Mobile-UI-Wallet";

import { ToastContainer } from "react-toastify";
const HomePage = lazy(() => import("./Components/Home"));


const App = () => {
  const metaMaskToken = useSelector((state) => state.token.metaMaskToken);
  const useMobileWallet = useSelector((state) => state.token.useMobileWallet);
  return (
    <>
      <Suspense fallback={<LoadingScreen />}>
        <HelmetProvider>
          <ToastContainer
            hideProgressBar={true}
            position="top-right"
            className="toaster-container"
            newestOnTop={false} // To make sure new toasts appear on the left
          />
          <Layout>
            <Routes>
              <Route path="/" element={<HomePage />} />
            </Routes>
          </Layout>
        </HelmetProvider>
      </Suspense>
      {useMobileWallet && !metaMaskToken ? <MobileUIWalletModal /> : null}
    </>
  );
};
export default App;
