import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { toast } from "react-toastify";
import {
  useGetOnePortfolioQuery,
  useUpdatePortfolioMutation,
} from "../../../rtk/InvestPortfolio/InvestPortfolioApi";

const UseUpdateInvestPortfolio = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: { ar: "", en: "", tr: "" },
    description: { ar: "", en: "", tr: "" },
    url: "",
    img: null,
  });

  const [preview, setPreview] = useState(null);

  const { data, isLoading: isFetching } = useGetOnePortfolioQuery(id);
  const [updatePortfolio, { isLoading }] = useUpdatePortfolioMutation();

  // Load existing data
  useEffect(() => {
    if (data?.data) {
      setFormData({
        name: data.data.name || { ar: "", en: "", tr: "" },
        description: data.data.description || { ar: "", en: "", tr: "" },
        url: data.data.url || "",
        img: data.data.img || null,
      });
      setPreview(data.data.img || null);
    }
  }, [data]);

  const handleSubmit = async () => {
    if (
      formData?.name?.en?.trim().length < 5 ||
      formData?.description?.en?.trim().length < 5
    ) {
      toast.error("Make sure the name and description are more than 5 letters");
      console.error("Check data");
      return;
    }

    try {
      const dataToSend = new FormData();

      ["ar", "en", "tr"].forEach((lang) => {
        dataToSend.append(`name[${lang}]`, formData.name[lang]);
        dataToSend.append(`description[${lang}]`, formData.description[lang]);
      });

      if (formData.url) dataToSend.append("url", formData.url);
      if (formData.img instanceof File) dataToSend.append("img", formData.img);

      await updatePortfolio({ id, data: dataToSend }).unwrap();
      toast.success("Investment portfolio updated successfully");
      setTimeout(() => navigate("/all-invest-portfolio"), 2000);
    } catch (err) {
      console.error(err);
      toast.error("Failed to update investment portfolio");
    }
  };

  const handleImageChange = (file) => {
    if (!file) {
      setFormData((prev) => ({ ...prev, img: null }));
      setPreview(null);
      return;
    }
    setFormData((prev) => ({ ...prev, img: file }));
    setPreview(URL.createObjectURL(file));
  };

  return {
    formData,
    setFormData,
    handleImageChange,
    preview,
    handleSubmit,
    isLoading: isLoading || isFetching,
  };
};

export default UseUpdateInvestPortfolio;
