import React from "react";

const Pagination = ({ currentPage, totalPages, setCurrentPage }) => {
  return (
    <div className="flex items-center gap-4">
      <span>{`Showing ${currentPage} of ${totalPages} pages`}</span>

      <div className="pagination">
        {/* Previous Button */}
        <button
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage <= 1}
        >
          <i className="ki-outline ki-black-left"></i>
        </button>

        {/* Page Numbers */}
        <button
          onClick={() => setCurrentPage(Math.max(currentPage - 1, 1))}
          disabled={currentPage <= 1}
          className="btn"
        >
          {currentPage - 1 > 0 ? currentPage - 1 : ""}
        </button>

        {/* Current Page */}
        <button className="btn active">{currentPage}</button>

        {/* Next Page */}
        <button
          onClick={() => setCurrentPage(Math.min(currentPage + 1, totalPages))}
          disabled={currentPage >= totalPages}
          className="btn"
        >
          {currentPage + 1 <= totalPages ? currentPage + 1 : ""}
        </button>

        {/* Next Button */}
        <button
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={currentPage >= totalPages}
        >
          <i className="ki-outline ki-black-right"></i>
        </button>
      </div>
    </div>
  );
};

export default Pagination;
