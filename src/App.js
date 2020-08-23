import { nanoid } from "nanoid";
import React, { useState } from "react";
import Todo from "./components/Todo";
import Form from "./components/Form";
import FilterButton from "./components/FilterButton";

export default function App(props) {
  // Filter
  const [filter, setFilter] = useState('All');
  const FILTER_MAP = {
    All: () => true,
    Active: task => !task.completed,
    Completed: task => task.completed
  };
  const FILTER_NAMES = Object.keys(FILTER_MAP);
  const filterButtons = FILTER_NAMES.map(name => (
    <FilterButton key={name} name={name} setFilter={setFilter} />
  ));

  // Tasks
  const [tasks, setTasks] = useState(props.tasks);
  function addTask(name) {
    const newTask = { id: "todo-" + nanoid(), name: name, completed: false };
    setTasks([...tasks, newTask]);
  }
  function toggleTaskCompleted(id) {
    const updated = tasks.map(task => {
      if (id !== task.id) {
        return task;
      }
      return {...task, completed: !task.completed};
    });
    setTasks(updated);
  }
  function deleteTask(id) {
    const updated = tasks.filter(task => (task.id !== id));
    setTasks(updated);
  }
  function editTask(id, newName) {
    const updated = tasks.map(task => {
      if (id === task.id) {
        return {...task, name: newName};
      }
      return task;
    });
    setTasks(updated);
  }

  const taskList = tasks
    .filter(FILTER_MAP[filter])
    .map(task => (
      <Todo 
        className="list-group-item"
        key={task.id} name={task.name}
        completed={task.completed} id={task.id}
        toggleTaskCompleted={toggleTaskCompleted}
        deleteTask={deleteTask} editTask={editTask}
      />
    ));

  const headingText = `${taskList.length} ${taskList.length > 1 ? "tasks" : "task"} remaining`;
  return (
    <div className="container">
      <h1 className="text-center">Todo</h1>
      <Form addTask={addTask} />
      <div className="row">
        <div className="col"></div>
        <div className="col btn-group" role="group">
          {filterButtons}
        </div>
        <div className="col"></div>
      </div>
      <h2 id="list-heading">
        {headingText}
      </h2>
      <ul className="list-group">
        {taskList}
      </ul>
    </div>
  );
}
