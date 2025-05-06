import React, { useState } from "react";
import Column from "./components/Column";
import "./styles/App.css";

const App = () => {
  const [columns, setColumns] = useState([]);
  const [draggedTask, setDraggedTask] = useState(null);
  const [draggedColIdx, setDraggedColIdx] = useState(null);

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
    e.dataTransfer.setData("type", "task");
    setDraggedTask({ colIdx, taskIdx });
  };

  const handleTaskDrop = (colIdx) => {
    if (!draggedTask) return;
    const newCols = [...columns];
    const task = newCols[draggedTask.colIdx].tasks.splice(
      draggedTask.taskIdx,
      1
    )[0];
    newCols[colIdx].tasks.push(task);
    setColumns(newCols);
    setDraggedTask(null);
  };

  const handleColumnDragStart = (e, colIdx) => {
    e.dataTransfer.setData("type", "column");
    setDraggedColIdx(colIdx);
  };

  const handleColumnDrop = (dropIdx) => {
    if (draggedColIdx === null || draggedColIdx === dropIdx) return;
    const newCols = [...columns];
    const [movedCol] = newCols.splice(draggedColIdx, 1);
    newCols.splice(dropIdx, 0, movedCol);
    setColumns(newCols);
    setDraggedColIdx(null);
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
            onColumnDragStart={handleColumnDragStart}
            onColumnDrop={handleColumnDrop}
          />
        ))}
      </div>
    </div>
  );
};

export default App;
