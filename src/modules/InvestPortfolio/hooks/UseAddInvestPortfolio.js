import { useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { useCreatePortfolioMutation } from "../../../rtk/InvestPortfolio/InvestPortfolioApi";

const UseAddInvestPortfolio = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: { ar: "", en: "", tr: "" },
    description: { ar: "", en: "", tr: "" },
    url: "",
    img: null,
  });

  const [preview, setPreview] = useState(null);
  const [createPortfolio, { isLoading }] = useCreatePortfolioMutation();

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
      if (formData.img) dataToSend.append("img", formData.img);

      await createPortfolio(dataToSend).unwrap();
      toast.success("Investment portfolio added successfully");
      reset();
      setTimeout(() => navigate("/all-invest-portfolio"), 2000);
    } catch (err) {
      console.error(err);
      toast.error("Failed to add investment portfolio");
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

  const reset = () => {
    setFormData({
      name: { ar: "", en: "", tr: "" },
      description: { ar: "", en: "", tr: "" },
      url: "",
      img: null,
    });
    setPreview(null);
  };

  return {
    formData,
    setFormData,
    handleImageChange,
    preview,
    handleSubmit,
    isLoading,
  };
};

export default UseAddInvestPortfolio;
