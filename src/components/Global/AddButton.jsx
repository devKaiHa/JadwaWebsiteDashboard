import React from "react";

const AddButton = ({
  label = "Add",
  isSubmitting = false,
  onClick,
  disabled,
}) => {
  return (
    <button
      type="button"
      className="btn btn-sm btn-outline btn-primary h-8 flex items-center gap-2 capitalize"
      onClick={onClick}
      disabled={isSubmitting || disabled}
    >
      <i className="ki-outline ki-plus-squared"></i>
      {isSubmitting ? "Processing..." : label}
    </button>
  );
};

export default AddButton;
