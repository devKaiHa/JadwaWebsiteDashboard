import React from "react";
import { KeenIcon } from "../keenicons";

const ErrorMessageCard = ({ message = "Something went wrong.", onRetry }) => {
  return (
    <div className="flex items-center justify-center min-h-[300px] w-full px-4">
      <div className="badge badge-outline badge-danger text-sm font-mono rounded-lg px-4 py-3 flex items-center gap-2 max-w-md w-full shadow-md">
        <KeenIcon icon="information-2" />
        <span className="flex-1">{message}</span>

        {onRetry && (
          <button
            onClick={onRetry}
            className=" border border-red-400 px-2 py-1 rounded"
          >
            Retry
          </button>
        )}
      </div>
    </div>
  );
};

export default ErrorMessageCard;
