import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "./store/index";
import { createWeb3ReactRoot, Web3ReactProvider } from '@web3-react/core';
import Web3 from 'web3';
import { BrowserRouter } from 'react-router-dom';

const Web3ProviderNetwork = createWeb3ReactRoot("Network");
function getLibrary(provider) {
  return new Web3(provider);
}


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <Web3ReactProvider getLibrary={getLibrary}>
        <Web3ProviderNetwork getLibrary={getLibrary}>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </Web3ProviderNetwork>
      </Web3ReactProvider>
    </PersistGate>
  </Provider>,
);

