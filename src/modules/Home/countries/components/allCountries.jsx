import { Container } from "@/components/container";
import { useState } from "react";
import AddButton from "../../../../components/Global/AddButton";
import GlobalDeleteModal from "../../../../components/Global/GlobalDeleteModal";

import {
  useGetAllHmeCountriesQuery,
  useDeleteCountryMutation,
} from "../../../../rtk/Home/countries/CountriesApi";
import AddCountryModel from "./AddCountries";
import UpdateTitleModal from "../../../../components/Global/UpdateTitleModal";
import { toast, ToastContainer } from "react-toastify";
import UpdatePartnerModel from "./updateModal";
import LoadingCard from "../../../../components/Global/LoadingCard";
import ErrorMessageCard from "../../../../components/Global/ErrorMessageCard";
import { Tooltip } from "@mui/material";

const CountriesList = () => {
  const [showDelete, setShowDelete] = useState(false);
  const [showUpdate, setShowUpdate] = useState(false);
  const [showAdd, setShowAdd] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [showUpdateTitle, setShowUpdateTitle] = useState(false);

  const { data, isError, isLoading } = useGetAllHmeCountriesQuery();
  const [deleteSector, { isLoading: isDeleting, error: deleteError }] =
    useDeleteCountryMutation();
  console.log(`data`, data);

  const handleDelete = async () => {
    if (!selectedId) return;
    try {
      await deleteSector(selectedId).unwrap();
      setShowDelete(false);
      setSelectedId(null);
      toast.success("Country Deleted successfully");
    } catch (err) {
      console.error("Error deleting sector:", err);
    }
  };
  if (isLoading) return <LoadingCard />;
  if (isError) return <ErrorMessageCard onRetry={refetch} />;
  return (
    <Container>
      <div className="card min-w-full">
        <div className="card-header flex justify-between items-center">
          <h3 className="card-title">All Home Section Countries</h3>
          <div className="flex">
            <AddButton label="Add Country" onClick={() => setShowAdd(true)} />
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
                <th className="w-[20em]">name (en)</th>
                <th className="w-[20em]">name (ar)</th>
                <th className="w-[20em]">name (tr)</th>
                <th className="w-[10em]">Actions</th>
              </tr>
            </thead>
            <tbody>
              {data?.data?.map((item, index) => (
                <tr key={item?._id || index} className="hover:bg-gray-50">
                  <td>{index + 1}</td>
                  <td>
                    <img
                      src={item?.img}
                      alt="logo"
                      style={{ width: "8em", height: "5em" }}
                    />
                  </td>
                  <td>{item?.name?.en}</td>
                  <td>{item?.name?.ar}</td>
                  <td>{item?.name?.tr}</td>
                  <td>
                    <div className="flex gap-4 cursor-pointer">
                      <Tooltip title="Edit" placement="top">
                        <button
                          className="cursor-pointer"
                          onClick={() => {
                            setSelectedId(item?._id);
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
                            setSelectedId(item?._id);
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

      <UpdateTitleModal
        isOpen={showUpdateTitle}
        onClose={() => setShowUpdateTitle(false)}
        type="homeCountries"
      />

      <UpdatePartnerModel
        sh={showUpdate}
        onClose={setShowUpdate}
        id={selectedId}
      />
      {/* Add Partner Modal ✅ */}
      <AddCountryModel sh={showAdd} onClose={setShowAdd} />
      <ToastContainer pauseOnHover />
    </Container>
  );
};

export default CountriesList;
