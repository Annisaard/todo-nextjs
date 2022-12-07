import React from "react";

export default function Pagination({ todosPerPage, totalTodos, paginate }) {
  const pageNumber = [];
  for (let i = 1; i <= Math.ceil(totalTodos / todosPerPage); i++) {
    pageNumber.push(i);
  }
  return (
    <nav>
      <ul>
        {pageNumber.map((number) => (
          <li key={number}>
            <a onClick={() => paginate(number)} href="!#">
              {number}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
