import { Container } from "@/components/container";
import { useState } from "react";
import AddButton from "../../../components/Global/AddButton";
import GlobalDeleteModal from "../../../components/Global/GlobalDeleteModal";
import UpdateTitleModal from "../../../components/Global/UpdateTitleModal";
import {
  useDeleteSectorMutation,
  useGetAllHomeSectorsQuery,
  useUpdateHomeSectorTitleMutation,
} from "../../../rtk/Home/sectors/HomeSectorsApi";
import AddPartnerModel from "./AddPartner";

const languages = ["en", "ar", "tr"];

const AllPartners = () => {
  const [showDelete, setShowDelete] = useState(false);
  const [showUpdate, setShowUpdate] = useState(false);
  const [showAdd, setShowAdd] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [mainTitleData, setMainTitleData] = useState({
    en: "",
    ar: "",
    tr: "",
  });
  const [subTitleData, setSubTitleData] = useState({ en: "", ar: "", tr: "" });

  const { data } = useGetAllHomeSectorsQuery();
  const [deleteSector, { isLoading: isDeleting, error: deleteError }] =
    useDeleteSectorMutation();
  const [updateTitle, { isLoading: isUpdatingTitle }] =
    useUpdateHomeSectorTitleMutation();

  const handleDelete = async () => {
    if (!selectedId) return;
    try {
      await deleteSector(selectedId).unwrap();
      setShowDelete(false);
      setSelectedId(null);
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
            <AddButton
              label="Add Partner"
              onClick={() => setShowAdd(true)} // ✅ فتح المودال بدل الانتقال
            />
            <div className="ml-2">
              <AddButton
                label="Update Tilte"
                onClick={() => setShowUpdate(true)}
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
                <tr key={item._id || index}>
                  <td>{index + 1}</td>
                  <td>{item.name.en}</td>
                  <td>
                    <div className="flex gap-4 cursor-pointer">
                      {/* Edit Titles */}
                      <i
                        className="ki-solid ki-notepad-edit text-blue-500 text-[1.5em]"
                        onClick={() => {
                          setSelectedId(item._id);
                          setMainTitleData(item.title);
                          setSubTitleData(item.subtitle);
                          setShowUpdate(true);
                        }}
                      ></i>

                      {/* Delete */}
                      <i
                        className="ki-filled ki-file-deleted text-red-500 text-[1.5em]"
                        onClick={() => {
                          setSelectedId(item._id);
                          setShowDelete(true);
                        }}
                      ></i>
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

      {/* Update Title Modal */}
      <UpdateTitleModal
        isOpen={showUpdate}
        onClose={() => setShowUpdate(false)}
        type="investGates"
      />

      {/* Add Partner Modal ✅ */}
      <AddPartnerModel sh={showAdd} onClose={setShowAdd} />
    </Container>
  );
};

export default AllPartners;
