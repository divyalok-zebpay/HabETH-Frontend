import * as React from "react";
import { getReportApprovalRequests, createReportObjFromID, validateReport, declineReport } from "../utility/utility";
import ReportCard from "./ReportCard";
import "../styles/UserReports.css";


export default function ReportsToValidate({ account, contract, onConnect }) {
  const [pendingReports, setPendingReports] = React.useState([]);

  const fetchPendingReport = async () => {
    try {
      const userPendingReports = await getReportApprovalRequests(contract, account);

      let reportsList = [];
      for (const reportId of userPendingReports) {
        let reportObj = await createReportObjFromID(contract, reportId);
        reportsList.push(reportObj);
      }

      setPendingReports(reportsList);
    } catch (e) {
      window.console.log("Error fetching reports: ", e);
    }
  };

  React.useEffect(() => {
    if (window.ethereum?.isConnected() && account && contract) {
      fetchPendingReport();
    } else {
      onConnect();
    }
  }, [account, contract]);

  return (
    <div id="reports_section">
      <div className="reports_section_header">
        <div className="section_header_text">Reports to Validate</div>
      </div>
      <div className="section_content">
        {pendingReports.map((report) => (
          <ReportCard 
            report={report} 
            showButtons={true} 
            account={account} 
            contract={contract} 
            accept={validateReport} 
            reject={declineReport}
          />
        ))}
      </div>
    </div>
  );
}
