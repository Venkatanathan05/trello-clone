import React, { useState, useEffect } from "react";
import Column from "./components/Column.jsx";
import { Grid } from "react-virtualized";
import "react-virtualized/styles.css";
import "./styles/App.css";

const App = () => {
  const [columns, setColumns] = useState(() => {
    const saved = localStorage.getItem("board");
    return saved ? JSON.parse(saved) : [];
  });

  const [draggedTask, setDraggedTask] = useState(null);
  const [newColumnName, setNewColumnName] = useState("");

  useEffect(() => {
    localStorage.setItem("board", JSON.stringify(columns));
  }, [columns]);

  const addColumn = () => {
    if (newColumnName.trim()) {
      setColumns([...columns, { name: newColumnName.trim(), tasks: [] }]);
      setNewColumnName("");
    }
  };

  const addTask = (colIdx, taskName) => {
    if (taskName.trim()) {
      const newCols = [...columns];
      newCols[colIdx].tasks.push(taskName.trim());
      setColumns(newCols);
    }
  };

  const editTask = (colIdx, taskIdx) => {
    const newTask = prompt("Edit task:", columns[colIdx].tasks[taskIdx]);
    if (newTask !== null && newTask.trim() !== "") {
      const newCols = [...columns];
      newCols[colIdx].tasks[taskIdx] = newTask.trim();
      setColumns(newCols);
    }
  };

  const deleteTask = (colIdx, taskIdx) => {
    const confirmDelete = window.confirm("Delete this task?");
    if (confirmDelete) {
      const newCols = [...columns];
      newCols[colIdx].tasks.splice(taskIdx, 1);
      setColumns(newCols);
    }
  };

  const deleteColumn = (index) => {
    setColumns((prev) => prev.filter((_, i) => i !== index));
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
        <div className="add-column-section">
          <input
            type="text"
            placeholder="Enter column name"
            value={newColumnName}
            onChange={(e) => setNewColumnName(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && addColumn()}
          />
          <button onClick={addColumn}>+ Add Column</button>
        </div>
      </header>
      <div className="board">
        <Grid
          columnCount={columns.length}
          columnWidth={300}
          height={500}
          rowCount={1}
          rowHeight={500}
          width={window.innerWidth - 40}
          containerStyle={{ overflowY: "hidden" }}
          cellRenderer={({ columnIndex, key, style }) => (
            <div key={key} style={{ ...style, paddingRight: "10px" }}>
              {" "}
              <Column
                col={columns[columnIndex]}
                colIdx={columnIndex}
                addTask={addTask}
                onTaskDragStart={handleTaskDragStart}
                onTaskDrop={handleTaskDrop}
                editTask={editTask}
                deleteTask={deleteTask}
                deleteColumn={deleteColumn}
              />
            </div>
          )}
        />
      </div>
    </div>
  );
};

export default App;
