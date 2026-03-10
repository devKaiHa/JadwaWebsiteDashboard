import AddButton from "../../../components/Global/AddButton";
import SlideCard from "./SlideCard";

const languages = ["en", "ar", "tr"];

const CompanyCard = ({
  company,
  companyIndex,
  handleNameChange,
  handleSlideChange,
  handleFileSelect,
  removeImage,
  addSlide,
  saveCompanyDetail,
  onRemoveSlide,
  onRemoveCompany,
}) => {
  return (
    <div className="border p-4 rounded-xl shadow-md">
      <h2 className="text-lg font-bold mb-4 flex justify-between">
        Slider Name
        <div className="flex gap-2">
          <AddButton label="Add Slide" onClick={() => addSlide(companyIndex)} />
          <AddButton
            label="Save Detail"
            onClick={() => saveCompanyDetail(companyIndex)}
          />
          <button
            className="btn btn-sm btn-outline btn-danger"
            onClick={onRemoveCompany}
          >
            Delete Slider
          </button>
        </div>
      </h2>

      {languages.map((lang) => (
        <div key={lang} className="input-group mb-2">
          <span className="btn btn-input w-[10em]">Name ({lang})</span>
          <input
            type="text"
            className="input w-full"
            placeholder={`Enter company name in ${lang.toUpperCase()}`}
            value={company.name[lang] || ""}
            onChange={(e) =>
              handleNameChange(companyIndex, lang, e.target.value)
            }
          />
        </div>
      ))}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        {company.slides.map((slide, slideIndex) => (
          <SlideCard
            key={slide._id}
            slide={slide}
            companyIndex={companyIndex}
            slideIndex={slideIndex}
            handleSlideChange={handleSlideChange}
            handleFileSelect={handleFileSelect}
            removeImage={removeImage}
            removeSlide={onRemoveSlide}
          />
        ))}
      </div>
    </div>
  );
};

export default CompanyCard;
