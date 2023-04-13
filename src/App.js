import { ethers } from "ethers";
import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { BannerStrip } from 'web3uikit';
import './App.css';
import Header from './components/Header';
import Homepage from './components/Homepage';
import SingleHabit from "./components/SingleHabit";
import contract_abi from "./contract_abi.json";

const CONTRACT_ADDRESS = "0x487DeBAF8b793425163594F730520234F46d03C4";

function App() {

  const [account, setAccount] = useState(null);
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [contract, setContract] = useState(null);

  const [habitIds, setHabitIds] = useState([]);

  const connectWalletHandler = () => {
    if (window.ethereum) {
      window.ethereum.request({ method: "eth_requestAccounts" }).then((result) => {
        setAccount(result[0]);
        const tempProvider = new ethers.providers.Web3Provider(window.ethereum)
        setProvider(tempProvider);
        const tempSigner = tempProvider.getSigner();
        setSigner(tempSigner);
        const tempContracts = new ethers.Contract(CONTRACT_ADDRESS, contract_abi, tempSigner);
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

  const addHabit = async ({ title, commitment, amount, totalReports, intervalInSeconds }) => {
    try {
      // const check = await contract.getUserHabitNonce(account);
      // title = check.toString() + ". " + title;
      const result = await contract.createHabit(title, commitment, totalReports, intervalInSeconds, {
        value: ethers.utils.parseEther(amount.toString()),
      });
      window.location.reload();
      connectWalletHandler();
    } catch (e) {
      window.console.log(e);
    }
  }

  const getAllHabitIds = async () => {
    const result = await contract.getUserHabits(account);
    return result;
  }

  const getHabitById = async (id) => {
    const result = await contract.getHabit(id);
    return result;
  }

  const addJournal = async (habitId, journalEntry, proofUrl) => {
    const result = await contract.report(habitId, journalEntry, proofUrl);
    return result
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
        <Route exact path="/" element={<Homepage onConnect={connectWalletHandler} addHabit={addHabit} account={account} getAllHabitIds={getAllHabitIds} getHabitById={getHabitById} />} />
        <Route exact path="/habit/:habitId" element={<SingleHabit addJournal={addJournal} getHabitById={getHabitById} />} />
        <Route exact path="*" element={<BannerStrip text="404: Page Not Found" type="error" />} />
      </Routes>
    </div>
  );
}

export default App;
