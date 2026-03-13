import { useState } from "react";
import { usePostBlogMutation } from "../../../../rtk/Blog/BlogApi";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

const AddBlogHook = () => {
  const navigate = useNavigate();

  const [postBlog, { isLoading, error }] = usePostBlogMutation();

  // Titles and Contents
  const [blogData, setBlogData] = useState({
    en: { title: "", content: "" },
    ar: { title: "", content: "" },
    tr: { title: "", content: "" },
  });

  const [category, setCategory] = useState("");
  const [published, setPublished] = useState(false);

  const [tagsEN, setTagsEN] = useState([]);
  const [tagsAR, setTagsAR] = useState([]);
  const [tagsTR, setTagsTR] = useState([]);

  const [coverImage, setCoverImage] = useState(null);
  const [coverPreview, setCoverPreview] = useState(null);

  const [thumbnails, setThumbnails] = useState([]);
  const [thumbnailPreviews, setThumbnailPreviews] = useState([]);
  const handleThumbnailsChange = (e) => setThumbnailPreviews(e.target.files);

  const resetForm = () => {
    setBlogData({
      en: { title: "", content: "" },
      ar: { title: "", content: "" },
      tr: { title: "", content: "" },
    });
    setCategory("");
    setPublished(false);
    setTagsEN([]);
    setTagsAR([]);
    setTagsTR([]);
    setCoverImage(null);
    setCoverPreview(null);
    setThumbnails([]);
    setThumbnailPreviews([]);
  };

  const onCoverChange = (selectedAvatar) => {
    const file = selectedAvatar?.[0]?.file;
    if (file) {
      setCoverImage(file);
      setCoverPreview(URL.createObjectURL(file));
    } else {
      setCoverImage(null);
      setCoverPreview(null);
    }
  };

  const onThumbnailsChange = (e) => {
    const files = Array.from(e.target.files || e);
    setThumbnails(files);
    setThumbnailPreviews(files.map((f) => URL.createObjectURL(f)));
  };

  const removeThumbnail = (index) => {
    const newThumbnails = [...thumbnails];
    newThumbnails.splice(index, 1);
    setThumbnails(newThumbnails);
    setThumbnailPreviews(newThumbnails.map((f) => URL.createObjectURL(f)));
  };
  console.log(thumbnailPreviews);

  // Update blogData for a specific language
  const handleLangChange = (lang, data) => {
    setBlogData((prev) => ({ ...prev, [lang]: data }));
  };

  const handleSave = async () => {
    try {
      const formData = new FormData();

      const multiLangFields = {
        title: {
          en: blogData.en?.title || "",
          ar: blogData.ar?.title || "",
          tr: blogData.tr?.title || "",
        },
        content: {
          en: blogData.en?.content || "",
          ar: blogData.ar?.content || "",
          tr: blogData.tr?.content || "",
        },
        tags: {
          en: tagsEN,
          ar: tagsAR,
          tr: tagsTR,
        },
      };

      Object.entries(multiLangFields).forEach(([key, value]) => {
        formData.append(key, JSON.stringify(value));
      });

      if (category) formData.append("category", category);
      formData.append("published", published ? "true" : "false");

      if (coverImage) formData.append("photo", coverImage);
      if (thumbnailPreviews?.length) {
        Array.from(thumbnailPreviews).forEach((file) => {
          if (file instanceof File) formData.append("thumbnailImage", file);
        });
      }
      const res = await postBlog(formData).unwrap();
      console.log(res);

      resetForm();
      toast.success("Blog Added successfully");

      setTimeout(() => {
        navigate("/all-blogs");
      }, 2000);
    } catch (err) {
      console.log(err);
    }
  };

  return {
    blogData,
    handleLangChange,

    category,
    setCategory,
    published,
    setPublished,

    tagsEN,
    setTagsEN,
    tagsAR,
    setTagsAR,
    tagsTR,
    setTagsTR,

    coverPreview,
    onCoverChange,
    thumbnailPreviews,
    handleThumbnailsChange,
    onThumbnailsChange,
    removeThumbnail,

    handleSave,
    resetForm,
    isLoading,
    error,
  };
};

export default AddBlogHook;
