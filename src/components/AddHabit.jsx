import * as React from "react";
import { Button, DatePicker, Input, Modal, Select, TextArea } from "web3uikit";

const inputStyle = {
  margin: "10px",
};

const formStyle = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
};

const INTERVALS = [
  { label: "Daily", id: 24 * 60 * 60 },
  { label: "Weekly", id: 24 * 60 * 60 * 7 },
  { label: "Monthly", id: 24 * 60 * 60 * 31 },
  { label: "Once, at the end", id: 4 },
];

const INITIAL_STATE = {
  openModal: false,
  title: "",
  commitment: "",
  interval: INTERVALS[0],
  partner: "",
  amount: "",
  endDate: undefined,
};

// todo: remove
const totalReports = 30;

export default class AddHabit extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE };
  }

  render() {
    const { title, commitment, interval, partner, amount, endDate, openModal } =
      this.state;
    const { addHabit } = this.props;

    return (
      <>
        <Button
          color="green"
          theme="colored"
          onClick={() => this.setState({ openModal: true })}
          text="Add Habit"
        />
        <Modal
          isVisible={openModal}
          onCancel={() => this.setState({ ...INITIAL_STATE })}
          onOk={async () => {
            await addHabit({
              title,
              commitment,
              amount,
              totalReports,
              intervalInSeconds: interval.id,
            });
            this.setState({ ...INITIAL_STATE });
          }}
          onCloseButtonPressed={() => this.setState({ ...INITIAL_STATE })}
          width="500px"
          title="Add Habit"
        >
          <div style={formStyle}>
            <Input
              label="Your Goal"
              onChange={(e) => this.setState({ title: e.target.value })}
              value={title}
              style={inputStyle}
            />
            <TextArea
              label="I commit to"
              onChange={(e) => this.setState({ commitment: e.target.value })}
              value={commitment}
              style={inputStyle}
              width="320px"
            />
            <Select
              label="I'd like to report"
              onChange={(e) => {
                this.setState({ interval: e });
              }}
              value={interval}
              options={INTERVALS}
              style={inputStyle}
              width="320px"
            />
            <DatePicker
              label="Commitment ends on"
              value={endDate}
              onChange={({ date }) => this.setState({ endDate: date })}
              min={new Date()}
              style={{ width: "320px", margin: "10px" }}
            />
            <Input
              label="Accountability Partner Wallet Address"
              onChange={(e) => this.setState({ partner: e.target.value })}
              value={partner}
              style={inputStyle}
            />
            <Input
              label="Total Amount"
              onChange={(e) => this.setState({ amount: e.target.value })}
              value={amount}
              type="number"
              style={inputStyle}
            />
          </div>
        </Modal>
      </>
    );
  }
}
