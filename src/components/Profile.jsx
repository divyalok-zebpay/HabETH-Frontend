import * as React from "react";
import { GiPlagueDoctorProfile } from "react-icons/gi";
import { Button } from "web3uikit";
import UserReports from "./UserReports";
import PendingAgreements from "./PendingAgreements";
import ReportsToValidate from "./ReportsToValidate";
import "../styles/Profile.css";

const pendingAgreements = 0,
  reportsToValidate = 1,
  myReport = 2;

export default function Profile({ account, contract, onConnect }) {
  const [sectionToShow, setSectionToShow] = React.useState(myReport);

  React.useEffect(() => {
    if (window.ethereum?.isConnected() && (!account || !contract)) {
      onConnect();
    }
  }, [account, contract]);

  return (
    <div id="profile">
      <div id="profile_left">
        <div id="profile_left_header">Profile</div>
        <GiPlagueDoctorProfile id="profile_img" />
        <button onClick={() => setSectionToShow(myReport)} className="profile_left_button">
          My Reports
        </button>
        <button onClick={() => setSectionToShow(pendingAgreements)} className="profile_left_button">
          Pending Habits
        </button>
        <button onClick={() => setSectionToShow(reportsToValidate)} className="profile_left_button">
          Pending Reports
        </button>
      </div>
      <div id="profile_right">
        {sectionToShow == myReport ? (
          <UserReports account={account} contract={contract} onConnect={onConnect} />
        ) : sectionToShow == pendingAgreements ? (
          <PendingAgreements account={account} contract={contract} onConnect={onConnect} />
        ) : (
          <ReportsToValidate account={account} contract={contract} onConnect={onConnect} />
        )}
      </div>
    </div>
  );
}
