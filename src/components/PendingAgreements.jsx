import * as React from "react";
import { getHabitValidatorRequests, createHabitObjFromID, acceptValidatorRole, declineValidatorRole } from "../utility/utility";
import "../styles/UserReports.css";
import HabitCard from "./HabitCard2";


export default function PendingAgreements({ account, contract, onConnect }) {
  const [pendingAgreements, setPendingAgreements] = React.useState([]);

  const fetchPendingAgreements = async () => {
    try {
      const userPendingAgreements = await getHabitValidatorRequests(contract, account);

      let habitsList = [];
      for (const habitId of userPendingAgreements) {
        let habitObj = await createHabitObjFromID(contract, habitId);
        habitsList.push(habitObj);
      }

      setPendingAgreements(habitsList);
    } catch (e) {
      window.console.log("Error fetching reports: ", e);
    }
  };

  React.useEffect(() => {
    if (window.ethereum?.isConnected() && account && contract) {
      fetchPendingAgreements();
    } else {
      onConnect();
    }
  }, [account, contract]);

  return (
    <div id="reports_section">
      <div className="reports_section_header">
        <div className="section_header_text">Habit Validator Requests</div>
      </div>
      <div className="section_content">
        {pendingAgreements.map((habit) => (
          <HabitCard 
            contract={contract} 
            habit={habit} 
            account={account} 
            accept={acceptValidatorRole} 
            reject={declineValidatorRole} 
            showButtons={true}
          />
        ))}
      </div>
    </div>
  );
}
