
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { topics, questions } from "@/lib/mockData";
import { Info, FileText, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import PeelModal from "./PeelModal";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";

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
  const [mockAnswerDialogOpen, setMockAnswerDialogOpen] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState<number | null>(null);
  
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

  const getMockAnswer = (questionId: number) => {
    const question = questions.find(q => q.id === questionId);
    if (!question) return "No mock answer available.";

    // Generate mock answers based on question type
    switch(question.type) {
      case 1: // Picture-based
        return "I believe the students in the picture are feeling excited and proud because they are receiving recognition for their hard work at what appears to be a school award ceremony. For instance, the student in the center is holding a trophy with a beaming smile, while her classmates are applauding enthusiastically around her. These moments of recognition are significant as they not only boost students' confidence but also create lasting positive memories of their educational journey.";
      case 2: // Personal Experience
        return "When I was in my final year of high school, I felt particularly proud after our team won the regional science competition. We had spent months researching and developing our project on renewable energy solutions. The moment our project was announced as the winner, I felt a tremendous sense of accomplishment. This experience taught me the value of persistence, collaboration, and believing in my abilities. The recognition we received also motivated me to continue pursuing scientific studies in university.";
      case 3: // Opinion & Suggestion
        return "I think schools could be made more enjoyable by implementing a more balanced approach to learning. First, incorporating more interactive and project-based activities would engage students better than traditional lectures alone. For example, hands-on experiments in science classes or creative writing workshops in language arts would make learning more dynamic. Additionally, creating comfortable spaces for social interaction during breaks would improve students' overall well-being. Schools should also consider offering a wider variety of extracurricular activities to cater to different interests and talents.";
      default:
        return "No mock answer available.";
    }
  };

  const handleShowMockAnswer = (e: React.MouseEvent, questionId: number) => {
    e.stopPropagation();
    setSelectedQuestion(questionId);
    setMockAnswerDialogOpen(true);
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
              
              <div className="md:w-1/2">
                <h3 className="text-xl font-semibold text-neutral-800 mb-2">
                  {question.text}
                </h3>
              </div>

              <div className="md:w-1/4 flex justify-end gap-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="text-blue-600 border-blue-200 hover:bg-blue-50"
                  onClick={(e) => handleShowMockAnswer(e, question.id)}
                >
                  <FileText className="mr-1 h-4 w-4" />
                  Mock Answer
                </Button>
                <Button 
                  variant="default" 
                  size="sm" 
                  className="bg-blue-600 hover:bg-blue-700"
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelectQuestion(question.id);
                  }}
                >
                  Practice
                  <ChevronRight className="ml-1 h-4 w-4" />
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
      
      <PeelModal 
        isOpen={isPeelModalOpen} 
        onClose={() => setIsPeelModalOpen(false)} 
      />

      {/* Mock Answer Dialog */}
      <Dialog open={mockAnswerDialogOpen} onOpenChange={setMockAnswerDialogOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Example Answer</DialogTitle>
            <DialogDescription>
              This is an example of a well-structured answer using the PEEL format.
            </DialogDescription>
          </DialogHeader>
          
          <div className="mt-4">
            {selectedQuestion && (
              <>
                <div className="bg-blue-50 p-4 rounded-lg mb-4">
                  <h3 className="font-medium mb-2">Question:</h3>
                  <p className="text-neutral-700">
                    {questions.find(q => q.id === selectedQuestion)?.text}
                  </p>
                </div>
                
                <div className="bg-white border border-neutral-200 p-4 rounded-lg">
                  <h3 className="font-medium mb-2">Example Answer:</h3>
                  <p className="text-neutral-700 whitespace-pre-line">
                    {getMockAnswer(selectedQuestion)}
                  </p>
                </div>
                
                <div className="mt-6 flex justify-end">
                  <Button 
                    onClick={() => {
                      setMockAnswerDialogOpen(false);
                      // Small delay to avoid UI issues
                      setTimeout(() => onSelectQuestion(selectedQuestion), 100);
                    }}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    Practice This Question
                  </Button>
                </div>
              </>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default QuestionSelection;
