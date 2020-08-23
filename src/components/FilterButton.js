import React from "react";

export default function FilterButton(props) {
    return (
        <button type="button" className="btn btn-light"
         onClick={() => props.setFilter(props.name)}
        >
          {props.name}
        </button>
    );
}