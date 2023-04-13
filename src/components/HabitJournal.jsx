import * as React from "react";
import { Button, DatePicker, TextArea } from "web3uikit";
import FileUploader from "./FileUploader";

const inputStyle = {
  margin: "10px",
};

export default class HabitJournal extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      fileUrls: [],
      journal: undefined,
    };
  }

  render() {
    const { fileUrls, journal } = this.state;
    const { addJournal, habitId } = this.props;

    return (
      <div style={{ minWidth: "320px", padding: "10px" }}>
        <DatePicker disabled label="Record date" style={inputStyle} />
        <div style={inputStyle}>
          <TextArea
            label="My Commitment Journal"
            value={journal}
            onChange={(e) => this.setState({ journal: e.target.value })}
            width="100%"
          />
        </div>
        <FileUploader
          images={fileUrls}
          setImages={(val) => this.setState({ fileUrls: val })}
        />
        <Button
          text="Add Journal"
          onClick={() => {
            addJournal(habitId, journal, fileUrls.toString());
          }}
        />
      </div>
    );
  }
}
