import React from "react";
import "../styles/TaskCard.css";

const TaskCard = ({ task, onDragStart }) => {
  return (
    <div className="task-card" draggable onDragStart={onDragStart}>
      {task}
    </div>
  );
};

export default TaskCard;
