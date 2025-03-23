
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
    <div className="w-full max-w-4xl mx-auto px-4 py-12 animate-fade-in">
      <div className="text-center mb-12">
        <span className="inline-block px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm font-medium mb-3">
          Feedback
        </span>
        <h1 className="text-3xl md:text-4xl font-bold text-neutral-800 mb-4">
          Your Answer Feedback
        </h1>
        <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
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
          <Card className="border border-neutral-200 card-shadow p-6 space-y-6">
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="w-9 h-9 rounded-full bg-blue-100 flex items-center justify-center mr-3 text-blue-700 font-semibold flex-shrink-0 mt-1">
                  P
                </div>
                <div>
                  <h3 className="text-lg font-medium text-blue-700 mb-2">Point</h3>
                  <p className="text-neutral-700">{feedback.peel.point}</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="w-9 h-9 rounded-full bg-blue-100 flex items-center justify-center mr-3 text-blue-700 font-semibold flex-shrink-0 mt-1">
                  E
                </div>
                <div>
                  <h3 className="text-lg font-medium text-blue-700 mb-2">Explanation</h3>
                  <p className="text-neutral-700">{feedback.peel.explanation}</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="w-9 h-9 rounded-full bg-blue-100 flex items-center justify-center mr-3 text-blue-700 font-semibold flex-shrink-0 mt-1">
                  E
                </div>
                <div>
                  <h3 className="text-lg font-medium text-blue-700 mb-2">Example</h3>
                  <p className="text-neutral-700">{feedback.peel.example}</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="w-9 h-9 rounded-full bg-blue-100 flex items-center justify-center mr-3 text-blue-700 font-semibold flex-shrink-0 mt-1">
                  L
                </div>
                <div>
                  <h3 className="text-lg font-medium text-blue-700 mb-2">Link</h3>
                  <p className="text-neutral-700">{feedback.peel.link}</p>
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>
        
        <TabsContent value="language" className="mt-0">
          <Card className="border border-neutral-200 card-shadow p-6 space-y-6">
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium text-blue-700 mb-3 pb-2 border-b border-neutral-200">
                  Vocabulary
                </h3>
                <ul className="space-y-2">
                  {feedback.language.vocabulary.map((item, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-blue-500 mr-2">•</span>
                      <span className="text-neutral-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-medium text-blue-700 mb-3 pb-2 border-b border-neutral-200">
                  Grammar
                </h3>
                <ul className="space-y-2">
                  {feedback.language.grammar.map((item, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-blue-500 mr-2">•</span>
                      <span className="text-neutral-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-medium text-blue-700 mb-3 pb-2 border-b border-neutral-200">
                  Sentence Structure
                </h3>
                <ul className="space-y-2">
                  {feedback.language.sentenceStructure.map((item, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-blue-500 mr-2">•</span>
                      <span className="text-neutral-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              {feedback.language.pronunciation && (
                <div>
                  <h3 className="text-lg font-medium text-blue-700 mb-3 pb-2 border-b border-neutral-200">
                    Pronunciation
                  </h3>
                  <ul className="space-y-2">
                    {feedback.language.pronunciation.map((item, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-blue-500 mr-2">•</span>
                        <span className="text-neutral-700">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </Card>
        </TabsContent>
        
        <TabsContent value="revised" className="mt-0">
          <Card className="border border-neutral-200 card-shadow p-6">
            <div className="mb-6">
              <h3 className="text-lg font-medium text-blue-700 mb-3">
                Improved Answer
              </h3>
              <div className="bg-blue-50 p-5 rounded-lg border border-blue-100 text-neutral-800 leading-relaxed">
                {feedback.revisedAnswer}
              </div>
            </div>
            
            <Button 
              onClick={() => setIsRevisionModalOpen(true)}
              className="w-full bg-blue-600 hover:bg-blue-700"
            >
              Practice Reading This Answer
            </Button>
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
