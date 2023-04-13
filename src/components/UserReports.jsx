import * as React from "react";
import { getAllReportIds, createReportObjFromID } from "../utility/utility";
import { Select } from "web3uikit";
import "../styles/UserReports.css";
import ReportCard from "./ReportCard";

const pending = 0,
  accepted = 1,
  declined = -1;

const reportOptions = [
  {
    id: "Pending",
    label: "Pending",
    value: pending,
  },
  {
    id: "Approved",
    label: "Approved",
    value: accepted,
  },
  {
    id: "Declined",
    label: "Declined",
    value: declined,
  },
];

export default function UserReports({ account, contract, onConnect }) {
  const [reports, setReports] = React.useState([]);
  const [reportType, setReportType] = React.useState(pending);

  const fetchReport = async () => {
    try {
      const userReports = await getAllReportIds(contract, account);

      let reportsList = [];
      for (const reportId of userReports) {
        let reportObj = await createReportObjFromID(contract, reportId);
        reportsList.push(reportObj);
      }

      setReports(reportsList);
    } catch (e) {
      window.console.log("Error fetching reports: ", e);
    }
  };

  React.useEffect(() => {
    if (window.ethereum?.isConnected() && account && contract) {
      fetchReport();
    } else {
      onConnect();
    }
  }, [account, contract]);

  let displayList = [];
  for (const report of reports) {
    if (report.approvalStatus == reportType) {
      displayList.push(report);
    }
  }

  return (
    <div id="reports_section">
      <div className="reports_section_header">
        <div className="section_header_text">My Reports</div>
        <div>
          <Select defaultOptionIndex={0} id="reports_select" label="Report Type" onChange={(e) => setReportType(e.value)} options={reportOptions} />
        </div>
      </div>
      <div className="section_content">
        {displayList.map((report) => <ReportCard report={report} />)}
      </div>
    </div>
  );
}
