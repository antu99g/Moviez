import { useState } from "react";
import "./tabs.scss";

const Tabs = ({ tabs, handleTabChange }) => {
  const [activeTab, setActiveTab] = useState(0);

  const handleSwitchTab = (index) => {
    setActiveTab(index);
    handleTabChange(index);
  };

  return (
    <div className="tabContainer">
      {tabs.map((tab, index) => {
        return (
          <span
            className={`tabItem ${activeTab === index ? "active" : ""}`}
            onClick={() => handleSwitchTab(index)}
            key={tab}
          >
            {tab}
          </span>
        );
      })}
      <div
        className={`activeBg ${activeTab === 0 ? "leftTabBg" : "rightTabBg"}`}
      />
    </div>
  );
};

export default Tabs;
