
import React, { useState } from "react";
import TopicSelection from "@/components/TopicSelection";
import QuestionSelection from "@/components/QuestionSelection";
import QuestionPage from "@/components/QuestionPage";
import ResultsPage from "@/components/ResultsPage";
import { PeelResponse, Feedback, topics, questions } from "@/lib/mockData";
import { getFeedback } from "@/lib/feedback";

type AppState = "topics" | "questions" | "answering" | "results";

const Index = () => {
  const [appState, setAppState] = useState<AppState>("topics");
  const [selectedTopicId, setSelectedTopicId] = useState<number | null>(null);
  const [selectedQuestionId, setSelectedQuestionId] = useState<number | null>(null);
  const [feedback, setFeedback] = useState<Feedback | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  
  const handleTopicSelect = (topicId: number) => {
    setSelectedTopicId(topicId);
    setAppState("questions");
    
    // Scroll to top
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  
  const handleQuestionSelect = (questionId: number) => {
    setSelectedQuestionId(questionId);
    setAppState("answering");
    
    // Scroll to top
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  
  const handleBackToTopics = () => {
    setSelectedTopicId(null);
    setAppState("topics");
    
    // Scroll to top
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  
  const handleBackToQuestions = () => {
    setSelectedQuestionId(null);
    setAppState("questions");
    
    // Scroll to top
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  
  const handleAnswerSubmit = async (response: PeelResponse, isAudio: boolean) => {
    if (selectedTopicId && selectedQuestionId) {
      setIsLoading(true);
      
      try {
        const feedbackData = await getFeedback(
          response, 
          isAudio, 
          selectedTopicId, 
          selectedQuestionId
        );
        
        setFeedback(feedbackData);
        setAppState("results");
      } catch (error) {
        console.error("Error getting feedback:", error);
      } finally {
        setIsLoading(false);
        
        // Scroll to top
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    }
  };
  
  const handleTryAgain = () => {
    setFeedback(null);
    setAppState("answering");
    
    // Scroll to top
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  
  // Render based on app state
  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-blue-50">
      {appState === "topics" && (
        <TopicSelection onSelectTopic={handleTopicSelect} />
      )}
      
      {appState === "questions" && selectedTopicId && (
        <QuestionSelection 
          topicId={selectedTopicId} 
          onSelectQuestion={handleQuestionSelect}
          onBack={handleBackToTopics}
        />
      )}
      
      {appState === "answering" && selectedQuestionId && (
        <QuestionPage 
          questionId={selectedQuestionId}
          onSubmit={handleAnswerSubmit}
          onBack={handleBackToQuestions}
        />
      )}
      
      {appState === "results" && feedback && (
        <ResultsPage 
          feedback={feedback}
          onTryAgain={handleTryAgain}
          onBackToQuestions={handleBackToQuestions}
          onNewTopic={handleBackToTopics}
        />
      )}
      
      {isLoading && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <div className="sound-wave-container my-4">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="sound-wave-bar"></div>
              ))}
            </div>
            <p className="text-neutral-700 mt-2">Generating feedback...</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Index;
