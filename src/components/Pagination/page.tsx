 
import React from 'react';
import {PaginationProps} from '../types/page'

export const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange ,totalEntries }) => {
  const renderPageNumbers = () => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(
        <button
          key={i}
          onClick={() => onPageChange(i)}
          className={`px-[6px] border border-borderColor3 rounded-md mx-1 text-fontColor1  ${i === currentPage ? 'text-primary border-primary font-bold' : ''}`}
        >
          {i}
        </button>
      );
    }
    return pageNumbers;
  };

  return (
    <div className="flex justify-center items-center ">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-[6px]  mx-1 text-white rounded-md bg-primary border border-primary font-bold disabled:opacity-75"
      >
        &lt;
      </button>
      {renderPageNumbers()}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`px-[6px]  mx-1 text-white rounded-md bg-primary border border-primary font-bold disabled:opacity-75`}
      >
        &gt;
      </button>
    </div>
  );
};

export default Pagination;
