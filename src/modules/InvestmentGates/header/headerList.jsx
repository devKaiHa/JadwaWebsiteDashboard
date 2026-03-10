import { useState, useEffect } from "react";
import { Container } from "@/components/container";
import AddButton from "../../../components/Global/AddButton";
import { ToastContainer, toast } from "react-toastify";
import {
  useGetOneHeaderQuery,
  useUpdateHeaderMutation,
} from "../../../rtk/investmentGates/headerApi/headerApi";
import GlobalUpdateModal from "../../../components/Global/UpdateInfoModal";
import LoadingCard from "../../../components/Global/LoadingCard";
import ErrorMessageCard from "../../../components/Global/ErrorMessageCard";
import UpdateTitleModal from "../../../components/Global/UpdateTitleModal";

const id = "68515381e58619ff33ddf35b"; // header document ID

const HeaderUpdate = () => {
  const { data: initialData, isLoading, isError } = useGetOneHeaderQuery(id);

  const [updateHeader, { isLoading: isUpdating }] = useUpdateHeaderMutation();

  const [formData, setFormData] = useState({
    headerTitle: "",
    img: "",
  });

  const [showUpdateTitle, setShowUpdateTitle] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  useEffect(() => {
    if (initialData?.data) {
      setFormData({
        headerTitle: initialData.data.headerTitle || "",
        img: initialData.data.img || "",
      });
    }
  }, [initialData]);

  const handleFileChange = (e) => {
    setFormData({ ...formData, img: e.target.files[0] });
  };

  const handleSaveClick = () => {
    setShowConfirmModal(true);
  };

  const handleConfirmUpdate = async () => {
    try {
      const body = new FormData();
      body.append("headerTitle", formData.headerTitle);
      if (formData.img instanceof File) {
        body.append("img", formData.img);
      }

      await updateHeader({ id, body }).unwrap();
      toast.success("Header updated successfully");
      setShowConfirmModal(false);
    } catch (err) {
      console.error(err);
      toast.error("Failed to update Header");
    }
  };

  if (isLoading) return <LoadingCard />;
  if (isError) return <ErrorMessageCard />;

  return (
    <Container>
      <div className="flex items-start justify-between mb-5">
        <h1 className="text-2xl font-bold mb-6">Header Dashboard</h1>
        <div className="flex justify-end">
          <AddButton label="Save Changes" onClick={handleSaveClick} />
          <div className="ml-2">
            <AddButton
              label="Update Title"
              onClick={() => setShowUpdateTitle(true)}
            />
          </div>
        </div>
      </div>

      {/* Header Image Upload */}
      <div className="card p-6 flex flex-col gap-4">
        <label className="block font-medium mb-2">Header Image</label>
        {typeof formData.img === "string" && formData.img && (
          <img
            src={formData.img}
            alt="Header"
            className="w-full max-h-[250px] object-contain mb-4"
          />
        )}
        <input type="file" accept="image/*" onChange={handleFileChange} />
      </div>

      {/* Confirmation Modal */}
      <GlobalUpdateModal
        isOpen={showConfirmModal}
        onClose={() => setShowConfirmModal(false)}
        onUpdate={handleConfirmUpdate}
        isLoading={isUpdating}
        title="Confirm Header Update"
        text="Are you sure you want to update the header? The changes will be saved."
        butText="Update"
      />

      {/* Update Title Modal */}
      <UpdateTitleModal
        isOpen={showUpdateTitle}
        onClose={() => setShowUpdateTitle(false)}
        titleId={formData.headerTitle}
      />

      <ToastContainer pauseOnHover />
    </Container>
  );
};

export default HeaderUpdate;
