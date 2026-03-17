const DeleteModal = ({
  sh,
  onClose,
  Delete,
  title = "Delete",
  content = "Are you sure you want to delete this item?",
  disableBtn = false,
}) => {
  return (
    <div>
      {sh && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg w-[30em] min-h-[12em] shadow-lg">
            <div className="flex justify-between items-center border-b pb-3">
              <h3 className="text-xl font-semibold">{title}</h3>
              <button
                className="btn btn-xs btn-icon btn-light"
                onClick={() => onClose(false)}
              >
                ✕
              </button>
            </div>

            <div className="mt-4 grid gap-4">{content}</div>

            <div className="flex justify-end mt-10 gap-4">
              <button className="btn btn-light" onClick={() => onClose(false)}>
                Cancel
              </button>
              <button
                className="btn btn-danger"
                disabled={disableBtn}
                onClick={() => {
                  Delete();
                  onClose(false);
                }}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DeleteModal;
