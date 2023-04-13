import * as React from "react";
import { Tab, TabList } from "web3uikit";
import AddHabit from "./AddHabit";
import HabitsCard from "./HabitsCard";
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
];

export default function HabitsList({ addHabit, habits }) {
  const navigate = useNavigate();
  const [selectedType, setSelectedType] = React.useState(HABIT_STATUS[0].key);
  const [displayHabits, setDisplayHabits] = React.useState(habits);

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
        <TabList
          defaultActiveKey={selectedType}
          onChange={(value) => setSelectedType(value)}
          tabStyle="bulbUnion"
        >
          {HABIT_STATUS.map((status) => {
            return (
              <Tab tabKey={status.key} tabName={`${status.value} Habits`} />
            );
          })}
        </TabList>
        <AddHabit addHabit={addHabit} />
      </div>
      <div style={{ maxHeight: "calc(100vh - 200px)", overflowY: "auto" }}>
        {displayHabits.map((habit) => {
          return (
            <div
              key={habit.id}
              onClick={() => {
                navigate(`/habit/${habit.id}`);
              }}
              style={{ cursor: "pointer" }}
            >
              <HabitsCard
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
