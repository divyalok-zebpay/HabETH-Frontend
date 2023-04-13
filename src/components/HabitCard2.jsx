import * as React from "react";
import "../styles/HabitCard.css"

export default function HabitCard({ contract, habit, showButtons=false, accept, reject, account }) {
  return (
    <div className="habit_card">
      {window.console.log("Habit: ", habit)}
      <div className="habit_card_top">
        <div>Goal: {habit.goal}</div>
        {
          showButtons && 
          <div className="habit_card_buttons">
            <button onClick={() => accept(contract, habit.habitId, account)}>Accept</button>
            <button onClick={() => reject(contract, habit.habitId, account)}>Reject</button>
          </div>
        }
      </div>
      <div className="habit_card_middle">
        <div>Description: {habit.description}</div>
      </div>
      <div className="habit_card_bottom">
        <div>Duration: {habit.duration}</div>
        <div>Amount: {habit.amount} ETH</div>
      </div>
    </div>
  );
}
