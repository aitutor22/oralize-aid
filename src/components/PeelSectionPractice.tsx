
import React from "react";
import { Button } from "@/components/ui/button";
import { Volume } from "lucide-react";
import { SectionType } from "@/types/peel";

interface ScoredWord {
  word: string;
  score: "good" | "fair" | "poor";
}

interface PeelSectionPracticeProps {
  currentSection: SectionType;
  sectionContent: string;
  scoredWords: ScoredWord[];
  isSpeaking: boolean;
  onReadAloud: () => void;
}

const PeelSectionPractice: React.FC<PeelSectionPracticeProps> = ({
  currentSection,
  sectionContent,
  scoredWords,
  isSpeaking,
  onReadAloud,
}) => {
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
  
  const getScoreColor = (score: "good" | "fair" | "poor"): string => {
    switch (score) {
      case "good": return "text-green-600";
      case "fair": return "text-orange-500";
      case "poor": return "text-red-500";
    }
  };
  
  const renderScoredContent = () => {
    if (!scoredWords || scoredWords.length === 0) {
      return sectionContent;
    }

    return (
      <div>
        {scoredWords.map((scoredWord, index) => (
          <span 
            key={index} 
            className={`${getScoreColor(scoredWord.score)} inline-block mr-1`}
          >
            {scoredWord.word}
          </span>
        ))}
      </div>
    );
  };

  const color = getSectionColor(currentSection);
  const title = getSectionTitle(currentSection);

  return (
    <div className="flex border border-gray-200">
      <div className={`w-1/4 py-4 px-4 font-semibold bg-${color}-50 border-r border-gray-200 flex items-center justify-between`}>
        <span className={`text-${color}-700`}>
          {title}
        </span>
        <Button
          variant="ghost"
          size="sm"
          onClick={onReadAloud}
          disabled={isSpeaking}
          className="ml-2"
        >
          <Volume className={`h-4 w-4 ${isSpeaking ? `text-${color}-500` : ""}`} />
          <span className="sr-only">Read aloud</span>
        </Button>
      </div>
      <div className="w-3/4 p-4 text-lg">
        {renderScoredContent()}
      </div>
    </div>
  );
};

export default PeelSectionPractice;
