import React, { useState, useEffect } from "react";
import Column from "./components/Column.jsx";
import "./styles/App.css";

const App = () => {
  const [columns, setColumns] = useState(() => {
    const saved = localStorage.getItem("board");
    return saved ? JSON.parse(saved) : [];
  });

  const [newColumnName, setNewColumnName] = useState("");
  const [draggedTask, setDraggedTask] = useState(null);
  const [dropTarget, setDropTarget] = useState(null);

  useEffect(() => {
    localStorage.setItem("board", JSON.stringify(columns));
  }, [columns]);

  const addColumn = () => {
    if (newColumnName.trim()) {
      setColumns([...columns, { name: newColumnName.trim(), tasks: [] }]);
      setNewColumnName("");
    }
  };

  const addTask = (colIdx, taskText) => {
    if (taskText.trim()) {
      const newCols = [...columns];
      newCols[colIdx].tasks.push(taskText.trim());
      setColumns(newCols);
    }
  };

  const handleTaskDragStart = (e, colIdx, taskIdx) => {
    e.dataTransfer.setData("type", "task");
    setDraggedTask({ colIdx, taskIdx });
  };

  const handleTaskDragOver = (colIdx, taskIdx) => {
    setDropTarget({ colIdx, taskIdx });
  };

  const handleTaskDrop = () => {
    if (!draggedTask || !dropTarget) return;

    const newCols = [...columns];
    const task = newCols[draggedTask.colIdx].tasks.splice(
      draggedTask.taskIdx,
      1
    )[0];

    let insertIdx = dropTarget.taskIdx;
    if (
      draggedTask.colIdx === dropTarget.colIdx &&
      draggedTask.taskIdx < dropTarget.taskIdx
    ) {
      insertIdx--;
    }

    newCols[dropTarget.colIdx].tasks.splice(insertIdx, 0, task);
    setColumns(newCols);
    setDraggedTask(null);
    setDropTarget(null);
  };

  return (
    <div className="app">
      <header>
        <h1>Trello Clone</h1>
        <div className="column-input">
          <input
            type="text"
            placeholder="New column name"
            value={newColumnName}
            onChange={(e) => setNewColumnName(e.target.value)}
          />
          <button onClick={addColumn}>+ Add Column</button>
        </div>
      </header>
      <div className="board">
        {columns.map((col, colIdx) => (
          <Column
            key={colIdx}
            col={col}
            colIdx={colIdx}
            addTask={addTask}
            onTaskDragStart={handleTaskDragStart}
            onTaskDragOver={handleTaskDragOver}
            onTaskDrop={handleTaskDrop}
          />
        ))}
      </div>
    </div>
  );
};

export default App;
