import { useState, useEffect } from "react";
import {
  useGetOneBlogQuery,
  useUpdateBlogMutation,
} from "../../../../rtk/Blog/BlogApi";
import { useParams } from "react-router";

export const useUpdateBlog = () => {
    const { id } = useParams();
  const [titleEN, setTitleEN] = useState("");
  const [titleAR, setTitleAR] = useState("");
  const [descriptionEN, setDescriptionEN] = useState("");
  const [descriptionAR, setDescriptionAR] = useState("");
  const [writer, setWriter] = useState("");
  const [category, setCategory] = useState("");
  const [imgPreview, setImgPreview] = useState(null);
  const [imageFile, setImageFile] = useState(null);

  // Fetch blog data only if modal is shown and id exists
  const { data, isLoading: isFetching } = useGetOneBlogQuery(id);
console.log(id);

  const [updateBlog, { isLoading, isSuccess, error }] = useUpdateBlogMutation();

  // Populate form fields when data loads
  useEffect(() => {
    if (data?.data) {
      const blog = data.data;
      setTitleEN(blog.titleEN || "");
      setTitleAR(blog.titleAR || "");
      setDescriptionEN(blog.descriptionEN || "");
      setDescriptionAR(blog.descriptionAR || "");
      setWriter(blog.writer || "");
      setCategory(blog.category || "");
      setImgPreview(blog.photo || null);
      setImageFile(null); // reset file input because we have URL preview
    }
  }, [data]);

  // Handle image input change
  const onImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImgPreview(URL.createObjectURL(file));
      setImageFile(file);
    } else {
      // No file selected or removed
      setImgPreview(null);
      setImageFile(null);
    }
  };

  const resetForm = () => {
    setTitleEN("");
    setTitleAR("");
    setDescriptionEN("");
    setDescriptionAR("");
    setWriter("");
    setCategory("");
    setImgPreview(null);
    setImageFile(null);
  };

  const handleUpdate = async () => {
    // Validate required fields and minimal length
    if (
      !titleEN.trim() ||
      !titleAR.trim() ||
      !descriptionEN.trim() ||
      !descriptionAR.trim() ||
      descriptionEN.trim().length < 10 ||
      descriptionAR.trim().length < 10
    ) {
      alert("Please fill all required fields with valid data (min 10 chars for descriptions).");
      return;
    }

    const formData = new FormData();
    formData.append("titleEN", titleEN);
    formData.append("titleAR", titleAR);
    formData.append("descriptionEN", descriptionEN);
    formData.append("descriptionAR", descriptionAR);
    formData.append("writer", writer);
    formData.append("category", category);
    if (imageFile) formData.append("photo", imageFile);

    try {
      await updateBlog({ id, formData }).unwrap();
    } catch (err) {
      console.error("Error updating blog:", err);
      alert("Failed to update blog. Please try again.");
    }
  };

  // Close modal and reset form on successful update
  useEffect(() => {
    if (isSuccess) {
      resetForm();
    }
  }, [isSuccess]);

  return {
    titleEN,
    setTitleEN,
    titleAR,
    setTitleAR,
    descriptionEN,
    setDescriptionEN,
    descriptionAR,
    setDescriptionAR,
    writer,
    setWriter,
    category,
    setCategory,
    imgPreview,
    onImageChange,
    handleUpdate,
    resetForm,
    isLoading,
    isFetching,
    error,
  };
};
