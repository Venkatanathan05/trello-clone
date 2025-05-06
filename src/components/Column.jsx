import React from "react";
import TaskCard from "./TaskCard.jsx";
import "../styles/Column.css";

const Column = ({ col, colIdx, addTask, onTaskDragStart, onTaskDrop }) => {
  return (
    <div className="column-wrapper">
      <div className="column">
        <div className="column-header">
          <h2>{col.name}</h2>
          <button onClick={() => addTask(colIdx)}>+ Add Task</button>
        </div>
        <div className="task-list">
          {col.tasks.map((task, taskIdx) => (
            <TaskCard
              key={taskIdx}
              task={task}
              onDragStart={(e) => onTaskDragStart(e, colIdx, taskIdx)}
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => {
                e.preventDefault();
                onTaskDrop(colIdx, taskIdx);
              }}
            />
          ))}
          <div
            className="drop-zone"
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => {
              e.preventDefault();
              onTaskDrop(colIdx, col.tasks.length);
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Column;
