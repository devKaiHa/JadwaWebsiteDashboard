import {
  useUploadDocumentMutation,
  useUploadImageMutation,
} from "../rtk/Uploads/uploadsApi";

export const useUploads = () => {
  const [uploadImage, { isLoading: isUploadingImage, error: imageError }] =
    useUploadImageMutation();

  const [
    uploadDocument,
    { isLoading: isUploadingDocument, error: documentError },
  ] = useUploadDocumentMutation();

  const handleUploadImage = async ({ file, folder }) => {
    const formData = new FormData();
    formData.append("file", file);

    const res = await uploadImage({ folder, formData }).unwrap();
    return res;
  };

  const handleUploadDocument = async ({ file, folder }) => {
    const formData = new FormData();
    formData.append("file", file);

    const res = await uploadDocument({ folder, formData }).unwrap();
    return res;
  };

  return {
    handleUploadImage,
    handleUploadDocument,
    isUploadingImage,
    isUploadingDocument,
    imageError,
    documentError,
  };
};
