import { Link } from "@inertiajs/react";
import React from "react";

export default function Pagination({ links }) {
  return (
    <nav className="text-center mt-4">
      {links.map((link) => (
        <Link
          preserveScroll
          key={link.label}
          href={link.url || ""}
          dangerouslySetInnerHTML={{ __html: link.label }}
          className={`inline-block py-2 px-3 rounded-lg text-xs text-gray-200 
            ${link.active ? "bg-gray-950 text-white" : ""} 
            ${
              !link.url
                ? "!text-gray-500 cursor-not-allowed"
                : "hover:bg-gray-900"
            }
          `}
        ></Link>
      ))}
    </nav>
  );
}
