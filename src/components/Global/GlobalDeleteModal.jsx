import { Alert } from "@/components";
import React from "react";
import { FormattedMessage } from "react-intl";

const GlobalDeleteModal = ({
  isOpen,
  onClose,
  onDelete,
  title = "Are you sure?",
  text = "This action can cause A lot of problem if you are not sure press cancel , this action cannot be undone",
  isLoading = false,
  error = null,
  butText,
  btnColor = "danger",
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-[600px]">
        {/* Modal Header */}
        <div className="flex justify-between items-center border-b pb-3">
          <h3 className="text-lg font-semibold capitalize">{title}</h3>
          <button className="btn btn-xs btn-icon btn-light" onClick={onClose}>
            <i className="ki-outline ki-cross"></i>
          </button>
        </div>

        {/* Modal Body */}
        <div className="modal-body mt-4">
          <Alert variant="warning" className="capitalize">
            {text}
          </Alert>
          {isLoading && (
            <p className="text-gray-500">
              <FormattedMessage id="GENERAL.DELETING" />
            </p>
          )}

          {error && <Alert variant="danger">{error}</Alert>}
        </div>

        {/* Modal Footer */}
        <div className="flex justify-end gap-2 mt-4">
          <button
            className="btn btn-secondary"
            onClick={onClose}
            disabled={isLoading}
          >
            Cancel
          </button>
          <button
            className={`btn btn-${btnColor}`}
            onClick={() => {
              onDelete();
              onClose(); // Close modal after deletion
            }}
            disabled={isLoading}
          >
            {isLoading ? (
              <FormattedMessage id="GENERAL.DELETING" />
            ) : (
              butText || <FormattedMessage id="GENERAL.DELETE" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default GlobalDeleteModal;
