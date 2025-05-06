import React, { useState } from "react";
import TaskCard from "./TaskCard.jsx";
import "../styles/Column.css";

const Column = ({
  col,
  colIdx,
  addTask,
  onTaskDragStart,
  onTaskDragOver,
  onTaskDrop,
}) => {
  const [newTask, setNewTask] = useState("");

  const handleAddTask = () => {
    addTask(colIdx, newTask);
    setNewTask("");
  };

  return (
    <div className="column-wrapper">
      <div className="column">
        <div className="column-header">
          <h2>{col.name}</h2>
        </div>
        <div className="task-list">
          {col.tasks.map((task, taskIdx) => (
            <TaskCard
              key={taskIdx}
              task={task}
              onDragStart={(e) => onTaskDragStart(e, colIdx, taskIdx)}
              onDragOver={() => onTaskDragOver(colIdx, taskIdx)}
              onDrop={onTaskDrop}
            />
          ))}
        </div>
        <div className="task-input">
          <input
            type="text"
            placeholder="New task"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
          />
          <button onClick={handleAddTask}>+ Add Task</button>
        </div>
      </div>
    </div>
  );
};

export default Column;
