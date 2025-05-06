import React from "react";
import "../styles/TaskCard.css";

const TaskCard = ({ task, onDragStart, onDragOver, onDrop }) => {
  return (
    <div
      className="task-card"
      draggable
      onDragStart={onDragStart}
      onDragOver={onDragOver}
      onDrop={onDrop}
    >
      {task}
    </div>
  );
};

export default TaskCard;
