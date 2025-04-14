
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { topics, questions, getMockAnswer } from "@/lib/mockData";
import { ArrowLeft, ExternalLink, Book, Mic } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface QuestionSelectionProps {
  topicId: number;
  onSelectQuestion: (questionId: number) => void;
  onBack: () => void;
}

const QuestionSelection = ({ 
  topicId, 
  onSelectQuestion, 
  onBack 
}: QuestionSelectionProps) => {
  const navigate = useNavigate();
  const topic = topics.find(t => t.id === topicId);
  
  const filteredQuestions = questions.filter(q => q.topicId === topicId);

  const handleMockAnswer = (e: React.MouseEvent, questionId: number) => {
    e.stopPropagation();
    const question = questions.find(q => q.id === questionId);
    const mockAnswer = getMockAnswer(questionId);
    
    if (question) {
      navigate("/revise", { 
        state: { question, mockAnswer }
      });
    }
  };
  
  const handlePractice = (e: React.MouseEvent, questionId: number) => {
    e.stopPropagation();
    onSelectQuestion(questionId);
  };

  return (
    <div className="container max-w-5xl mx-auto py-8 px-4">
      <Button variant="ghost" onClick={onBack} className="mb-6">
        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Topics
      </Button>
      
      <h1 className="text-3xl font-bold mb-6">{topic?.title}</h1>
      
      <div className="grid grid-cols-1 gap-6">
        {filteredQuestions.map(question => (
          <Card 
            key={question.id} 
            className="cursor-pointer hover:shadow-md transition-shadow"
            onClick={() => onSelectQuestion(question.id)}
          >
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {question.imageSrc && (
                  <div className="md:col-span-1">
                    <img 
                      src={question.imageSrc}
                      alt={`Visual for ${question.text}`}
                      className="w-full h-auto rounded-md object-cover"
                    />
                  </div>
                )}
                
                <div className={question.imageSrc ? "md:col-span-2" : "md:col-span-3"}>
                  <div className="flex flex-col h-full">
                    <p className="text-lg mb-4">{question.text}</p>
                    
                    <div className="mt-auto flex flex-wrap gap-3">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={(e) => handleMockAnswer(e, question.id)}
                      >
                        <Book className="mr-2 h-4 w-4" />
                        Mock Answer
                      </Button>
                      
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={(e) => handlePractice(e, question.id)}
                      >
                        <Mic className="mr-2 h-4 w-4" />
                        Practice
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default QuestionSelection;
