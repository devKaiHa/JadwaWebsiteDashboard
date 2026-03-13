import { useEffect, useState } from "react";
import { Container } from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate, useParams } from "react-router";
import Tabs from "../../../../components/Global/Tabs";

import {
  useGetOneBlogQuery,
  useUpdateBlogMutation,
} from "../../../../rtk/Blog/BlogApi";
import BlogLangForm from "./BlogLangForm";
import GeneralInfoTab from "./GeneralInfoTab";
import LoadingCard from "../../../../components/Global/LoadingCard";
import ErrorMessageCard from "../../../../components/Global/ErrorMessageCard";

const UpdateBlog = () => {
  const navigate = useNavigate();

  const { id } = useParams();
  const { data: BlogData, isLoading, error } = useGetOneBlogQuery(id);
  const [updateBlogs, { isLoading: isUpdating }] = useUpdateBlogMutation();

  // State for general info
  const [category, setCategory] = useState("");
  const [tagsEN, setTagsEN] = useState([]);
  const [tagsAR, setTagsAR] = useState([]);
  const [tagsTR, setTagsTR] = useState([]);
  const [coverPreview, setCoverPreview] = useState(null);
  const [thumbnailPreviews, setThumbnailPreviews] = useState([]);

  // State for language-specific content
  const [blogData, setBlogData] = useState({
    en: { title: "", content: "" },
    ar: { title: "", content: "" },
    tr: { title: "", content: "" },
  });
  const urlToFile = async (url, filename = "image") => {
    try {
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`Failed to fetch image. Status: ${response.status}`);
      }

      const contentType = response.headers.get("Content-Type");
      if (!contentType || !contentType.startsWith("image/")) {
        throw new Error(
          `URL does not point to an image. Content-Type: ${contentType}`,
        );
      }

      const blob = await response.blob();
      const extension = contentType.split("/")[1].split(";")[0];
      const safeFilename = filename.endsWith(`.${extension}`)
        ? filename
        : `${filename}.${extension}`;

      return new File([blob], safeFilename, { type: contentType });
    } catch (error) {
      console.error("urlToFile error:", error);
      return null;
    }
  };
  // Load blog data into state
  useEffect(() => {
    const loadBlogData = async () => {
      if (BlogData?.data) {
        const data = BlogData.data;

        setCategory(data.category || "");
        setTagsEN(data.tags?.en || []);
        setTagsAR(data.tags?.ar || []);
        setTagsTR(data.tags?.tr || []);

        setCoverPreview(data.coverImage || null);

        if (data.thumbnailImage?.length) {
          const thumbnailFiles = await Promise.all(
            data.thumbnailImage.map((url, index) =>
              urlToFile(url, `thumbnail_${index}`),
            ),
          );
          setThumbnailPreviews(thumbnailFiles.filter(Boolean));
        } else {
          setThumbnailPreviews([]);
        }

        setBlogData({
          en: { title: data.title?.en || "", content: data.content?.en || "" },
          ar: { title: data.title?.ar || "", content: data.content?.ar || "" },
          tr: { title: data.title?.tr || "", content: data.content?.tr || "" },
        });
      }
    };

    loadBlogData();
  }, [BlogData]);

  const handleLangChange = (lang, data) =>
    setBlogData((prev) => ({ ...prev, [lang]: data }));

  const handleThumbnailsChange = (e) => setThumbnailPreviews(e.target.files);

  const handleCoverChange = (file) => setCoverPreview(file);

  const handleSubmit = async () => {
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
    formData.append("category", category);
    if (coverPreview[0]?.file) {
      formData.append("coverImage", coverPreview[0]?.file);
    }

    if (thumbnailPreviews?.length > 0) {
      Array.from(thumbnailPreviews).forEach((file) => {
        if (file instanceof File) formData.append("thumbnailImage", file);
      });
    } else {
      formData.append("thumbnailImage", []);
    }
    try {
      const res = await updateBlogs({ id, data: formData }).unwrap();
      toast.success("Blog updated successfully");

      setTimeout(() => {
        navigate("/all-blogs");
      }, 2000);
    } catch (err) {
      console.log(err);
      toast.error("Failed to update blog");
    }
  };

  if (isLoading) return <LoadingCard />;
  if (error) return <ErrorMessageCard />;

  const tabConfig = [
    {
      key: "tab_info",
      label: "General Info",
      icon: "ki-outline ki-user-square",
      content: (
        <GeneralInfoTab
          category={category}
          setCategory={setCategory}
          tagsEN={tagsEN}
          setTagsEN={setTagsEN}
          tagsAR={tagsAR}
          setTagsAR={setTagsAR}
          tagsTR={tagsTR}
          setTagsTR={setTagsTR}
          coverPreview={coverPreview}
          onCoverChange={handleCoverChange}
          thumbnailPreviews={thumbnailPreviews}
          onThumbnailsChange={handleThumbnailsChange}
        />
      ),
    },
    ...["en", "ar", "tr"].map((lang) => ({
      key: `Blog_${lang}`,
      label: `Blog ${lang.toUpperCase()}`,
      icon: "ki-outline ki-clipboard",
      content: (
        <BlogLangForm
          language={lang}
          value={blogData[lang]}
          onChange={handleLangChange}
        />
      ),
    })),
  ];

  return (
    <Container>
      <Tabs tabs={tabConfig} />
      <div className="mt-6">
        <button
          className="btn btn-primary"
          onClick={handleSubmit}
          disabled={isUpdating}
        >
          {isUpdating ? "Updating..." : "Update Blog"}
        </button>
      </div>
      <ToastContainer pauseOnHover />
    </Container>
  );
};

export default UpdateBlog;
