import React from "react";
import { FaTimes } from "react-icons/fa";

const Dropdown = React.forwardRef(({ isOpen, toggleDropdown, content, title }, ref) => (
  <div
    ref={ref}
    className={`origin-top-right absolute right-0 mt-10 w-64 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 ${isOpen ? 'block' : 'hidden'} z-20`}
  >
    <div className="py-2">
      <div className="flex justify-between items-center px-4">
        <span className="font-semibold">{title}</span>
        <button
          onClick={toggleDropdown}
          className="text-gray-600 hover:text-gray-900"
        >
          <FaTimes className="h-5 w-5" />
        </button>
      </div>
      {content}
    </div>
  </div>
));

export default Dropdown;