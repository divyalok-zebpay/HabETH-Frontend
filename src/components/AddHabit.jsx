import * as React from "react";
import { Button, DatePicker, Input, Modal, Select, TextArea } from "web3uikit";
import { addHabit } from "../utility/utility";
const inputStyle = {
  margin: "10px",
};

const formStyle = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
};

const INTERVALS = [
  { label: "Daily", value: "Daily", id: 1},
  { label: "Weekly", value: "Weekly", id: 2},
  { label: "Monthly", value: "Monthly", id: 3},
  { label: "Once, at the end", value: "Once, at the end", id:4},
];

const intervalToTime = {
  "Daily": 24 * 60 * 60,
  "Weekly": 24 * 60 * 60 * 7,
  "Monthly": 24 * 60 * 60 * 31,
  "Once, at the end": 4
}

const INITIAL_STATE = {
  openModal: false,
  title: "",
  commitment: "",
  interval: INTERVALS[0].value,
  partner: "",
  amount: "",
  endDate: undefined,
};

// todo: remove
const totalReports = 30;

export default function AddHabit({ contract }) {
  const [state, setState] = React.useState(INITIAL_STATE);
  const { title, commitment, interval, partner, amount, endDate, openModal } = state;

  return (
    <>
      <Button color="green" theme="colored" onClick={() => setState(prevState => ({ ...prevState, openModal: true }))} text="Add Habit" />
      <Modal
        isVisible={openModal}
        onCancel={() => setState(INITIAL_STATE)}
        onOk={async () => {
          await addHabit({
            contract,
            title,
            commitment,
            amount,
            totalReports,
            intervalInSeconds: intervalToTime[interval],
            partner
          });
          setState(INITIAL_STATE);
        }}
        onCloseButtonPressed={() => setState(INITIAL_STATE)}
        width="500px"
        title="Add Habit"
      >
        <div style={formStyle}>
          <Input label="Your Goal" onChange={(e) => setState(prevState => ({...prevState, title: e.target.value}))} value={title} style={inputStyle} />
          <TextArea
            label="I commit to"
            onChange={(e) => setState(prevState => ({...prevState, commitment: e.target.value}))}
            value={commitment}
            style={inputStyle}
            width="320px"
          />
          <Select
            label="I'd like to report"
            onChange={(e) => setState(prevState => ({...prevState, interval: e.value}))}
            options={INTERVALS}
            style={inputStyle}
            width="320px"
          />
          <DatePicker
            label="Commitment ends on"
            value={endDate}
            onChange={({ date }) => setState(prevState => ({...prevState, endDate: date}))}
            min={new Date()}
            style={{ width: "320px", margin: "10px" }}
          />
          <Input
            label="Accountability Partner Wallet Address"
            onChange={(e) => setState(prevState => ({...prevState, partner: e.target.value}))}
            value={partner}
            style={inputStyle}
          />
          <Input label="Total Amount" onChange={(e) => setState(prevState => ({...prevState, amount: e.target.value}))} value={amount} type="number" style={inputStyle} />
        </div>
      </Modal>
    </>
  );
}
