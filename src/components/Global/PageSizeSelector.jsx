import React from "react";

const PageSizeSelector = ({ perPage, setPerPage }) => {
  return (
    <div className="flex items-center gap-2">
      Show
      <select
        className="select select-sm w-16"
        value={perPage}
        onChange={(e) => setPerPage(Number(e.target.value))}
      >
        {[10, 20, 50].map((size) => (
          <option key={size} value={size}>
            {size}
          </option>
        ))}
      </select>
      per page
    </div>
  );
};

export default PageSizeSelector;
