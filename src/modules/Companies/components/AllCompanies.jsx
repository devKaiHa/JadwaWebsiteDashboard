import { Container } from "@/components/container";
import { useState } from "react";
import AllCompaniesHook from "../hooks/UseAlllCompanies";

import PageSizeSelector from "../../../components/Global/PageSizeSelector";
import Pagination from "../../../components/Global/Pagination";
import AddButton from "../../../components/Global/AddButton";
import { Tooltip } from "@mui/material";
import { useNavigate } from "react-router";
import GlobalDeleteModal from "../../../components/Global/GlobalDeleteModal";
import { ToastContainer } from "react-toastify";
import LoadingCard from "../../../components/Global/LoadingCard";
import ErrorMessageCard from "../../../components/Global/ErrorMessageCard";

const AllCompanies = () => {
  const {
    allData,
    totalPages,
    setDeleteId,
    handleDeleteCompany,
    isLoading,
    isError,
    setPerPage,
    perPage,
    currentPage,
    setCurrentPage,
    navigate,
  } = AllCompaniesHook();

  const [showDelete, setShowDelete] = useState(false);

  if (isLoading) return <LoadingCard />;
  if (isError) return <ErrorMessageCard />;

  return (
    <Container>
      <div className="card min-w-full">
        <div className="card-header flex justify-between items-center">
          <h3 className="card-title text-xl font-bold">Companies</h3>
          <AddButton
            label="New Company"
            onClick={() => navigate("/add-company")}
          />
        </div>

        <div className="card-table overflow-x-auto">
          <table className="table table-border align-middle text-gray-700 font-medium text-sm min-w-full">
            <thead>
              <tr>
                <th className="min-w-[100px]">Logo</th>
                <th className="min-w-[150px]">Company Name</th>
                <th className="min-w-[120px]">Experience</th>
                <th className="min-w-[200px]">Mission</th>
                <th className="min-w-[200px]">Vision</th>
                <th className="min-w-[180px]">Social Links</th>
                <th className="min-w-[100px]">Actions</th>
              </tr>
            </thead>
            <tbody>
              {allData?.map((item, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td>
                    <img
                      src={item?.company_logo || "/default.png"}
                      alt="Company Logo"
                      className="w-[5em] h-[5em] object-cover rounded-md"
                    />
                  </td>
                  <td>
                    {item?.companyName?.en || item?.companyName?.ar || "-"}
                  </td>
                  <td>{item?.Experience || "-"}</td>
                  <td className="truncate max-w-[200px]">
                    {item?.mission?.en || "-"}
                  </td>
                  <td className="truncate max-w-[200px]">
                    {item?.vision?.en || "-"}
                  </td>
                  <td className="flex flex-col gap-1">
                    {item?.social_links?.x && (
                      <a
                        href={item.social_links.x}
                        target="_blank"
                        rel="noreferrer"
                        className="text-blue-600 underline"
                      >
                        X
                      </a>
                    )}
                    {item?.social_links?.instagram && (
                      <a
                        href={item.social_links.instagram}
                        target="_blank"
                        rel="noreferrer"
                        className="text-pink-500 underline"
                      >
                        Instagram
                      </a>
                    )}
                    {item?.social_links?.facebook && (
                      <a
                        href={item.social_links.facebook}
                        target="_blank"
                        rel="noreferrer"
                        className="text-blue-700 underline"
                      >
                        Facebook
                      </a>
                    )}
                    {item?.social_links?.linkedin && (
                      <a
                        href={item.social_links.linkedin}
                        target="_blank"
                        rel="noreferrer"
                        className="text-blue-800 underline"
                      >
                        LinkedIn
                      </a>
                    )}
                  </td>
                  <td>
                    <div className="flex gap-3">
                      <Tooltip title="Edit" placement="top">
                        <button
                          className="cursor-pointer"
                          onClick={() =>
                            navigate(`/update-company/${item._id}`)
                          }
                        >
                          <i className="ki-filled ki-notepad-edit text-xl" />
                        </button>
                      </Tooltip>

                      <Tooltip title="Delete" placement="top">
                        <button
                          className="cursor-pointer"
                          onClick={() => {
                            setDeleteId(item._id);
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
              {!allData?.length && (
                <tr>
                  <td colSpan={8} className="text-center py-4 text-gray-500">
                    No companies available.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="card-footer flex justify-between items-center mt-4 text-gray-600 text-sm font-medium">
          <PageSizeSelector perPage={perPage} setPerPage={setPerPage} />
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            setCurrentPage={setCurrentPage}
          />
        </div>
      </div>

      {showDelete && (
        <GlobalDeleteModal
          isOpen={showDelete}
          onClose={() => setShowDelete(false)}
          onDelete={handleDeleteCompany}
          title="Delete Slider"
          text="Are you sure you want to delete this slider? This action cannot be undone."
          butText="Delete"
          // isLoading={isDeleting}
          // error={deleteError?.data?.message || null}
        />
      )}
      <ToastContainer pauseOnHover />
    </Container>
  );
};

export default AllCompanies;
