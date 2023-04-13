import * as React from "react";
import { ethers } from "ethers";
import { Hero, Typography, Loading } from "web3uikit";
import HabitJournal from "./HabitJournal";
import { useParams } from "react-router-dom";
import { createHabitObjFromID } from "../utility/utility";

const LOADING = "LOADING",
  DONE = "DONE",
  ERROR = "ERROR";

const SingleHabit = ({ contract, account, onConnect }) => {
  const { habitId } = useParams();
  const [status, setStatus] = React.useState(LOADING);
  const [habit, setHabit] = React.useState(null);

  const fetchHabit = React.useCallback(
    async (habitId) => {
      try {
        let habitObj = await createHabitObjFromID(contract, habitId); 
        setHabit(habitObj);
        setStatus(DONE);
      } catch (e) {
        window.console.log("Error while fetching habit (singlehabit): ", e);
        setStatus(ERROR);
      }
    },
    [habitId, account]
  );

  React.useEffect(() => {
    if (window.ethereum?.isConnected()) {
      if (account && contract && habitId) {
        fetchHabit(habitId);
      } else {
        onConnect();
      }
    }
  }, [habitId, account]);

  return (
    <div style={{ width: "500px", margin: "auto" }}>
      {status === DONE && habit && (
        <>
          <Hero style={{ margin: "1rem" }} align="right" backgroundColor="#F5F5F5" padding="40px" rounded="20px" textColor="#ef5065">
            <React.Fragment>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  columnGap: "8px",
                  justifyContent: "space-between",
                }}
              ></div>
              <Typography variant="h4">{habit.goal}</Typography>
              <div>
                <Typography variant="caption15">I commit to: </Typography>
                <Typography variant="caption14">{habit.description}</Typography>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  width: "100%",
                }}
              >
                <Typography variant="caption14">Successful Reports: {habit.successCount}</Typography>
                <Typography variant="caption14">Missed Reports: {habit.missedCount}</Typography>
              </div>
            </React.Fragment>
          </Hero>
          {
            habit.status != "ACTIVE"
            ? <p>Can't submit report for this habit! <br></br><br></br> STATUS: <span style={{color: habit.status == "PENDING" ? "Orange" : "Red"}}>{habit.status}</span></p>
            : <HabitJournal contract={contract} habitId={habitId} />
          }
        </>
      )}
      {status === LOADING && (
        <div
          style={{
            backgroundColor: "#ECECFE",
            borderRadius: "8px",
            padding: "20px",
          }}
        >
          <Loading spinnerColor="#2E7DAF" text="Loading...." />
        </div>
      )}
      {status === ERROR && <div>Some Error Occurred</div>}
    </div>
  );
};

export default SingleHabit;
