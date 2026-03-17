import { useState, useEffect, useRef } from "react";

const SearchableSelect = ({
  label,
  labelWidth = "20",
  height = "2.5",
  placeholder,
  options,
  selectedValue,
  selectedLabel,
  onChange,
  onInputChange,
  disabled,
  error,
  getOptionLabel = (option) => option.name,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const inputRef = useRef(null);
  const dropdownRef = useRef(null);

  // Filter options
  const filteredOptions = options?.data?.filter((option) =>
    (getOptionLabel(option) || "")
      .toLowerCase()
      .includes((searchQuery || "").toLowerCase()),
  );

  // Show label of selected value in input
  useEffect(() => {
    if (!isOpen) {
      if (selectedLabel) {
        setSearchQuery(selectedLabel);
      } else if (selectedValue && typeof selectedValue === "object") {
        setSearchQuery(getOptionLabel(selectedValue));
      } else if (selectedValue) {
        const selectedOption = options?.data?.find(
          (opt) => opt.id === selectedValue || opt._id === selectedValue,
        );
        if (selectedOption) {
          setSearchQuery(getOptionLabel(selectedOption));
        } else {
          setSearchQuery("");
        }
      }
    }
  }, [isOpen, selectedValue, selectedLabel, getOptionLabel, options]);
  // Select option
  const handleSelect = (option) => {
    onChange?.(option); // send full object
    setSearchQuery(getOptionLabel(option));
    setIsOpen(false);
  };

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        inputRef.current !== event.target
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative w-full" ref={dropdownRef}>
      <div className="input-group flex items-center">
        {label && (
          <span
            className="btn btn-input text-left border-r-0 rounded-r-none px-3"
            style={{
              width: `${labelWidth}%`,
              height: `${height}rem`,
              minHeight: 0,
              lineHeight: "normal",
              paddingTop: "0.25rem",
              paddingBottom: "0.25rem",
            }}
          >
            {label}
          </span>
        )}
        <div className="relative" style={{ width: `${100 - labelWidth}%` }}>
          <input
            ref={inputRef}
            type="text"
            disabled={disabled}
            className={`input w-full border rounded-l-none p-2  ${
              error ? "border-danger" : "border-gray-300"
            }`}
            style={{
              height: `${height}rem`,
              minHeight: 0,
              lineHeight: "normal",
              paddingTop: "0.25rem",
              paddingBottom: "0.25rem",
            }}
            placeholder={placeholder}
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setIsOpen(true);
              onInputChange?.(e.target.value);
            }}
            onFocus={() => setIsOpen(true)}
          />

          {isOpen && !disabled && (
            <div className="menu bg-white flex flex-col border rounded-lg w-full py-2 shadow-lg absolute top-full left-0 z-[9999] max-h-48 overflow-y-auto">
              {filteredOptions?.length > 0 ? (
                filteredOptions.map((option) => (
                  <div
                    key={option._id}
                    className="menu-item cursor-pointer px-4 py-2 hover:bg-gray-100 text-xs"
                    onClick={() => handleSelect(option)}
                  >
                    <span className="menu-title">{getOptionLabel(option)}</span>
                  </div>
                ))
              ) : (
                <div className="menu-item px-4 py-2 text-gray-500">
                  No options found
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchableSelect;
