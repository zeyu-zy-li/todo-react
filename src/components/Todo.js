import React, { useRef, useState, useEffect } from "react";

function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

export default function Todo(props) {
  const editFieldRef = useRef(null);
  const editButtonRef = useRef(null);

  const [isEditing, setEditing] = useState(false);
  const wasEditing = usePrevious(isEditing);
  const [newName, setNewName] = useState("");

  function handleChange(e) {
    setNewName(e.target.value);
  }
  
  function handleSubmit(e) {
    e.preventDefault();
    props.editTask(props.id, newName);
    setNewName("");
    setEditing(false);
  }

  const editingTemplate = (
    <form className="" onSubmit={handleSubmit} >
      <div className="input-group">
        <input id={props.id} ref={editFieldRef} className="form-control"
               type="text" placeholder={"New name for " + props.name}
               onChange={handleChange} />
        <div className="input-group-append">
          <button type="button" className="btn btn-outline-secondary" onClick={() => setEditing(false)}>
            Cancel
          </button>
          <button type="submit" className="btn btn-primary">
            Save
          </button>
        </div>
          
      </div>
    </form>
  );
  const viewTemplate = (
      <div>
        <div className="input-group">
          <div className="input-group-prepend">
            <div className="input-group-text">
              <input id={props.id} type="checkbox" defaultChecked={props.completed}
                onChange={() => props.toggleTaskCompleted(props.id)}
              />
            </div>
          </div>
          <label className="form-control" htmlFor={props.id}>
            {props.name}
          </label>
          <div className="input-group-append">
            <button type="button" ref={editButtonRef} className="btn btn-secondary" onClick={() => setEditing(true)}>
              Edit
            </button>
            <button type="button" className="btn btn-outline-secondary" onClick={() => props.deleteTask(props.id)} >
              Delete
            </button>
          </div>
        </div>
      </div>
  );
  useEffect(() => {
    if (!wasEditing && isEditing) {
      editFieldRef.current.focus();
    }
    if (wasEditing && !isEditing) {
      editButtonRef.current.focus();
    }
  }, [wasEditing, isEditing]);
  return (
      <li className="todo">
        {isEditing ? editingTemplate : viewTemplate}
      </li>
  );
}