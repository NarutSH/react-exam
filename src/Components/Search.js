import React, { useState } from "react";
import { BsSearch } from "react-icons/bs";

const Search = ({ searchTerm, setSearchTerm }) => {
  const onHandleSearchChange = (ev) => {
    setSearchTerm(ev.target.value);
  };

  return (
    <div>
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Search..."
          value={searchTerm}
          onChange={onHandleSearchChange}
        />
        <span className="input-group-text" id="basic-addon2">
          <BsSearch />
        </span>
      </div>
    </div>
  );
};

export default Search;
