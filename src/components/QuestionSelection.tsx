
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { topics, questions } from "@/lib/mockData";
import { Info } from "lucide-react";
import { cn } from "@/lib/utils";
import PeelModal from "./PeelModal";

interface QuestionSelectionProps {
  topicId: number;
  onSelectQuestion: (questionId: number) => void;
  onBack: () => void;
}

const QuestionSelection: React.FC<QuestionSelectionProps> = ({ 
  topicId, 
  onSelectQuestion,
  onBack
}) => {
  const [isPeelModalOpen, setIsPeelModalOpen] = useState(false);
  
  const topic = topics.find((t) => t.id === topicId);
  const topicQuestions = questions.filter((q) => q.topicId === topicId);
  
  if (!topic) {
    return <div>Topic not found</div>;
  }
  
  const questionTypeLabels = {
    1: "Picture-based Question",
    2: "Personal Experience",
    3: "Opinion & Suggestion"
  };
  
  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-12 animate-fade-in">
      <Button 
        variant="ghost" 
        onClick={onBack}
        className="text-neutral-600 hover:text-blue-700 mb-6"
      >
        ← Back to Topics
      </Button>
      
      <div className="text-center mb-12">
        <span className="inline-block px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm font-medium mb-3">
          {topic.title}
        </span>
        <h1 className="text-3xl md:text-4xl font-bold text-neutral-800 mb-4">
          Select a Question Type
        </h1>
        <div className="flex items-center justify-center space-x-2 text-neutral-600">
          <p className="text-lg">
            Each question type helps you practice different oral skills
          </p>
          <Button 
            variant="ghost" 
            size="sm" 
            className="flex items-center justify-center text-blue-600 hover:text-blue-700 hover:bg-blue-50 p-1 h-auto rounded-full"
            onClick={() => setIsPeelModalOpen(true)}
          >
            <Info className="h-5 w-5" />
          </Button>
        </div>
      </div>
      
      <div className="space-y-6">
        {topicQuestions.map((question) => (
          <Card 
            key={question.id}
            className={cn(
              "overflow-hidden border border-neutral-200 card-shadow",
              "hover-scale cursor-pointer transition-all duration-300",
              question.type === 1 ? "bg-gradient-to-r from-blue-50 to-transparent" : ""
            )}
            onClick={() => onSelectQuestion(question.id)}
          >
            <div className="p-6 flex flex-col md:flex-row md:items-center gap-4">
              <div className="md:w-1/4">
                <div className="rounded-lg bg-blue-100 text-blue-700 font-medium py-2 px-4 inline-block text-sm">
                  {questionTypeLabels[question.type as keyof typeof questionTypeLabels]}
                </div>
              </div>
              
              <div className="md:w-3/4">
                <h3 className="text-xl font-semibold text-neutral-800 mb-2">
                  {question.text}
                </h3>
                {question.type === 1 && (
                  <p className="text-neutral-500 text-sm">
                    This question includes an image for reference
                  </p>
                )}
              </div>
            </div>
          </Card>
        ))}
      </div>
      
      <PeelModal 
        isOpen={isPeelModalOpen} 
        onClose={() => setIsPeelModalOpen(false)} 
      />
    </div>
  );
};

export default QuestionSelection;
