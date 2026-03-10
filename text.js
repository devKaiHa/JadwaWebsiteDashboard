import { useState } from "react";
import { Container } from "@/components/container";

function PosDiscount() {
  const [activeTab, setActiveTab] = useState("Translate info");
  const [discountType, setDiscountType] = useState("");
  const [activeTabTrans, setActiveTabTrans] = useState("tab_1_1");

  const renderPage = () => {
    switch (activeTab) {
      case "Translate info":
        return (
          <div className="text-lg font-semibold">
            <h1> Base Information</h1>
            <div>
              <div className="tabs mb-5" data-tabs="true">
                <button
                  className={tab ${activeTabTrans === "tab_1_1" ? "active" : ""}}
                  data-tab-toggle="#tab_1_1"
                  onClick={() => setActiveTabTrans("tab_1_1")}
                >
                  English
                </button>
                <button
                  className={tab ${activeTabTrans === "tab_1_2" ? "active" : ""}}
                  data-tab-toggle="#tab_1_2"
                  onClick={() => setActiveTabTrans("tab_1_2")}
                >
                  Arabic
                </button>
                <button
                  className={tab ${activeTabTrans === "tab_1_3" ? "active" : ""}}
                  data-tab-toggle="#tab_1_3"
                  onClick={() => setActiveTabTrans("tab_1_3")}
                >
                  Turkey
                </button>
              </div>

              <div
                id="tab_1_1"
                className={activeTabTrans === "tab_1_1" ? "" : "hidden"}
              >
                <div className="w-[70%] ml-10">
                  <div className="input-group ">
                    <span className="btn btn-input"> Name</span>
                    <input
                      className="input"
                      placeholder="Enter Name...."
                      type="text"
                      // value={name_en}
                      // onChange={(e) => setField("name_en", e.target.value)}
                    />
                  </div>
                  <div className="input-group mt-3 ">
                    <textarea
                      className="textarea"
                      placeholder="Enter Description..."
                      rows="6"
                      // value={description_en}
                      // onChange={(e) =>
                      //   setField("description_en", e.target.value)
                      // }
                    ></textarea>
                  </div>
                  <div className="flex flex-col items-start gap-4 mt-3">
                    <label className="form-label flex items-center gap-2.5">
                      <input
                        className="checkbox"
                        name="check"
                        type="checkbox"
                        value="1"
                      />
                      Cash Only
                    </label>
                  </div>
                </div>
              </div>
              <div
                id="tab_1_2"
                className={activeTabTrans === "tab_1_2" ? "" : "hidden"}
              >
                <div className="w-[70%] ml-10">
                  <div className="input-group ">
                    <span className="btn btn-input">Name</span>
                    <input
                      className="input"
                      placeholder="Enter Name...."
                      type="text"
                      // value={name_ar}
                      // onChange={(e) => setField("name_ar", e.target.value)}
                    />
                  </div>
                  <div className="input-group mt-3 ">
                    <textarea
                      className="textarea"
                      placeholder="Enter Description..."
                      rows="6"
                      // value={description_ar}
                      // onChange={(e) =>
                      // setField("description_ar", e.target.value)
                      // }
                    ></textarea>
                  </div>
                </div>
              </div>
              <div
                id="tab_1_3"
                className={activeTabTrans === "tab_1_3" ? "" : "hidden"}
              >
                <div className="w-[70%] ml-10">
                  <div className="input-group ">
                    <span className="btn btn-input">Name</span>
                    <input
                      className="input"
                      placeholder="Enter Name...."
                      type="text"
                      // value={name_tr}
                      // onChange={(e) => setField("name_tr", e.target.value)}
                    />
                  </div>
                  <div className="input-group mt-3 ">
                    <textarea
                      className="textarea"
                      placeholder="Enter Description..."
                      rows="6"
                      // value={description_tr}
                      // onChange={(e) =>
                      // setField("description_tr", e.target.value)
                      // }
                    ></textarea>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      case "Conditions":
        return (
          <div className="text-lg font-semibold">
            <h1 className="mb-5">Discount Conditions</h1>
            <div className="text-lg font-semibold">
              {/* المجموعة الأولى: Value + Usage Limit */}
              <div className="grid grid-cols-2 gap-4">
                <div className="input-group">
                  <span className="btn btn-input w-[10em]">Value</span>
                  <input
                    className="input"
                    placeholder="Enter Value...."
                    type="number"
                  />
                </div>

                <div className="input-group">
                  <span className="btn btn-input w-[10em]">Usage Limit</span>
                  <input className="input" placeholder="" type="number" />
                </div>
              </div>

              {/* المجموعة الثانية: Active hours + Active Days */}
              <div className="grid grid-cols-2 gap-4 mt-5">
                <div className="input-group">
                  <span className="btn btn-input w-[10em]">Active hours</span>
                  <input className="input" placeholder="" type="number" />
                </div>

                <div className="input-group">
                  <span className="btn btn-input w-[10em]">Active Days</span>
                  <input className="input" placeholder="" type="number" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mt-5">
                <div className="input-group">
                  <span className="btn btn-input w-[10em]">Start Date</span>
                  <input
                    className="input"
                    placeholder="Enter Value...."
                    type="date"
                  />
                </div>

                <div className="input-group">
                  <span className="btn btn-input w-[10em]">End Date</span>
                  <input
                    className="input"
                    placeholder="Enter Value...."
                    type="date"
                  />
                </div>
              </div>

              <div className="mt-5">
                <div className="input-group w-[100%]">
                  <span className="btn btn-input w-[10em]">Discount Type</span>
                  <select
                    className="select"
                    name="select"
                    value={discountType}
                    onChange={(e) => setDiscountType(e.target.value)}
                  >
                    <option value="" disabled hidden>
                      Select Discount Type
                    </option>
                    <option value="percentage">Percentage</option>
                    <option value="fixed">Fixed</option>
                    <option value="Bogo">Bogo</option>{" "}
                  </select>
                </div>

                {discountType === "Bogo" && (
                  <div className="mt-5">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="input-group">
                        <span className="btn btn-input w-[10.2em]">
                          Buy Quantity
                        </span>
                        <input
                          className="input"
                          placeholder="Enter Number...."
                          type="number"
                        />
                      </div>

                      <div className="input-group">
                        <span className="btn btn-input w-[10.2em]">
                          Get Quantity
                        </span>
                        <input
                          className="input"
                          placeholder="Enter Number...."
                          type="number"
                        />
                      </div>
                    </div>

                    <div className="input-group mt-5">
                      <span className="btn btn-input w-[10.2em]">
                        Product To Get
                      </span>
                      <select className="select" name="select">
                        <option value="">Select Product</option>
                        <option value="product1">Product 1</option>
                        <option value="product2">Product 2</option>
                        <option value="product3">Product 3</option>
                      </select>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      case "Terms":
        return <div>terms</div>;

      default:
        return <div>Not Found</div>;
    }
  };
  return (
    <Container>
      <div className="flex border border-gray-300 rounded-md shadow-sm overflow-hidden min-h-[30em]">
        {/* Sidebar (Tabs) */}
        <div className="flex flex-col w-[20%] border-r border-gray-300 ">
          <button
            onClick={() => setActiveTab("Translate info")}
            className={`px-4 py-3 text-left hover:bg-blue-100 ${
              activeTab === "Translate info" ? "bg-blue-200 font-bold" : ""
            }`}
          >
            Translate info
          </button>
          <button
            onClick={() => setActiveTab("Conditions")}
            className={`px-4 py-3 text-left hover:bg-blue-100 ${
              activeTab === "Conditions" ? "bg-blue-200 font-bold" : ""
            }`}
          >
            Conditions
          </button>
          <button
            onClick={() => setActiveTab("Terms")}
            className={`px-4 py-3 text-left hover:bg-blue-100 ${
              activeTab === "Terms" ? "bg-blue-200 font-bold" : ""
            }`}
          >
            Terms
          </button>
        </div>

        {/* Main Content Area */}
        <div className="w-[80%] p-6">{renderPage()}</div>
      </div>
      <div className="flex justify-end mt-5">
        <button className="btn btn-primary">Submit</button>
      </div>
    </Container>
  );
}

export default PosDiscount;