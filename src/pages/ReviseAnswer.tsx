import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAudioRecorder } from "@/hooks/useAudioRecorder";
import { ArrowLeft, Play, BookOpen } from "lucide-react";
import { PeelResponse, Question, questions, getMockAnswer } from "@/lib/mockData";
import { processAudioTranscription } from "@/lib/feedback";
import { useToast } from "@/hooks/use-toast";
import RevisionModal from "@/components/RevisionModal";
import { SectionType, ScoredWord } from "@/types/peel";
import { useTextToSpeech } from "@/hooks/useTextToSpeech";
import PeelSectionView from "@/components/PeelSectionView";
import PeelSectionPractice from "@/components/PeelSectionPractice";
import SectionNavigation from "@/components/SectionNavigation";
import RecordingInterface from "@/components/RecordingInterface";
import ScoreModal from "@/components/ScoreModal";

const ReviseAnswer = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Use a default question and answer if none is provided in location state
  const [question, setQuestion] = useState<Question | undefined>();
  const [mockAnswer, setMockAnswer] = useState<PeelResponse | undefined>();
  
  useEffect(() => {
    // If we have state from navigation, use it
    if (location.state?.question && location.state?.mockAnswer) {
      setQuestion(location.state.question);
      setMockAnswer(location.state.mockAnswer);
    } else {
      // Otherwise, use a default question (first one from the list)
      const defaultQuestion = questions[0];
      const defaultAnswer = getMockAnswer(defaultQuestion.id);
      setQuestion(defaultQuestion);
      setMockAnswer(defaultAnswer);
      
      // Inform the user that we're using a default question
      toast({
        title: "No question selected",
        description: "Using a default question for demonstration.",
        duration: 5000,
      });
    }
  }, [location.state, toast]);
  
  // State for mode (view or practice)
  const [mode, setMode] = useState<"view" | "practice">("view");
  
  // State for section navigation when in practice mode
  const [currentSection, setCurrentSection] = useState<SectionType>("point");
  const [showScoreModal, setShowScoreModal] = useState(false);
  const [scoredWords, setScoredWords] = useState<Record<SectionType, ScoredWord[]>>({
    point: [],
    explanation: [],
    example: [],
    link: []
  });
  const [showNextButton, setShowNextButton] = useState(false);
  const [showRevisionModal, setShowRevisionModal] = useState(false);
  
  const {
    isRecording,
    recordingTime,
    audioBlob,
    audioUrl,
    formattedTime,
    startRecording,
    stopRecording,
    resetRecording,
  } = useAudioRecorder();
  
  const [isProcessing, setIsProcessing] = useState(false);

  const getSectionContent = (section: SectionType): string => {
    if (!mockAnswer) return "";
    
    switch (section) {
      case "point": return mockAnswer.point;
      case "explanation": return mockAnswer.explanation;
      case "example": return mockAnswer.example;
      case "link": return mockAnswer.link;
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

  // Text-to-speech hook
  const { isSpeaking, currentSpeakingSection, readAloudSection, stopSpeaking } = useTextToSpeech({ getSectionContent });

  const handleBackClick = () => {
    if (mode === "practice") {
      // Return to view mode
      setMode("view");
      resetRecording();
      setCurrentSection("point");
      setShowNextButton(false);
    } else {
      navigate(-1);
    }
  };

  const handleStartPractice = () => {
    setMode("practice");
    setCurrentSection("point");
    setShowNextButton(false);
  };

  const handleNextSection = () => {
    if (currentSection === "point") setCurrentSection("explanation");
    else if (currentSection === "explanation") setCurrentSection("example");
    else if (currentSection === "example") setCurrentSection("link");
    
    resetRecording();
    setShowNextButton(false);
  };

  const processRecording = async () => {
    if (audioBlob) {
      setIsProcessing(true);
      try {
        // In a real implementation, the API would return the scored words
        // For now, we'll simulate this with random scoring
        const text = await processAudioTranscription(audioBlob);
        
        // Simulate word scoring (in a real application, this would come from the API)
        const words = getSectionContent(currentSection).split(' ');
        const scoredWordsForSection = words.map(word => ({
          word,
          score: ["good", "fair", "poor"][Math.floor(Math.random() * 3)] as "good" | "fair" | "poor"
        }));
        
        setScoredWords(prev => ({
          ...prev,
          [currentSection]: scoredWordsForSection
        }));
        
        setShowScoreModal(true);
        setShowNextButton(true);
      } catch (error) {
        console.error("Error processing audio:", error);
        toast({
          title: "Error",
          description: "Failed to process audio recording.",
          variant: "destructive",
        });
      } finally {
        setIsProcessing(false);
      }
    }
  };

  const renderRevisedAnswer = () => {
    const allSections = ["point", "explanation", "example", "link"] as SectionType[];
    const revisedContent = allSections.map(section => {
      const sectionContent = getSectionContent(section);
      return sectionContent;
    }).join(" ");
    
    return revisedContent;
  };

  // If the question or mock answer is not yet loaded, show loading state
  if (!question || !mockAnswer) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-white to-blue-50 p-6 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="p-6 text-center">
            <p className="text-lg">Loading question...</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-blue-50 p-6">
      <Button 
        variant="ghost" 
        className="mb-4" 
        onClick={handleBackClick}
      >
        <ArrowLeft className="mr-2 h-4 w-4" /> 
        {mode === "practice" ? "Back to Full Answer" : "Back"}
      </Button>
      
      <div className="max-w-5xl mx-auto">
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-xl font-bold">
              {question.text}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {mode === "view" ? (
              <div className="space-y-6">
                <PeelSectionView
                  mockAnswer={mockAnswer}
                  currentSpeakingSection={currentSpeakingSection}
                  isSpeaking={isSpeaking}
                  onReadAloud={readAloudSection}
                />
                
                {isSpeaking && (
                  <div className="flex justify-center">
                    <Button 
                      onClick={stopSpeaking}
                      variant="outline"
                      className="mt-2"
                    >
                      Stop Reading
                    </Button>
                  </div>
                )}
                
                <div className="flex justify-center mt-8">
                  <Button 
                    onClick={handleStartPractice} 
                    className="bg-blue-600 hover:bg-blue-700 px-8"
                    size="lg"
                  >
                    <Play className="mr-2 h-5 w-5" /> Practice Reading
                  </Button>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                <SectionNavigation currentSection={currentSection} />
                
                <PeelSectionPractice
                  currentSection={currentSection}
                  sectionContent={getSectionContent(currentSection)}
                  scoredWords={scoredWords[currentSection]}
                  isSpeaking={isSpeaking}
                  onReadAloud={() => readAloudSection(currentSection)}
                />
                
                {isSpeaking && (
                  <div className="flex justify-center">
                    <Button 
                      onClick={stopSpeaking}
                      variant="outline"
                      className="mt-2"
                    >
                      Stop Reading
                    </Button>
                  </div>
                )}
                
                <RecordingInterface
                  isRecording={isRecording}
                  audioUrl={audioUrl}
                  isProcessing={isProcessing}
                  startRecording={startRecording}
                  stopRecording={stopRecording}
                  resetRecording={resetRecording}
                  processRecording={processRecording}
                />
                
                <div className="flex justify-end mt-4">
                  {showNextButton && (
                    <Button
                      onClick={handleNextSection}
                      disabled={currentSection === "link"}
                      className="bg-blue-600 hover:bg-blue-700"
                    >
                      {currentSection === "link" ? "Complete" : "Next"} <ArrowLeft className="h-4 w-4 ml-1" />
                    </Button>
                  )}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
        
        {mode === "practice" && (
          <Button 
            onClick={() => setShowRevisionModal(true)} 
            className="w-full mt-4"
            disabled={Object.values(scoredWords).every(section => section.length === 0)}
          >
            <BookOpen className="mr-2 h-4 w-4" />
            Practice Full Answer
          </Button>
        )}
      </div>
      
      {/* Score Modal */}
      <ScoreModal
        isOpen={showScoreModal}
        onClose={() => setShowScoreModal(false)}
        currentSection={currentSection}
        sectionTitle={getSectionTitle(currentSection)}
        scoredWords={scoredWords[currentSection]}
      />
      
      {/* Revision Modal */}
      <RevisionModal 
        isOpen={showRevisionModal} 
        onClose={() => setShowRevisionModal(false)}
        revisedAnswer={renderRevisedAnswer()}
      />
    </div>
  );
};

export default ReviseAnswer;
