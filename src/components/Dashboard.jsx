// This is the dashboard component to show the stats
import * as React from "react";
import { Widget } from "web3uikit";
export default function Dashboard() {
  return (
    <div>
      <h1> Dashboard </h1>
      <div style={{ display: "grid", gap: "20px", padding: "40px 20px" }}>
        <section style={{ display: "flex", gap: "20px" }}>
          <Widget info="1 ETH" title="Total Value Locked" />
          <Widget info="54" title="No of habits" />
          <Widget info="0.7 ETH" title="Amount withdrawn" />
        </section>
      </div>
    </div>
  );
}
