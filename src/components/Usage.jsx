import * as React from "react";
import { Stepper, Typography } from "web3uikit";

const stepperDiv = {
  margin: "1rem auto",
  height: "1px",
  minHeight: "300px",
  maxWidth: "500px",
};

const HowToUse = ({ onConnect }) => {
  return (
    <div style={stepperDiv}>
      <Typography variant="h1" style={{ marginBottom: "1rem" }}>
        <strong>How it works?</strong>
      </Typography>
      <Stepper
        onComplete={onConnect}
        // onNext={() => {}}
        // onPrev={() => {}}
        completeMessage=""
        completeTitle="Connect your wallet now and be ready to stick to your goals."
        step={1}
        stepData={[
          {
            content: <p>Ready to finally stick to your Goals? </p>,
            title: "Welcome to the HabETH",
          },
          {
            content: "Connect your metamask wallet",
            title: "Connect your wallet",
          },
          {
            content: (
              <div>
                <p>
                  Add your goal, duration, accountability partner, amount to be staked, and the reporting interval.
                  <br />
                </p>
              </div>
            ),
            title: "Add Habit",
          },
          {
            content: <p>Stake the amount for the habit</p>,
            title: "Stake the amount",
          },
          {
            content: (
              <p>
                Report whether you completed the habit or not for a particular interval. This will be verified by your accountability partner. Your
                amount is deducted if: <br />
                1) You report that you were unsuccessful; or <br /> 2) Your accountability partner reports that you were unsuccessful; or <br />
                3) You fail to make a required report by the end of the day (11:59 P.M.) of a required reporting day.
              </p>
            ),
            title: "Journal Progress",
          },
        ]}
      />
    </div>
  );
};

export default HowToUse;
