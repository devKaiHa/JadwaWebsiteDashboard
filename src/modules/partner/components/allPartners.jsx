import { Container } from "@/components/container";
import { useState } from "react";
import AddButton from "../../../components/Global/AddButton";
import GlobalDeleteModal from "../../../components/Global/GlobalDeleteModal";
import UpdateTitleModal from "../../../components/Global/UpdateTitleModal";
import { useUpdateHomeSectorTitleMutation } from "../../../rtk/Home/sectors/HomeSectorsApi";
import {
  useGetAllPartnersQuery,
  useDeletePartnerMutation,
} from "../../../rtk/Partners/PartnersApi";
import AddPartnerModel from "./AddPartner";
import UpdatePartnerModel from "./Update";
import { toast, ToastContainer } from "react-toastify";
import { Tooltip } from "@mui/material";

const languages = ["en", "ar", "tr"];

const AllPartners = () => {
  const [showDelete, setShowDelete] = useState(false);
  const [showUpdate, setShowUpdate] = useState(false);
  const [showAdd, setShowAdd] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [showUpdateTitle, setShowUpdateTitle] = useState(false);

  const [mainTitleData, setMainTitleData] = useState({
    en: "",
    ar: "",
    tr: "",
  });
  const [subTitleData, setSubTitleData] = useState({ en: "", ar: "", tr: "" });

  const { data } = useGetAllPartnersQuery();
  console.log(data);

  const [deleteSector, { isLoading: isDeleting, error: deleteError }] =
    useDeletePartnerMutation();
  const [updateTitle, { isLoading: isUpdatingTitle }] =
    useUpdateHomeSectorTitleMutation();

  const handleDelete = async () => {
    if (!selectedId) return;
    try {
      await deleteSector(selectedId).unwrap();
      setShowDelete(false);
      setSelectedId(null);
      toast.success("Partner Deleted successfully");
    } catch (err) {
      console.error("Error deleting sector:", err);
    }
  };

  const handleUpdate = async () => {
    if (!selectedId) return;
    try {
      await updateTitle({
        id: selectedId,
        payload: { title: mainTitleData, subtitle: subTitleData },
      }).unwrap();
      setShowUpdate(false);
      setSelectedId(null);
      setMainTitleData({ en: "", ar: "", tr: "" });
      setSubTitleData({ en: "", ar: "", tr: "" });
    } catch (err) {
      console.error("Error updating titles:", err);
    }
  };

  return (
    <Container>
      <div className="card min-w-full">
        <div className="card-header flex justify-between items-center">
          <h3 className="card-title">All Partners</h3>
          <div className="flex">
            <AddButton label="Add Partner" onClick={() => setShowAdd(true)} />
            <div className="ml-2">
              <AddButton
                label="Update Tilte"
                onClick={() => setShowUpdateTitle(true)}
              />
            </div>
          </div>
        </div>

        <div className="card-table overflow-x-auto">
          <table className="table table-border align-middle text-gray-700 font-medium text-sm w-full">
            <thead>
              <tr>
                <th className="w-[3em]">#</th>
                <th className="w-[20em]">Image</th>
                <th className="w-[10em]">Actions</th>
              </tr>
            </thead>
            <tbody>
              {data?.data?.map((item, index) => (
                <tr key={item._id || index} className="hover:bg-gray-50">
                  <td>{index + 1}</td>
                  <td>
                    <img
                      src={item.img}
                      alt="logo"
                      style={{ width: "8em", height: "6em" }}
                    />
                  </td>
                  <td>
                    <div className="flex gap-4 cursor-pointer">
                      <Tooltip title="Edit" placement="top">
                        <button
                          className="cursor-pointer"
                          onClick={() => {
                            setSelectedId(item._id);
                            setShowUpdate(true);
                          }}
                        >
                          <i className="ki-filled ki-notepad-edit text-xl" />
                        </button>
                      </Tooltip>

                      <Tooltip title="Delete" placement="top">
                        <button
                          className="cursor-pointer"
                          onClick={() => {
                            setSelectedId(item._id);
                            setShowDelete(true);
                          }}
                        >
                          <i className="ki-filled ki-trash-square text-xl" />
                        </button>
                      </Tooltip>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Delete Modal */}
      <GlobalDeleteModal
        isOpen={showDelete}
        onClose={() => setShowDelete(false)}
        onDelete={handleDelete}
        title="Delete Sector"
        text="Are you sure you want to delete this sector? This action cannot be undone."
        butText="Delete"
        isLoading={isDeleting}
        error={deleteError?.data?.message || null}
      />

      {/* Add Partner Modal ✅ */}
      <AddPartnerModel sh={showAdd} onClose={setShowAdd} />
      {/* update Partner Modal ✅ */}
      <UpdatePartnerModel
        sh={showUpdate}
        onClose={setShowUpdate}
        id={selectedId}
      />
      {/* Update Title Modal */}
      <UpdateTitleModal
        isOpen={showUpdateTitle}
        onClose={() => setShowUpdateTitle(false)}
        type="homePartners"
      />
      <ToastContainer pauseOnHover />
    </Container>
  );
};

export default AllPartners;
