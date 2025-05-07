import React, { useState } from "react";
import TaskCard from "./TaskCard.jsx";
import { List, CellMeasurer, CellMeasurerCache } from "react-virtualized";
import "../styles/Column.css";

const Column = ({
  col,
  colIdx,
  addTask,
  onTaskDragStart,
  onTaskDrop,
  editTask,
  deleteTask,
  deleteColumn, // 🔹 newly added prop
}) => {
  const [newTask, setNewTask] = useState("");

  const handleAddTask = () => {
    if (!newTask.trim()) return;
    addTask(colIdx, newTask);
    setNewTask("");
  };

  const cache = new CellMeasurerCache({
    fixedWidth: true,
    defaultHeight: 70,
  });

  const renderTask = ({ index, key, style, parent }) => (
    <CellMeasurer
      cache={cache}
      columnIndex={0}
      rowIndex={index}
      key={key}
      parent={parent}
    >
      <div style={style}>
        <TaskCard
          task={col.tasks[index]}
          onDragStart={(e) => onTaskDragStart(e, colIdx, index)}
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => {
            e.preventDefault();
            onTaskDrop(colIdx, index);
          }}
          onEdit={() => editTask(colIdx, index)}
          onDelete={() => deleteTask(colIdx, index)}
        />
      </div>
    </CellMeasurer>
  );

  const maxListHeight = 300;
  const estimatedRowHeight = 70;
  const listHeight = Math.min(
    col.tasks.length * estimatedRowHeight,
    maxListHeight
  );

  return (
    <div className="column-wrapper">
      <div className="column">
        <div className="column-header">
          <h2>{col.name}</h2>
          <button
            className="delete-col-btn"
            onClick={() => deleteColumn(colIdx)}
          >
            🗑
          </button>
        </div>

        <div className="task-list-wrapper" style={{ overflowY: "hidden" }}>
          {" "}
          <List
            width={270}
            height={listHeight}
            rowCount={col.tasks.length}
            rowHeight={cache.rowHeight}
            rowRenderer={renderTask}
            deferredMeasurementCache={cache}
            overscanRowCount={3}
            style={{ overflowX: "hidden" }}
          />
          <div
            className="drop-zone"
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => {
              e.preventDefault();
              onTaskDrop(colIdx, col.tasks.length);
            }}
          >
            Drop here
          </div>
        </div>

        <div className="add-task-section">
          <input
            type="text"
            placeholder="Enter task title"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleAddTask()}
          />
          <button onClick={handleAddTask}>+ Add Task</button>
        </div>
      </div>
    </div>
  );
};

export default Column;
