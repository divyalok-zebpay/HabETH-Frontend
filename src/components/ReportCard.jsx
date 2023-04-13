import * as React from "react";
import "../styles/ReportCard.css";

export default function ReportCard({ contract, report, showButtons=false, accept, reject, account }) {
  return (
    <div className="report_card">
      <div className="report_card_top">
        <div>Habit Title: {report.habitTitle}</div>
        {
          showButtons && 
          <div className="report_card_buttons">
            <button onClick={() => accept(contract, report.reportId, account)}>Accept</button>
            <button onClick={() => reject(contract, report.reportId, account)}>Reject</button>
          </div>
        }
      </div>
      <div className="report_card_middle">Journal Entry: {report.journalEntry}</div>
      <div className="report_card_bottom">
        <div>
          Proof:{" "}
          {report.proofUrl && report.proofUrl.length ? (
            <a target="_blank" href={process.env.REACT_APP_IPFS_FILE_ENDPOINT + report.proofUrl}>
              See Proof
            </a>
          ) : (
            <span>Proof not submitted</span>
          )}
        </div>
        <div>Reported At: {report.reportedAt}</div>
      </div>
    </div>
  );
}
