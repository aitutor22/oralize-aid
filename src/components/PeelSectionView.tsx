
import React from "react";
import { Button } from "@/components/ui/button";
import { Volume } from "lucide-react";
import { PeelResponse } from "@/lib/mockData";

interface PeelSectionViewProps {
  mockAnswer: PeelResponse;
  currentSpeakingSection: "point" | "explanation" | "example" | "link" | null;
  isSpeaking: boolean;
  onReadAloud: (section: "point" | "explanation" | "example" | "link") => void;
}

const PeelSectionView: React.FC<PeelSectionViewProps> = ({
  mockAnswer,
  currentSpeakingSection,
  isSpeaking,
  onReadAloud,
}) => {
  return (
    <div className="space-y-1">
      {/* Point Section */}
      <div className="flex border-b border-gray-200">
        <div className="w-1/4 py-4 px-4 font-semibold bg-blue-50 border-r border-gray-200 flex items-center">
          <span className="text-blue-700">Point</span>
        </div>
        <div className="w-3/4 p-4 text-lg">
          <div className="flex justify-between items-start">
            <div>{mockAnswer.point}</div>
            <Button
              variant="ghost"
              size="sm"
              className="ml-2 flex-shrink-0"
              onClick={() => onReadAloud("point")}
              disabled={isSpeaking}
            >
              <Volume className={`h-4 w-4 ${currentSpeakingSection === "point" ? "text-blue-500" : ""}`} />
              <span className="sr-only">Read aloud</span>
            </Button>
          </div>
        </div>
      </div>
      
      {/* Explanation Section */}
      <div className="flex border-b border-gray-200">
        <div className="w-1/4 py-4 px-4 font-semibold bg-green-50 border-r border-gray-200 flex items-center">
          <span className="text-green-700">Explanation</span>
        </div>
        <div className="w-3/4 p-4 text-lg">
          <div className="flex justify-between items-start">
            <div>{mockAnswer.explanation}</div>
            <Button
              variant="ghost"
              size="sm"
              className="ml-2 flex-shrink-0"
              onClick={() => onReadAloud("explanation")}
              disabled={isSpeaking}
            >
              <Volume className={`h-4 w-4 ${currentSpeakingSection === "explanation" ? "text-green-500" : ""}`} />
              <span className="sr-only">Read aloud</span>
            </Button>
          </div>
        </div>
      </div>
      
      {/* Example Section */}
      <div className="flex border-b border-gray-200">
        <div className="w-1/4 py-4 px-4 font-semibold bg-orange-50 border-r border-gray-200 flex items-center">
          <span className="text-orange-700">Example</span>
        </div>
        <div className="w-3/4 p-4 text-lg">
          <div className="flex justify-between items-start">
            <div>{mockAnswer.example}</div>
            <Button
              variant="ghost"
              size="sm"
              className="ml-2 flex-shrink-0"
              onClick={() => onReadAloud("example")}
              disabled={isSpeaking}
            >
              <Volume className={`h-4 w-4 ${currentSpeakingSection === "example" ? "text-orange-500" : ""}`} />
              <span className="sr-only">Read aloud</span>
            </Button>
          </div>
        </div>
      </div>
      
      {/* Link Section */}
      <div className="flex border-b border-gray-200">
        <div className="w-1/4 py-4 px-4 font-semibold bg-purple-50 border-r border-gray-200 flex items-center">
          <span className="text-purple-700">Link</span>
        </div>
        <div className="w-3/4 p-4 text-lg">
          <div className="flex justify-between items-start">
            <div>{mockAnswer.link}</div>
            <Button
              variant="ghost"
              size="sm"
              className="ml-2 flex-shrink-0"
              onClick={() => onReadAloud("link")}
              disabled={isSpeaking}
            >
              <Volume className={`h-4 w-4 ${currentSpeakingSection === "link" ? "text-purple-500" : ""}`} />
              <span className="sr-only">Read aloud</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PeelSectionView;
