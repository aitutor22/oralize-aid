import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAudioRecorder } from "@/hooks/useAudioRecorder";
import { Mic, MicOff, Play, ArrowLeft, ArrowRight, BookOpen } from "lucide-react";
import { PeelResponse, Question } from "@/lib/mockData";
import { processAudioTranscription } from "@/lib/feedback";
import { useToast } from "@/hooks/use-toast";
import { AlertDialog, AlertDialogAction, AlertDialogContent, AlertDialogDescription, 
  AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import RevisionModal from "@/components/RevisionModal";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Define the sections of the PEEL structure
type SectionType = "point" | "explanation" | "example" | "link";

// Interface for scored word
interface ScoredWord {
  word: string;
  score: "good" | "fair" | "poor";
}

const ReviseAnswer = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { question, mockAnswer } = location.state as { 
    question: Question, 
    mockAnswer: PeelResponse 
  };
  
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

  const getSectionTitle = (section: SectionType): string => {
    switch (section) {
      case "point": return "Point";
      case "explanation": return "Explanation";
      case "example": return "Example";
      case "link": return "Link";
    }
  };

  const getSectionContent = (section: SectionType): string => {
    switch (section) {
      case "point": return mockAnswer.point;
      case "explanation": return mockAnswer.explanation;
      case "example": return mockAnswer.example;
      case "link": return mockAnswer.link;
    }
  };

  const getSectionColor = (section: SectionType): string => {
    switch (section) {
      case "point": return "blue";
      case "explanation": return "green";
      case "example": return "orange";
      case "link": return "purple";
    }
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

  const getScoreColor = (score: "good" | "fair" | "poor"): string => {
    switch (score) {
      case "good": return "text-green-600";
      case "fair": return "text-orange-500";
      case "poor": return "text-red-500";
    }
  };

  const renderScoredContent = (section: SectionType) => {
    const sectionWords = scoredWords[section];
    if (!sectionWords || sectionWords.length === 0) {
      return getSectionContent(section);
    }

    return (
      <div>
        {sectionWords.map((scoredWord, index) => (
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

  const renderRevisedAnswer = () => {
    const allSections = ["point", "explanation", "example", "link"] as SectionType[];
    const revisedContent = allSections.map(section => {
      const sectionContent = getSectionContent(section);
      return sectionContent;
    }).join(" ");
    
    return revisedContent;
  };

  const renderViewMode = () => {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className={`border-l-4 border-blue-200 pl-4 py-3`}>
            <h3 className="font-medium text-blue-600 mb-2 flex items-center">
              <BookOpen className="h-5 w-5 mr-2 text-blue-500" />
              Point
            </h3>
            <div className="text-lg leading-relaxed">
              {mockAnswer.point}
            </div>
          </div>

          <div className={`border-l-4 border-green-200 pl-4 py-3`}>
            <h3 className="font-medium text-green-600 mb-2 flex items-center">
              <BookOpen className="h-5 w-5 mr-2 text-green-500" />
              Explanation
            </h3>
            <div className="text-lg leading-relaxed">
              {mockAnswer.explanation}
            </div>
          </div>

          <div className={`border-l-4 border-orange-200 pl-4 py-3`}>
            <h3 className="font-medium text-orange-600 mb-2 flex items-center">
              <BookOpen className="h-5 w-5 mr-2 text-orange-500" />
              Example
            </h3>
            <div className="text-lg leading-relaxed">
              {mockAnswer.example}
            </div>
          </div>

          <div className={`border-l-4 border-purple-200 pl-4 py-3`}>
            <h3 className="font-medium text-purple-600 mb-2 flex items-center">
              <BookOpen className="h-5 w-5 mr-2 text-purple-500" />
              Link
            </h3>
            <div className="text-lg leading-relaxed">
              {mockAnswer.link}
            </div>
          </div>
        </div>
        
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
    );
  };

  const renderPracticeMode = () => {
    const isLastSection = currentSection === "link";

    return (
      <div className="space-y-6">
        {/* Section navigation bar */}
        <div className="mb-6 flex flex-row justify-center gap-2">
          {["point", "explanation", "example", "link"].map((section) => (
            <div
              key={section}
              className={`px-4 py-2 rounded-md ${
                currentSection === section 
                  ? `bg-${getSectionColor(section as SectionType)}-500 text-white` 
                  : `bg-gray-100 text-${getSectionColor(section as SectionType)}-600`
              }`}
            >
              {getSectionTitle(section as SectionType)}
            </div>
          ))}
        </div>
        
        <div className={`border-l-4 border-${getSectionColor(currentSection)}-200 pl-4 py-3`}>
          <h3 className={`font-medium text-${getSectionColor(currentSection)}-600 mb-2 flex items-center`}>
            <BookOpen className={`h-5 w-5 mr-2 text-${getSectionColor(currentSection)}-500`} />
            {getSectionTitle(currentSection)}
          </h3>
          <div className="text-lg leading-relaxed">
            {renderScoredContent(currentSection)}
          </div>
        </div>
        
        <div className="flex justify-center mt-8 space-x-4">
          {!isRecording && !audioUrl && (
            <Button 
              onClick={startRecording} 
              className="bg-red-500 hover:bg-red-600"
            >
              <Mic className="mr-2 h-4 w-4" /> Record Reading
            </Button>
          )}
          
          {isRecording && (
            <Button 
              onClick={stopRecording} 
              className="bg-red-600 hover:bg-red-700 animate-pulse"
            >
              <MicOff className="mr-2 h-4 w-4" /> Stop Recording
            </Button>
          )}
          
          {audioUrl && (
            <div className="flex flex-col gap-3 w-full max-w-md">
              <audio src={audioUrl} controls className="w-full" />
              <div className="flex gap-3">
                <Button 
                  onClick={resetRecording} 
                  variant="outline"
                >
                  Record Again
                </Button>
                <Button 
                  onClick={processRecording}
                  disabled={isProcessing}
                >
                  {isProcessing ? "Processing..." : "Submit Recording"}
                </Button>
              </div>
            </div>
          )}
        </div>
        
        <div className="flex justify-end mt-4">
          {showNextButton && (
            <Button
              onClick={handleNextSection}
              disabled={currentSection === "link"}
              className="bg-blue-600 hover:bg-blue-700"
            >
              {isLastSection ? "Complete" : "Next"} <ArrowRight className="h-4 w-4 ml-1" />
            </Button>
          )}
        </div>
      </div>
    );
  };

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
            {mode === "view" ? renderViewMode() : renderPracticeMode()}
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
      <AlertDialog open={showScoreModal} onOpenChange={setShowScoreModal}>
        <AlertDialogContent className="sm:max-w-md">
          <AlertDialogHeader>
            <AlertDialogTitle>Reading Score</AlertDialogTitle>
            <AlertDialogDescription>
              Here's how you did on reading the {getSectionTitle(currentSection)}.
            </AlertDialogDescription>
          </AlertDialogHeader>
          
          <div className="py-4">
            <div className="bg-white/70 p-4 rounded-lg border border-gray-200 text-neutral-800 leading-relaxed">
              {renderScoredContent(currentSection)}
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
            <AlertDialogAction 
              onClick={() => {
                setShowScoreModal(false);
              }}
            >
              Close
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      
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
