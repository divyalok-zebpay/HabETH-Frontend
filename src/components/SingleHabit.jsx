import * as React from "react";
import { ethers } from "ethers";
import { Hero, Typography, Loading } from "web3uikit";
import HabitJournal from "./HabitJournal";
import { useParams } from "react-router-dom";

const LOADING = "LOADING",
  DONE = "DONE",
  ERROR = "ERROR";

const SingleHabit = ({ addJournal, getHabitById }) => {
  const { habitId } = useParams();
  const [status, setStatus] = React.useState(LOADING);
  const [habit, setHabit] = React.useState(null);

  const fetchHabit = React.useCallback(
    async (habitId) => {
      try {
        setStatus(LOADING);
        const response = await getHabitById(habitId);

        const durationInSeconds =
          response[5].toNumber() * response[6].toNumber();
        let durationText = "1 day";
        if (durationInSeconds >= 2629800) {
          durationText = (durationInSeconds / 2629800).toFixed(1) + " months";
        } else if (durationInSeconds >= 604800) {
          durationText = (durationInSeconds / 604800).toFixed(1) + " weeks";
        } else if (durationInSeconds >= 86400) {
          durationText = (durationInSeconds / 86400).toFixed(1) + " days";
        }
        const habitObj = {
          id: habitId,
          goal: response[1],
          description: response[2],
          amount: ethers.utils.formatEther(response[4]),
          duration: durationText,
          status: response[7] ? "COMPLETED" : "ACTIVE",
          successCount: response[8].toNumber(),
          missedCount: response[9].toNumber(),
        };
        setHabit(habitObj);
        setStatus(DONE);
      } catch (e) {
        setStatus(ERROR);
      }
    },
    [getHabitById]
  );

  React.useEffect(() => {
    if (habitId) {
      // Call the API to get the habit
      fetchHabit(habitId);
    }
  }, [habitId, fetchHabit]);

  return (
    <div style={{ width: "500px", margin: "auto" }}>
      {status === DONE && habit && (
        <>
          <Hero
            style={{ margin: "1rem" }}
            align="right"
            backgroundColor="#F5F5F5"
            padding="40px"
            rounded="20px"
          >
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
                <Typography variant="caption16">I commit to: </Typography>
                <Typography variant="caption14">{habit.description}</Typography>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  width: "100%",
                }}
              >
                <Typography variant="caption14">
                  Successful Reports: {habit.successCount}
                </Typography>
                <Typography variant="caption14">
                  Missed Reports: {habit.missedCount}
                </Typography>
              </div>
            </React.Fragment>
          </Hero>
          <HabitJournal addJournal={addJournal} habitId={habitId} />
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
