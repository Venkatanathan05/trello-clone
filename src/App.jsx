import React, { useState, useEffect } from "react";
import Column from "./components/Column.jsx";
import "./styles/App.css";

const App = () => {
  const [columns, setColumns] = useState(() => {
    const saved = localStorage.getItem("board");
    return saved ? JSON.parse(saved) : [];
  });

  const [draggedTask, setDraggedTask] = useState(null);

  useEffect(() => {
    localStorage.setItem("board", JSON.stringify(columns));
  }, [columns]);

  const addColumn = () => {
    const name = prompt("Enter column name:");
    if (name) {
      setColumns([...columns, { name, tasks: [] }]);
    }
  };

  const addTask = (colIdx) => {
    const task = prompt("Enter task title:");
    if (task) {
      const newCols = [...columns];
      newCols[colIdx].tasks.push(task);
      setColumns(newCols);
    }
  };

  const handleTaskDragStart = (e, colIdx, taskIdx) => {
    setDraggedTask({ colIdx, taskIdx });
  };

  const handleTaskDrop = (targetColIdx, targetTaskIdx) => {
    if (!draggedTask) return;

    const newCols = [...columns];
    const task = newCols[draggedTask.colIdx].tasks.splice(
      draggedTask.taskIdx,
      1
    )[0];

    let insertIdx = targetTaskIdx;
    if (
      draggedTask.colIdx === targetColIdx &&
      draggedTask.taskIdx < targetTaskIdx
    ) {
      insertIdx--;
    }

    newCols[targetColIdx].tasks.splice(insertIdx, 0, task);
    setColumns(newCols);
    setDraggedTask(null);
  };

  return (
    <div className="app">
      <header>
        <h1>Trello Clone</h1>
        <button onClick={addColumn}>+ Add Column</button>
      </header>
      <div className="board">
        {columns.map((col, colIdx) => (
          <Column
            key={colIdx}
            col={col}
            colIdx={colIdx}
            addTask={addTask}
            onTaskDragStart={handleTaskDragStart}
            onTaskDrop={handleTaskDrop}
          />
        ))}
      </div>
    </div>
  );
};

export default App;
