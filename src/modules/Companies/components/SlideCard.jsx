const languages = ["en", "ar", "tr"];

const SlideCard = ({
  slide,
  companyIndex,
  slideIndex,
  handleSlideChange,
  handleFileSelect,
  removeImage,
  removeSlide,
}) => {
  return (
    <div className="card p-4 shadow-lg rounded-xl relative">
      <h3 className="font-bold flex justify-between items-center mb-4">
        Slide {slideIndex + 1}
        <button
          className="btn btn-sm btn-outline btn-danger"
          onClick={() => removeSlide(slideIndex)}
        >
          DELETE SLIDE
        </button>
      </h3>

      {languages.map((lang) => (
        <div key={lang} className="mb-4 border-b pb-4">
          <h4 className="font-semibold mb-2">{lang.toUpperCase()}</h4>
          <div className="input-group mb-2">
            <span className="btn btn-input w-[10em]">Title</span>
            <input
              type="text"
              className="input w-full"
              placeholder={`Enter title in ${lang.toUpperCase()}`}
              value={slide.title[lang] || ""}
              onChange={(e) =>
                handleSlideChange(
                  companyIndex,
                  slideIndex,
                  "title",
                  lang,
                  e.target.value,
                )
              }
            />
          </div>
          <div className="input-group mb-2">
            <span className="btn btn-input w-[10em]">Category</span>
            <input
              type="text"
              className="input w-full"
              placeholder={`Enter category in ${lang.toUpperCase()}`}
              value={slide.category[lang] || ""}
              onChange={(e) =>
                handleSlideChange(
                  companyIndex,
                  slideIndex,
                  "category",
                  lang,
                  e.target.value,
                )
              }
            />
          </div>
        </div>
      ))}

      <div className="input-group flex flex-col gap-2">
        <span>Image</span>
        <input
          type="file"
          accept="image/*"
          className="file-input w-full"
          onChange={(e) =>
            handleFileSelect(e.target.files[0], companyIndex, slideIndex)
          }
        />
        {slide.preview && (
          <div className="flex flex-col gap-2 mt-2">
            <img
              src={slide.preview}
              alt="Preview"
              className="w-full h-40 object-cover rounded-lg"
            />
            <button
              className="btn btn-sm btn-outline btn-danger w-[10em] mt-2"
              onClick={() => removeImage(companyIndex, slideIndex)}
            >
              REMOVE IMAGE
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SlideCard;
