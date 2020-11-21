import React, { useState } from 'react';

const LocalSearch = ({ setKeyword, keyword }) => {
  return (
    <div className="form-group">
      <input
        type="search"
        value={keyword}
        placeholder='Search'
        onChange={(e) => setKeyword(e.target.value.toLowerCase())}
        className="form-control mb-3"
      />
    </div>
  );
};

export default LocalSearch;
