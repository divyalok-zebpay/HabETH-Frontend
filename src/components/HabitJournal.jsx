import * as React from "react";
import { Button, DatePicker, TextArea } from "web3uikit";
import FileUploader from "./FileUploader";
import { addJournal } from "../utility/utility";

const inputStyle = {
  margin: "20px 0",
};

export default function HabitJournal({contract, habitId}) {
  const [fileUrls, setFileUrls] = React.useState([]);
  const [journal, setJournal] = React.useState(undefined);

  return (
    <div style={{ minWidth: "320px", padding: "10px" }}>
      <DatePicker disabled label="Record date" style={inputStyle} />
      <div style={inputStyle}>
        <TextArea label="My Commitment Journal" value={journal} onChange={(e) => setJournal(e.target.value)} width="100%" />
      </div>
      <FileUploader images={fileUrls} setImages={(val) => setFileUrls(val)} />
      <Button
        text="Add Journal"
        onClick={async () => {
          let url = fileUrls[0].toString();
          let res = await addJournal(contract, habitId, journal, url);
          if (res == null) {
            alert("Couldn't add journal! Either gas limit has exceeded or you have already submitted a report for this slot.")
          }
        }}
      />
    </div>
  );
}
