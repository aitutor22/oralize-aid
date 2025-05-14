
import React from "react";
import { 
  AlertDialog, 
  AlertDialogAction, 
  AlertDialogContent, 
  AlertDialogDescription, 
  AlertDialogFooter, 
  AlertDialogHeader, 
  AlertDialogTitle 
} from "@/components/ui/alert-dialog";
import { SectionType } from "@/types/peel";

interface ScoredWord {
  word: string;
  score: "good" | "fair" | "poor";
}

interface ScoreModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentSection: SectionType;
  sectionTitle: string;
  scoredWords: ScoredWord[];
}

const ScoreModal: React.FC<ScoreModalProps> = ({ 
  isOpen, 
  onClose, 
  currentSection, 
  sectionTitle,
  scoredWords 
}) => {
  const getScoreColor = (score: "good" | "fair" | "poor"): string => {
    switch (score) {
      case "good": return "text-green-600";
      case "fair": return "text-orange-500";
      case "poor": return "text-red-500";
    }
  };

  const renderScoredContent = () => {
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

  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent className="sm:max-w-md">
        <AlertDialogHeader>
          <AlertDialogTitle>Reading Score</AlertDialogTitle>
          <AlertDialogDescription>
            Here's how you did on reading the {sectionTitle}.
          </AlertDialogDescription>
        </AlertDialogHeader>
        
        <div className="py-4">
          <div className="bg-white/70 p-4 rounded-lg border border-gray-200 text-neutral-800 leading-relaxed">
            {renderScoredContent()}
          </div>
          
          <div className="mt-4 grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-green-600 font-bold text-lg">Good</div>
              <div className="text-sm text-gray-600">Words pronounced well</div>
            </div>
            <div>
              <div className="text-orange-500 font-bold text-lg">Fair</div>
              <div className="text-sm text-gray-600">Words to improve</div>
            </div>
            <div>
              <div className="text-red-500 font-bold text-lg">Poor</div>
              <div className="text-sm text-gray-600">Words to practice</div>
            </div>
          </div>
        </div>
        
        <AlertDialogFooter>
          <AlertDialogAction onClick={onClose}>
            Close
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ScoreModal;
