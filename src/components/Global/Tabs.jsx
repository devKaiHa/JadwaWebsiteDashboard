import React, { useState } from "react";

const Tabs = ({ tabs }) => {
  const [activeTab, setActiveTab] = useState(tabs[0]?.key || "");

  return (
    <div>
      {/* Tab Buttons */}
      <div className="flex gap-4 mb-5">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            className={`btn btn-primary btn-clear btn-sm ${
              activeTab === tab.key ? "active" : ""
            }`}
            onClick={() => setActiveTab(tab.key)}
          >
            <i className={tab.icon}></i> {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {tabs.map((tab) => (
        <div key={tab.key} className={activeTab === tab.key ? "" : "hidden"}>
          {tab.content}
        </div>
      ))}
    </div>
  );
};

export default Tabs;
