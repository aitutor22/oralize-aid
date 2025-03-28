
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Feedback } from "@/lib/mockData";
import RevisionModal from "./RevisionModal";
import { cn } from "@/lib/utils";

interface ResultsPageProps {
  feedback: Feedback;
  onTryAgain: () => void;
  onBackToQuestions: () => void;
  onNewTopic: () => void;
}

const ResultsPage: React.FC<ResultsPageProps> = ({ 
  feedback, 
  onTryAgain, 
  onBackToQuestions, 
  onNewTopic 
}) => {
  const [isRevisionModalOpen, setIsRevisionModalOpen] = useState(false);
  
  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-12 animate-fade-in">
      <div className="text-center mb-12">
        <span className="inline-block px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm font-medium mb-3">
          Feedback
        </span>
        <h1 className="text-3xl md:text-4xl font-bold text-neutral-800 mb-4">
          Your Answer Feedback
        </h1>
        <p className="text-lg text-neutral-600 max-w-3xl mx-auto">
          Review the feedback below to improve your oral skills. You can try again or move on to another question.
        </p>
      </div>
      
      <Tabs defaultValue="peel" className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-8">
          <TabsTrigger value="peel" className="text-lg">PEEL Feedback</TabsTrigger>
          <TabsTrigger value="language" className="text-lg">Language Feedback</TabsTrigger>
          <TabsTrigger value="revised" className="text-lg">Revised Answer</TabsTrigger>
        </TabsList>
        
        <TabsContent value="peel" className="mt-0">
          <Card className="border border-neutral-200 card-shadow p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* User's original answer - Left side */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-blue-700 mb-2">Your Original Answer</h3>
                <div className="bg-neutral-50 p-4 rounded-lg border border-neutral-200 text-neutral-700 min-h-[200px]">
                  {feedback.originalAnswer || "No transcription available."}
                </div>
              </div>
              
              {/* PEEL feedback - Right side */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-blue-700 mb-2">PEEL Structure Feedback</h3>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="w-9 h-9 rounded-full bg-blue-100 flex items-center justify-center mr-3 text-blue-700 font-semibold flex-shrink-0">
                      P
                    </div>
                    <div>
                      <h4 className="font-medium text-blue-700 mb-1">Point</h4>
                      <p className="text-neutral-700 text-sm">{feedback.peel.point}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="w-9 h-9 rounded-full bg-blue-100 flex items-center justify-center mr-3 text-blue-700 font-semibold flex-shrink-0">
                      E
                    </div>
                    <div>
                      <h4 className="font-medium text-blue-700 mb-1">Explanation</h4>
                      <p className="text-neutral-700 text-sm">{feedback.peel.explanation}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="w-9 h-9 rounded-full bg-blue-100 flex items-center justify-center mr-3 text-blue-700 font-semibold flex-shrink-0">
                      E
                    </div>
                    <div>
                      <h4 className="font-medium text-blue-700 mb-1">Example</h4>
                      <p className="text-neutral-700 text-sm">{feedback.peel.example}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="w-9 h-9 rounded-full bg-blue-100 flex items-center justify-center mr-3 text-blue-700 font-semibold flex-shrink-0">
                      L
                    </div>
                    <div>
                      <h4 className="font-medium text-blue-700 mb-1">Link</h4>
                      <p className="text-neutral-700 text-sm">{feedback.peel.link}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>
        
        <TabsContent value="language" className="mt-0">
          <Card className="border border-neutral-200 card-shadow p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* User's original answer - Left side */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-blue-700 mb-2">Your Original Answer</h3>
                <div className="bg-neutral-50 p-4 rounded-lg border border-neutral-200 text-neutral-700 min-h-[200px]">
                  {feedback.originalAnswer || "No transcription available."}
                </div>
              </div>
              
              {/* Language feedback - Right side */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-blue-700 mb-2">Language Usage Feedback</h3>
                <div className="space-y-6 overflow-y-auto max-h-[500px] pr-2">
                  <div>
                    <h4 className="font-medium text-blue-700 mb-2 pb-1 border-b border-neutral-200">
                      Vocabulary
                    </h4>
                    <ul className="space-y-1">
                      {feedback.language.vocabulary.map((item, index) => (
                        <li key={index} className="flex items-start">
                          <span className="text-blue-500 mr-2">•</span>
                          <span className="text-neutral-700 text-sm">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-blue-700 mb-2 pb-1 border-b border-neutral-200">
                      Grammar
                    </h4>
                    <ul className="space-y-1">
                      {feedback.language.grammar.map((item, index) => (
                        <li key={index} className="flex items-start">
                          <span className="text-blue-500 mr-2">•</span>
                          <span className="text-neutral-700 text-sm">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-blue-700 mb-2 pb-1 border-b border-neutral-200">
                      Sentence Structure
                    </h4>
                    <ul className="space-y-1">
                      {feedback.language.sentenceStructure.map((item, index) => (
                        <li key={index} className="flex items-start">
                          <span className="text-blue-500 mr-2">•</span>
                          <span className="text-neutral-700 text-sm">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  {feedback.language.pronunciation && (
                    <div>
                      <h4 className="font-medium text-blue-700 mb-2 pb-1 border-b border-neutral-200">
                        Pronunciation
                      </h4>
                      <ul className="space-y-1">
                        {feedback.language.pronunciation.map((item, index) => (
                          <li key={index} className="flex items-start">
                            <span className="text-blue-500 mr-2">•</span>
                            <span className="text-neutral-700 text-sm">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>
        
        <TabsContent value="revised" className="mt-0">
          <Card className="border border-neutral-200 card-shadow p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* User's original answer - Left side */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-blue-700 mb-2">Your Original Answer</h3>
                <div className="bg-neutral-50 p-4 rounded-lg border border-neutral-200 text-neutral-700 min-h-[200px]">
                  {feedback.originalAnswer || "No transcription available."}
                </div>
              </div>
              
              {/* Revised answer - Right side */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-blue-700 mb-2">Improved Answer</h3>
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 text-neutral-800 min-h-[200px]">
                  {feedback.revisedAnswer}
                </div>
                
                <Button 
                  onClick={() => setIsRevisionModalOpen(true)}
                  className="w-full bg-blue-600 hover:bg-blue-700 mt-4"
                >
                  Practice Reading This Answer
                </Button>
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
      
      <div className="flex flex-col sm:flex-row gap-4 mt-10 justify-center">
        <Button 
          onClick={onTryAgain}
          variant="outline"
          className="border-blue-200 text-blue-700 hover:bg-blue-50"
        >
          Try Again
        </Button>
        
        <Button 
          onClick={onBackToQuestions}
          variant="outline"
          className="border-blue-200 text-blue-700 hover:bg-blue-50"
        >
          Back to Topic Questions
        </Button>
        
        <Button 
          onClick={onNewTopic}
          className="bg-blue-600 hover:bg-blue-700"
        >
          Choose New Topic
        </Button>
      </div>
      
      <RevisionModal 
        isOpen={isRevisionModalOpen} 
        onClose={() => setIsRevisionModalOpen(false)} 
        revisedAnswer={feedback.revisedAnswer}
      />
    </div>
  );
};

export default ResultsPage;
