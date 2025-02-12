import React from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa6";

export default function TableHeading({
  name,
  sort_field = null,
  sort_direction = null,
  sortable = true,
  sortChanged = () => {},
  children,
}) {
  return (
    <th onClick={(e) => sortChanged(name)}>
      <div className="px-3 py-3 flex items-center justify-between gap-1">
        {children}
        {sortable && (
          <div className="cursor-pointer">
            <FaChevronUp
              className={
                "w-4 " +
                (sort_field === name && sort_direction === "asc"
                  ? "text-white"
                  : "")
              }
            />
            <FaChevronDown
              className={
                "w-4 " +
                (sort_field === name && sort_direction === "desc"
                  ? "text-white"
                  : "")
              }
            />
          </div>
        )}
      </div>
    </th>
  );
}
