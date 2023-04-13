import * as React from "react";
import { Tab, TabList } from "web3uikit";
import AddHabit from "./AddHabit";
import HabitCard from "./HabitCard1";
import { useNavigate } from "react-router-dom";

const habitsContainer = {
  margin: "1rem auto",
};

const HABIT_STATUS = [
  {
    key: "ACTIVE",
    value: "Active",
  },
  {
    key: "COMPLETED",
    value: "Completed",
  },
  {
    key: "PENDING",
    value: "Pending",
  },
  {
    key: "DECLINED",
    value: "Declined",
  },
];

export default function HabitsList({ contract, habits }) {
  const navigate = useNavigate();
  const [selectedType, setSelectedType] = React.useState(HABIT_STATUS[0].key);
  const [displayHabits, setDisplayHabits] = React.useState(habits);

  window.console.log("contract: ", contract, "habits: ", habits)

  React.useEffect(() => {
    // Get the Data for habits and set it
    setDisplayHabits(habits.filter((habit) => habit.status === selectedType));
  }, [selectedType, habits]);

  return (
    <div style={habitsContainer}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          maxHeight: "2.75rem",
        }}
      >
        <TabList defaultActiveKey={selectedType} onChange={(value) => setSelectedType(value)} tabStyle="bulbUnion">
          {HABIT_STATUS.map((status) => {
            return <Tab tabKey={status.key} tabName={`${status.value} Habits`} />;
          })}
        </TabList>
        <AddHabit contract={contract} />
      </div>
      <div style={{ maxHeight: "calc(100vh - 200px)", overflowY: "auto" }}>
        {displayHabits.map((habit) => {
          return (
            <div
              key={habit.habitId}
              onClick={() => {
                navigate(`/habit/${habit.habitId}`);
              }}
              style={{ cursor: "pointer" }}
            >
              <HabitCard
                goal={habit.goal}
                description={habit.description}
                status={habit.status}
                completedOn={habit.completedOn}
                duration={habit.duration}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
