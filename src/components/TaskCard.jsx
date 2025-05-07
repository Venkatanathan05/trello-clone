import React from "react";
import "../styles/TaskCard.css";

const TaskCard = ({
  task,
  onDragStart,
  onDragOver,
  onDrop,
  onEdit,
  onDelete,
}) => {
  return (
    <div
      className="task-card"
      draggable
      onDragStart={onDragStart}
      onDragOver={onDragOver}
      onDrop={onDrop}
    >
      <div className="task-content">{task}</div>
      <div className="task-actions">
        <button onClick={onEdit}>✏️</button>
        <button onClick={onDelete}>🗑️</button>
      </div>
    </div>
  );
};

export default TaskCard;
