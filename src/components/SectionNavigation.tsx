
import React from "react";
import { SectionType } from "@/types/peel";

interface SectionNavigationProps {
  currentSection: SectionType;
}

const SectionNavigation: React.FC<SectionNavigationProps> = ({ currentSection }) => {
  const getSectionColor = (section: SectionType): string => {
    switch (section) {
      case "point": return "blue";
      case "explanation": return "green";
      case "example": return "orange";
      case "link": return "purple";
    }
  };
  
  const getSectionTitle = (section: SectionType): string => {
    switch (section) {
      case "point": return "Point";
      case "explanation": return "Explanation";
      case "example": return "Example";
      case "link": return "Link";
    }
  };

  return (
    <div className="mb-6 flex flex-row justify-center gap-2">
      {["point", "explanation", "example", "link"].map((section) => (
        <div
          key={section}
          className={`px-4 py-2 rounded-md ${
            currentSection === section 
              ? `bg-${getSectionColor(section as SectionType)}-500 text-white` 
              : `bg-gray-100 text-${getSectionColor(section as SectionType)}-600`
          }`}
        >
          {getSectionTitle(section as SectionType)}
        </div>
      ))}
    </div>
  );
};

export default SectionNavigation;
