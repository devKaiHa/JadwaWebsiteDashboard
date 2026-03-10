import { KeenIcon } from "@/components";
import { toAbsoluteUrl } from "@/utils/Assets";
import { ImageInput } from "@/components/image-input";
import { useState, useEffect } from "react";
import { Alert } from "@/components";
import baseURL from "../../Api/GlobalData";

const MAX_IMAGE_SIZE_MB = 1;

const CrudAvatarUpload = ({
  onChange,
  value,
  initialImageURL,
  adviceMessage = "",
  viewOnly = false,
}) => {
  const [avatar, setAvatar] = useState([]);
  const [error, setError] = useState("");
console.log(typeof value);

  useEffect(() => {
    if (initialImageURL && typeof initialImageURL === "string") {
      setAvatar([{ dataURL: toAbsoluteUrl(initialImageURL) }]);
    }
  }, [initialImageURL]);

  const currentImage =
    (typeof value === "string" ? toAbsoluteUrl(value) : value?.dataURL) ||
    avatar?.[0]?.dataURL ||
    toAbsoluteUrl("/media/avatars/blank.png");

  if (viewOnly) {
    return (
      <div className="image-input size-17">
        <img
          src={currentImage}
          alt="avatar"
          className="rounded-full border-2 border-gray-300 p-2 size-17 object-cover"
        />
      </div>
    );
  }

  const handleAvatarChange = (selectedAvatar) => {
    const file = selectedAvatar?.[0]?.file;
    if (file && file.size > MAX_IMAGE_SIZE_MB * 1024 * 1024) {
      setError(`Image must be smaller than ${MAX_IMAGE_SIZE_MB}MB.`);
      return;
    }

    setError("");
    setAvatar(selectedAvatar);
    if (onChange) onChange(selectedAvatar);
  };

  return (
    <div className="flex flex-col items-center gap-2">
      <ImageInput value={avatar} onChange={handleAvatarChange}>
        {({ onImageUpload }) => (
          <div className="image-input size-17" onClick={onImageUpload}>
            <div
              className="btn btn-icon btn-icon-xs btn-light shadow-default absolute z-1 size-5 -top-0.5 -end-0.5 rounded-full"
              onClick={(e) => {
                e.stopPropagation();
                setAvatar([]);
                if (onChange) onChange([]);
              }}
            >
              <KeenIcon icon="cross" />
            </div>
            <span className="tooltip" id="image_input_tooltip">
              Click to remove or revert
            </span>

            <div
              className="image-input-placeholder rounded-full border-2 border-success image-input-empty:border-gray-300 p-8"
              style={{
                backgroundImage: `url(${toAbsoluteUrl("/media/avatars/blank.png")})`,
              }}
            >
              {currentImage && (
                <img
                  src={
                    typeof currentImage === "string" &&
                    !currentImage.startsWith("data:")
                      ? `${currentImage}`
                      : currentImage
                  }
                  alt="avatar"
                  className="size-17 object-cover rounded-full"
                />
              )}

              <div className="flex items-center justify-center cursor-pointer h-5 left-0 right-0 bottom-0 bg-dark-clarity absolute">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="12"
                  viewBox="0 0 14 12"
                  className="fill-light opacity-80 size-17"
                >
                  <path d="M11.6665 2.64585H11.2232C11.0873 2.64749 10.9538 2.61053 10.8382 2.53928C10.7225 2.46803 10.6295 2.36541 10.5698 2.24335L10.0448 1.19918C9.91266 0.931853 9.70808 0.707007 9.45438 0.550249C9.20068 0.393491 8.90806 0.311121 8.60984 0.312517H5.38984C5.09162 0.311121 4.799 0.393491 4.5453 0.550249C4.2916 0.707007 4.08701 0.931853 3.95484 1.19918L3.42984 2.24335C3.37021 2.36541 3.27716 2.46803 3.1615 2.53928C3.04584 2.61053 2.91234 2.64749 2.7765 2.64585H2.33317C1.90772 2.64585 1.49969 2.81486 1.19885 3.1157C0.898014 3.41654 0.729004 3.82457 0.729004 4.25002V10.0834C0.729004 10.5088 0.898014 10.9168 1.19885 11.2177C1.49969 11.5185 1.90772 11.6875 2.33317 11.6875H11.6665C12.092 11.6875 12.5 11.5185 12.8008 11.2177C13.1017 10.9168 13.2707 10.5088 13.2707 10.0834V4.25002C13.2707 3.82457 13.1017 3.41654 12.8008 3.1157C12.5 2.81486 12.092 2.64585 11.6665 2.64585Z" />
                  <path d="M7 8.77087C8.20812 8.77087 9.1875 7.7915 9.1875 6.58337C9.1875 5.37525 8.20812 4.39587 7 4.39587C5.79188 4.39587 4.8125 5.37525 4.8125 6.58337C4.8125 7.7915 5.79188 8.77087 7 8.77087Z" />
                </svg>
              </div>
            </div>
          </div>
        )}
      </ImageInput>
      {error && <Alert variant="danger">{error}</Alert>}
      {adviceMessage && <Alert variant="warning">{adviceMessage}</Alert>}
    </div>
  );
};

export { CrudAvatarUpload };
