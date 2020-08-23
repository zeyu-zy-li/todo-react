import React, { useState } from "react";


export default function Form(props) {
    const [name, setName] = useState("");
    function handleSubmit(e) {
        e.preventDefault();
        props.addTask(name);
        setName("");
    }
    function handleChange(e) {
        setName(e.target.value);
    }
    return (
      <form onSubmit={handleSubmit} >
        <div className="form-group">
          <div className="input-group">
            <input
              type="text"
              id="new-todo-input"
              className="form-control"
              name="text"
              autoComplete="off"
              placeholder="What needs to be done?"
              value={name}
              onChange={handleChange}
            />
            <div className="input-group-append">
              <button type="submit" className="btn btn-primary">
                Add
              </button>
            </div>
          </div>
        </div>
      </form>
    );
}