import React from "react";
import TaskCard from "./TaskCard.jsx";
import "../styles/Column.css";

const Column = ({
  col,
  colIdx,
  addTask,
  onTaskDragStart,
  onTaskDrop,
  onColumnDragStart,
  onColumnDrop,
}) => {
  const handleDrop = (e) => {
    const type = e.dataTransfer.getData("type");
    if (type === "column") {
      onColumnDrop(colIdx);
    } else if (type === "task") {
      onTaskDrop(colIdx);
    }
  };

  return (
    <div
      className="column-wrapper"
      onDragOver={(e) => e.preventDefault()}
      onDrop={handleDrop}
    >
      <div className="column">
        <div
          className="column-header"
          draggable
          onDragStart={(e) => onColumnDragStart(e, colIdx)}
        >
          <h2>{col.name}</h2>
          <button onClick={() => addTask(colIdx)}>+ Add Task</button>
        </div>
        <div className="task-list">
          {col.tasks.map((task, taskIdx) => (
            <TaskCard
              key={taskIdx}
              task={task}
              onDragStart={(e) => onTaskDragStart(e, colIdx, taskIdx)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Column;
