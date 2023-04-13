import * as React from "react";
import { Typography } from "web3uikit";

const container = {
  margin: "1rem auto",
  padding: "1rem",
  border: "1px solid rgb(193, 216, 231)",
  borderRadius: "1rem",
};

const innerContainer = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
};

const badge = {
  color: "#fff",
  background: "rgb(0, 209, 174)",
  padding: "0.25rem",
  borderRadius: "0.5rem",
  fontSize: "12px",
};

export default function HabitCard({ goal, description, duration, completedOn, status }) {
  return (
    <div style={container}>
      <div style={innerContainer}>
        <Typography color="#ef5065" >{goal}</Typography>
        {status === "COMPLETED" && completedOn && <div style={badge}>{`Completed ${completedOn}`}</div>}
        {status === "ACTIVE" && <div style={{ ...badge, background: "rgb(235, 187, 0)" }}>Active</div>}
      </div>
      <div style={innerContainer}>
        <Typography variant="caption12" style={{ maxWidth: "50%", textAlign: "left" }}>
          {description}
        </Typography>
        <Typography variant="caption14">Duration: {duration}</Typography>
      </div>
    </div>
  );
}
