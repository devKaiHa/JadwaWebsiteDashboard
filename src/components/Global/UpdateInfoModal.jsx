import { Alert } from "@/components";
import React from "react";
import { FormattedMessage } from "react-intl";

const GlobalUpdateModal = ({
  isOpen,
  onClose,
  onUpdate,
  title = "Confirm Update",
  text = "Are you sure you want to update this data? The changes you made will be saved.",
  isLoading = false,
  error = null,
  butText,
  btnColor = "primary",
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-[600px]">
        {/* Modal Header */}
        <div className="flex justify-between items-center border-b pb-3">
          <h3 className="text-lg font-semibold">{title}</h3>
          <button className="btn btn-xs btn-icon btn-light" onClick={onClose}>
            <i className="ki-outline ki-cross"></i>
          </button>
        </div>

        {/* Modal Body */}
        <div className="modal-body mt-4">
          <Alert variant="info" className="mb-4">
            {text}
          </Alert>
          {isLoading && (
            <p className="text-gray-500">
              <FormattedMessage id="GENERAL.UPDATING" />
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
            onClick={onUpdate}
            disabled={isLoading}
          >
            {isLoading ? (
              <FormattedMessage id="GENERAL.UPDATING" />
            ) : (
              butText || <FormattedMessage id="GENERAL.UPDATE" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default GlobalUpdateModal;
