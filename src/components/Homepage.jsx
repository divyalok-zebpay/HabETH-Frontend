import * as React from "react";
import HabitsList from "./User";
import HowToUse from "./Usage";
import { useEffect } from "react";
import { useState } from "react";
import contract_abi from "../contract_abi.json";
import { useCallback } from "react";
import { ethers } from "ethers";
import "../styles/Homepage.css";
import { getAllHabitIds, createHabitObjFromID } from "../utility/utility";

const HomePage = ({ contract, account, onConnect }) => {
  const [habits, setHabits] = useState([]);

  const fetchHabits = useCallback(async () => {
    try {
    if (account) {
      const result = await getAllHabitIds(contract, account);
      let habitList = [];
      for (const habitId of result) {
        let habitObj = await createHabitObjFromID(contract, habitId);
        habitList.push(habitObj);
      }
      setHabits(habitList);
    }
    } catch(e) {
      window.console.log("Couldn't fetch user habits: ", e);
    }
  }, [account]);

  const fetchHabitsTemp = React.useCallback(async () => {
    try {
      const provider1 = new ethers.providers.JsonRpcProvider("https://rpc.ankr.com/polygon_mumbai");
      const contract = new ethers.Contract(process.env.REACT_APP_CONTRACT_ADDRESS, contract_abi, provider1);

      const userHabits = await getAllHabitIds(contract, account);

      let habitList = [];
      for (const habitId of userHabits) {
        let habitObj = await createHabitObjFromID(contract, habitId);
        habitList.push(habitObj);
      }

      setHabits(habitList);
    } catch (e) {
      window.console.log("Couldn't fetch user habits: ", e);
    }
  }, [account]);

  useEffect(() => {
    if (window.ethereum?.isConnected() && contract && account) {
      fetchHabits();
    } else {
      onConnect();
    }
  }, [account, contract]);

  return (
    <React.Fragment>
      {account ? (
        <>
          <div id="homepage_div">
            <HabitsList contract={contract} habits={habits} />
          </div>
        </>
      ) : (
        <HowToUse onConnect={onConnect} />
      )}
    </React.Fragment>
  );
};

export default HomePage;
