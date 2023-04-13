import { ethers } from "ethers";
import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { BannerStrip } from 'web3uikit';
import './App.css';
import Header from './components/Header';
import Homepage from './components/Homepage';
import SingleHabit from "./components/SingleHabit";
import contract_abi from "./contract_abi.json";
import Profile from "./components/Profile";

function App() {
  const [account, setAccount] = useState(null);
  const [contract, setContract] = useState(null);

  const connectWalletHandler = () => {
    if (window.ethereum) {
      window.ethereum.request({ method: "eth_requestAccounts" }).then((result) => {
        const tempProvider = new ethers.providers.Web3Provider(window.ethereum)
        const tempSigner = tempProvider.getSigner();
        const tempContracts = new ethers.Contract(process.env.REACT_APP_CONTRACT_ADDRESS, contract_abi, tempSigner);
        setAccount(result[0]);
        setContract(tempContracts);
      });

      window.ethereum.on('accountsChanged', (accounts) => {
        // If user has locked/logout from MetaMask, this resets the accounts array to empty
        if (!accounts.length) {
          // logic to handle what happens once MetaMask is locked
          setAccount(null);
        } else {
          setAccount(accounts[0]);
        }
      });

      window.ethereum.on('chainChanged', () => {
        // If user has locked/logout from MetaMask, this resets the accounts array to empty
        setAccount(null);
      });

    } else {
      alert("Need to install Metamask!");
      throw new Error("Need to install Metamask!")
    }
  }

  useEffect(() => {
    if (window.ethereum?.isConnected()) {
      connectWalletHandler();
    }
  }, []);

  return (
    <div className="App">
      <Header account={account} onConnect={connectWalletHandler} />
      <Routes>
        <Route exact path="/" element={
          <Homepage
            contract={contract}
            account={account}
            onConnect={connectWalletHandler}
          />
        } />
        <Route exact path="/habit/:habitId" element={
          <SingleHabit
            account={account}
            contract={contract}
            onConnect={connectWalletHandler}
          />
        } />
        <Route exact path="/profile" element={
          <Profile
            account={account}
            contract={contract}
            onConnect={connectWalletHandler}
          />
        } />
        <Route exact path="*" element={<BannerStrip text="404: Page Not Found" type="error" />} />
      </Routes>
    </div>
  );
}

export default App;
