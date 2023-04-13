import * as React from "react";
import Dashboard from "./Dashboard";
import HabitsList from "./User";
import HowToUse from "./Usage";
import { useEffect } from "react";
import { useState } from "react";
import { useCallback } from "react";
import contract_abi from "../contract_abi.json";
import { ethers } from "ethers";
const CONTRACT_ADDRESS = "0x487DeBAF8b793425163594F730520234F46d03C4";

const HomePage = ({
  addHabit,
  account,
  getHabitById,
  getAllHabitIds,
  onConnect,
}) => {
  const [habits, setHabits] = useState([]);
  const [habitIds, setHabitIds] = useState([]);
  const [fetching, setFetching] = useState(true);
  // const fetchHabits = useCallback(async () => {
  //   if (account) {
  //     const result = await getAllHabitIds();
  //     setHabitIds(result);
  //     const habits = await Promise.all([result.map((id) => getHabitById(id))]);
  //     setHabits(habits);
  //   }
  // });

  const fetchHabits = React.useCallback(async () => {
    const provider1 = new ethers.providers.JsonRpcProvider(
      "https://rpc.ankr.com/polygon_mumbai"
    );

    const contract = new ethers.Contract(
      CONTRACT_ADDRESS,
      contract_abi,
      provider1
    );

    contract
      .getUserHabits(account)
      .then((res) => {
        const habitsmap = [];
        res.map((r) => {
          contract
            .getHabit(r)
            .then((res2) => {
              const durationInSeconds = res2[5].toNumber() * res2[6].toNumber();
              let durationText = "1 day";
              if (durationInSeconds >= 2629800) {
                durationText =
                  (durationInSeconds / 2629800).toFixed(0) + " months";
              } else if (durationInSeconds >= 604800) {
                durationText =
                  (durationInSeconds / 604800).toFixed(0) + " weeks";
              } else if (durationInSeconds >= 86400) {
                durationText = (durationInSeconds / 86400).toFixed(0) + " days";
              }

              const habitObj = {
                id: r.toString(),
                goal: res2[1],
                description: res2[2],
                amount: ethers.utils.formatEther(res2[4]),
                duration: durationText,
                status: res2[7] ? "COMPLETED" : "ACTIVE",
                successCount: res2[8].toNumber(),
                missedCount: res2[9].toNumber(),
              };
              habitsmap.push(habitObj);
              setHabits(habitsmap);
            })
            .catch((e) => {});
        });
      })
      .catch((e) => {});
  }, [account]);

  useEffect(() => {
    fetchHabits();
  }, [account]);

  return (
    <React.Fragment>
      {account ? (
        <>
          {/* <Dashboard /> */}
          <div
            style={{
              margin: "0.5rem auto",
              width: "480px",
              padding: "0.5rem",
              border: "1px solid rgb(193, 216, 231)",
              borderRadius: "1rem",
            }}
          >
            <HabitsList addHabit={addHabit} habits={habits} />
          </div>
        </>
      ) : (
        <HowToUse onConnect={onConnect} />
      )}
    </React.Fragment>
  );
};

export default HomePage;
