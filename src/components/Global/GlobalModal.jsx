/**
 * Reusable global modal component.
 *
 * @param {boolean} isOpen Controls whether the modal is visible.
 * @param {function} onClose Function called when the modal is closed.
 * @param {function} [onConfirm] Optional function called when the confirm button is clicked.
 * @param {string} [title="Confirm Action"] Modal title.
 * @param {string} [message="Are you sure?"] Optional message shown when no children are provided.
 * @param {string} [confirmText="Confirm"] Confirm button text.
 * @param {string} [cancelText="Cancel"] Cancel button text.
 * @param {string} [confirmClass="btn btn-primary"] CSS classes for the confirm button.
 * @param {string} [cancelClass="btn btn-light"] CSS classes for the cancel button.
 * @param {string} [width="w-[30em]"] Modal width class.
 * @param {boolean} [closeOnConfirm=true] Whether the modal should close after confirm.
 * @param {boolean} [isLoading=false] Disables actions and shows loading text while processing.
 * @param {React.ReactNode} [children] Custom content for the modal body. If provided, it overrides `message`.
 */
const GlobalModal = ({
  isOpen,
  onClose,
  onConfirm,
  title = "Confirm Action",
  message = "Are you sure?",
  confirmText = "Confirm",
  cancelText = "Cancel",
  confirmClass = "btn btn-primary",
  cancelClass = "btn btn-light",
  width = "w-[30em]",
  closeOnConfirm = true,
  isLoading = false,
  children,
}) => {
  if (!isOpen) return null;

  const handleConfirm = async () => {
    try {
      if (onConfirm) await onConfirm();
      if (closeOnConfirm) onClose();
    } catch (error) {
      console.error("Modal confirm action failed:", error);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4 py-6">
      <div
        className={`w-full max-w-[95vw] rounded-2xl bg-white p-6 shadow-2xl ${width}`}
      >
        <div className="flex justify-between items-center border-b pb-3">
          <h3 className="text-xl font-semibold">{title}</h3>
          <button
            className="btn btn-xs btn-icon btn-light"
            onClick={() => onClose()}
            disabled={isLoading}
          >
            ✕
          </button>
        </div>

        <div className="mt-4">{children ?? <h1>{message}</h1>}</div>

        <div className="flex justify-end mt-10 gap-4">
          <button
            className={cancelClass}
            onClick={() => onClose()}
            disabled={isLoading}
          >
            {cancelText}
          </button>

          {onConfirm && (
            <button
              className={confirmClass}
              onClick={handleConfirm}
              disabled={isLoading}
            >
              {isLoading ? "Please wait..." : confirmText}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default GlobalModal;
